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
 *
 * Incorporate user authentication into your application using Passport.js middleware.
 * Provides username/password authentication with session management and route protection.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated,
 * the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 401 error is returned.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @see {@link https://www.passportjs.org/ | Passport.js}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import passportAuth from './middlewares/passportAuth.js';
 *
 * await passportAuth(app);
 * ```
 * @example
 * ```js
 * // Authentication configuration in config/authentication.js
 * import UserModel from '../models/UserModel.js';
 *
 * export default {
 *   /**
 *    * Enable user authentication, defaults to disabled (false).
 *    * @type {boolean}
 *    *\/
 *   enabled: true,
 *
 *   /**
 *    * The session store instance, defaults to a new MemoryStore(memory) instance.
 *    * @type {'memory'|'redis'}
 *    *\/
 *   session_store: 'memory',
 *
 *   /**
 *    * The name of the session ID cookie to set in the response (and read from in the request).
 *    * The default value is 'connect.sid'.
 *    * @type {string|undefined}
 *    *\/
 *   cookie_name: 'connect.sid',
 *
 *   /**
 *    * Specifies the boolean value for the Secure Set-Cookie attribute.
 *    * The default is true, which sets the Secure attribute on the cookie.
 *    * @type {boolean|undefined}
 *    *\/
 *   cookie_secure: false,
 *
 *   /**
 *    * Specifies the boolean value for the HttpOnly Set-Cookie attribute.
 *    * Defaults to true, which sets the HttpOnly attribute on the cookie.
 *    * @type {boolean|undefined}
 *    *\/
 *   cookie_httpOnly: true,
 *
 *   /**
 *    * If the session is stored in "redis", this field is required and should be set to the hostname of the Redis server.
 *    * For example, to connect to redis on localhost on port 6379, set "redis://localhost:6379".
 *    * To connect to a different host or port, use a connection string in the format "redis[s]://[[username][:password]@][host][:port][/db-number]".
 *    * For example, "redis://alice:foobared@awesome.redis.server:6380".
 *    * @type {string|undefined}
 *    *\/
 *   redis_host: undefined,
 *
 *   /**
 *    * Authentication user ID field name, defaults to `username`.
 *    * @type {string}
 *    *\/
 *   username: 'email',
 *
 *   /**
 *    * Authentication password field name, defaults to `password`.
 *    * @type {string}
 *    *\/
 *   password: 'password',
 *
 *   /**
 *    * URL to redirect after successful authentication, defaults to `/`.
 *    * @type {string}
 *    *\/
 *   success_redirect: '/',
 *
 *   /**
 *    * URL to redirect after log off, defaults to `/login`.
 *    * @type {string|((req: express.Request, res: express.Response) => string)}
 *    * @example
 *    * // Set the URL to redirect to in case of login failure as a string.
 *    * failure_redirect: '/login',
 *    *
 *    * // Dynamically set the url to redirect to on login failure.
 *    * failure_redirect: (req, res) => {
 *    *   // If the role stored in the cookie is admin, redirect to the admin login screen.
 *    *   return req.cookies.role === 'admin' ? '/adminlogin' : 'login';
 *    * },
 *    *\/
 *   failure_redirect: '/login',
 *
 *   /**
 *    * This hook is called when authenticating a user.
 *    * Please find the user information that owns the credentials based on the user name and password you received and return it.
 *    * If the user who owns the credentials cannot be found, return null.
 *    *
 *    * Note that the user information must include an ID value that can identify the user.
 *    *
 *    * @type {(username: string, password: string, req: express.Request) => Promise<{[key: string]: any}|null>}
 *    *\/
 *   authenticate_user: async (username, password, req) => {
 *     return UserModel.findOne({
 *       where: { email: username, password },
 *       raw: true
 *     });
 *   },
 *
 *   /**
 *    * This hook is called when user authentication is successful.
 *    * Please search and return the authenticated user information to be set in the session based on the user ID of the parameter.
 *    * The returned data will be set in the req.user property and the view's session variable.
 *    *
 *    * @type {(id: number|string) => Promise<{[key: string]: any}>}
 *    *\/
 *   subscribe_user: async (id) => {
 *     return UserModel.findOne({
 *       where: { id },
 *       raw: true
 *     });
 *   },
 *
 *   /**
 *    * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
 *    * @type {(string|RegExp)[]}
 *    *\/
 *   allow_unauthenticated: ['/api/login'],
 *
 *   /**
 *    * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
 *    * @type {number}
 *    *\/
 *   expiration: 24 * 3600000,
 * }
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
