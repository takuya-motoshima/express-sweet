import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy, IVerifyOptions} from 'passport-local';
import session from 'express-session';
import AuthenticationConfig from '~/interfaces/AuthenticationConfig';
import RedisStore from 'connect-redis';
import * as utils from '~/utils';
import View from '~/middlewares/View';

/**
 * Incorporate user authentication into your application.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated, the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 401 error is returned.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const authenticationConfig: AuthenticationConfig = utils.loadAuthenticationConfig();
    const basicConfig = utils.loadBasicConfig();

    // Exit if authentication is disabled.
    if (!authenticationConfig.enabled)
      // Mount middleware to be executed just before drawing the view.
      return void View.mountBeforeRender(app);

    // Session connection options.
    const sessionOptions: session.SessionOptions = {
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      name: authenticationConfig.cookie_name,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: authenticationConfig.expiration
      }
    };

    // When session is stored in redis.
    if (authenticationConfig.session_store === 'redis') {
      // Create a client to connect to the redis server.
      const client = require('redis').createClient({url: authenticationConfig.redis_host as string});

      // Check if you can connect to the Redis server.
      client.connect().catch(console.error);

      // Set up redis session storage in the session store.
      sessionOptions.store = new RedisStore({client});
    }

    // Set session save method.
    app.use(session(sessionOptions));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: authenticationConfig.username,
      passwordField: authenticationConfig.password,
      session: true,
      // NOTE: The passReqToCallback option must be enabled in order to receive the request object in the first parameter of the authentication callback function.
      passReqToCallback: true
    }, async (req: express.Request, username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
      // Find the user who owns the credentials.
      const user = <{[key: string]: any}|null> await authenticationConfig.authenticate_user(username, password, req);

      // Authentication done.
      done(null, user || false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser<number>((user: {[key: string]: any}, done: any) => done(null, user.id || undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id: any, done: any) => {
      // Find credentialed user information.
      const user = <{[key: string]: any}> await authenticationConfig.subscribe_user(id as number);

      // Done deserialization of authenticated user.
      done(null, user);
    });

    // Initialize Passport.
    app.use(passport.initialize());

    // Authenticate access with session.
    // It also manages req.user, reads the session id from the client cookie, and "deserializes" to the user information based on it.
    app.use(passport.session());

    // Mount middleware to be executed just before drawing the view.
    View.mountBeforeRender(app);

    // Check the authentication status of the request.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Check if the request URL does not require authentication.
      if (authenticationConfig.allow_unauthenticated && this.#isNotRequireAuthentication(req, authenticationConfig.allow_unauthenticated))
        return void next();

      // Asynchronous request flag.
      const isAjax = basicConfig.is_ajax(req);

      // URL to redirect to in case of login failure.
      const failureRedirectUrl = (utils.isFunction(authenticationConfig.failure_redirect)
        ? (authenticationConfig.failure_redirect as (req: express.Request, res: express.Response) => string)(req, res)
        : authenticationConfig.failure_redirect) as string;

      // Check if you are logged in.
      if (req.isAuthenticated()) {
        // For authenticated users.
        if (req.path !== failureRedirectUrl || isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else
          res.redirect(authenticationConfig.success_redirect);
      } else if (!isAjax)
        // If authentication is not established and asynchronous communication is not used, the user is redirected to the login page.
        if (req.path === failureRedirectUrl)
          next();
        else
          res.redirect(failureRedirectUrl);
      else
        // If authentication is not established and asynchronous communication is used, a 401 error is returned.
        res.status(401).end();
    });
  }

  /**
   * Check if the request URL does not require authentication.
   * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param {(string|RegExp)[]} allowUrls A list of URLs that do not require authentication.
   * @return {boolean} Return true if the request URL does not require authentication.
   */
  static #isNotRequireAuthentication(req: express.Request, allowUrls: (string|RegExp)[]): boolean {
    const requestUrl = req.path.replace(/\/$/, '');
    if (!allowUrls.length)
      return true;
    for (let allowUrl of allowUrls)
      if ((typeof allowUrl === 'string' && requestUrl.indexOf(allowUrl) !== -1) ||
          (allowUrl instanceof RegExp && requestUrl.match(allowUrl)))
        return true;
    return false;
  }
}