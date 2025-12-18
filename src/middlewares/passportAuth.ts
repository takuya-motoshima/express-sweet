import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy, IVerifyOptions} from 'passport-local';
import session from 'express-session';
import AuthenticationConfig from '~/interfaces/AuthenticationConfig';
import RedisStore from 'connect-redis';
import {createClient} from 'redis';
import * as utils from '~/utils';
import {mountBeforeRender} from '~/middlewares/viewEngine';

/**
 * Incorporate user authentication into your application using Passport.js middleware.
 * Provides username/password authentication with session management and route protection.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated,
 * the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 401 error is returned.
 *
 * @see {@link https://www.passportjs.org/ | Passport.js}
 * @example
 * ```js
 * // Authentication configuration in config/authentication.js
 * export default {
 *   enabled: true,
 *   username: 'email',
 *   password: 'password',
 *   success_redirect: '/',
 *   failure_redirect: '/login',
 *   authenticate_user: async (username, password, req) => {
 *     const UserModel = require('../models/UserModel');
 *     return UserModel.findOne({
 *       where: { email: username, password },
 *       raw: true
 *     });
 *   },
 *   subscribe_user: async (id) => {
 *     const UserModel = require('../models/UserModel');
 *     return UserModel.findOne({
 *       where: { id },
 *       raw: true
 *     });
 *   }
 * }
 * ```
 */

/**
 * Check if the request URL does not require authentication.
 * Compares the request path against a list of allowed URLs/patterns that bypass authentication.
 * @param {express.Request} req The req object represents the HTTP request
 * @param {(string|RegExp)[]} allowUrls A list of URLs that do not require authentication
 * @returns {boolean} Return true if the request URL does not require authentication
 * @example
 * ```js
 * // Configuration example in config/authentication.js
 * allow_unauthenticated: ['/api', /^\/public/]
 * ```
 */
function isNotRequireAuthentication(req: express.Request, allowUrls: (string|RegExp)[]): boolean {
  const requestUrl = req.path.replace(/\/$/, '');
  if (!allowUrls.length) {
    return true;
  }
  for (let allowUrl of allowUrls) {
    if ((typeof allowUrl === 'string' && requestUrl.indexOf(allowUrl) !== -1)
      || (allowUrl instanceof RegExp && requestUrl.match(allowUrl))) {
      return true;
    }
  }
  return false;
}

/**
 * Mount authentication middleware on Express application.
 * Sets up Passport.js with local strategy, session management, and route protection.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import passportAuth from './middlewares/passportAuth';
 *
 * await passportAuth(app);
 * ```
 */
export default async function passportAuth(app: express.Express): Promise<void> {
  // Load authentication and basic configuration
  const authenticationConfig: AuthenticationConfig = await utils.loadAuthenticationConfig();
  const appConfig = await utils.loadAppConfig();

  // Skip authentication setup if disabled
  if (!authenticationConfig.enabled)
    // Still mount beforeRender middleware even when auth is disabled
    return void await mountBeforeRender(app);

  // Configure session options
  const sessionOptions: session.SessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    name: authenticationConfig.cookie_name,
    cookie: {
      secure: authenticationConfig.cookie_secure,
      httpOnly: authenticationConfig.cookie_httpOnly,
      maxAge: authenticationConfig.expiration
    }
  };

  // Use Redis for session storage if configured
  if (authenticationConfig.session_store === 'redis') {
    // Create Redis client
    const client = createClient({url: authenticationConfig.redis_host as string});

    // Connect to Redis server
    client.connect().catch(console.error);

    // Configure Redis as session store
    sessionOptions.store = new RedisStore({client});
  }

  // Apply session middleware
  app.use(session(sessionOptions));

  // Configure Passport local strategy for username/password authentication
  passport.use(new LocalStrategy({
    usernameField: authenticationConfig.username,
    passwordField: authenticationConfig.password,
    session: true,
    // Enable passReqToCallback to receive request object in authentication callback
    passReqToCallback: true
  }, async (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
    // Authenticate user via configured authentication hook
    const user = <{[key: string]: any}|null> await authenticationConfig.authenticate_user(username, password, req);

    // Check protocol for cookie security warning
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    if (user && protocol === 'http' && authenticationConfig.cookie_secure)
      // Warn if cookie security is enabled but using HTTP protocol
      console.warn('[Sweet] Cookie security must be disabled for HTTP authentication (set cookie_secure to false in config/authentication.js)');

    // Complete authentication
    done(null, user || false);
  }));

  // Serialize user ID into session
  passport.serializeUser<number>((user: {[key: string]: any}, done: any) => {
    done(null, user.id || undefined);
  });

  // Deserialize user from session ID on each request
  passport.deserializeUser(async (id: any, done: any) => {
    // Load full user data via configured subscription hook
    const user = <{[key: string]: any}> await authenticationConfig.subscribe_user(id as number);

    // Store user in req.user
    done(null, user);
  });

  // Initialize Passport middleware
  app.use(passport.initialize());

  // Enable session-based authentication
  // Reads session ID from cookie and deserializes user into req.user
  app.use(passport.session());

  // Mount beforeRender middleware for view rendering
  await mountBeforeRender(app);

  // Check authentication status and protect routes
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Allow unauthenticated access for whitelisted URLs
    if (authenticationConfig.allow_unauthenticated && isNotRequireAuthentication(req, authenticationConfig.allow_unauthenticated))
      return void next();

    // Determine if this is an AJAX request
    const isAjax = appConfig.is_ajax(req);

    // Resolve failure redirect URL (may be dynamic function or static string)
    const failureRedirectUrl = (utils.isFunction(authenticationConfig.failure_redirect)
      ? (authenticationConfig.failure_redirect as (req: express.Request, res: express.Response) => string)(req, res)
      : authenticationConfig.failure_redirect) as string;

    // Extract base URL without query parameters
    const failureRedirectBaseUrl = failureRedirectUrl.replace(/\?.*/, '');

    // Handle authenticated users
    if (req.isAuthenticated()) {
      // Avoid redirect loop on login page
      if (req.path !== failureRedirectBaseUrl || isAjax) {
        // Make user data available in views via res.locals.session
        res.locals.session = req.user;
        next();
      } else
        // Redirect to success page if accessing login page while authenticated
        res.redirect(authenticationConfig.success_redirect);
    } else if (!isAjax)
      // Redirect unauthenticated non-AJAX requests to login page
      if (req.path === failureRedirectBaseUrl)
        // Allow access to login page itself
        next();
      else
        res.redirect(failureRedirectUrl);
    else
      // Return 401 Unauthorized for unauthenticated AJAX requests
      res.status(401).end();
  });
}
