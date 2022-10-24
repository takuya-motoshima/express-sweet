import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy, IVerifyOptions} from 'passport-local';
import session from 'express-session';
import AuthenticationOptions from '~/interfaces/AuthenticationOptions';
import fs from 'fs';
import connectRedis from 'connect-redis';
// FIXME: When I read createClient with "import", a "Cannot read property transformRedisJsonNullReply of undefined" execution error occurred, but I could not solve it, so I used "require".
const createClient = require('redis').createClient;
// import {createClient} from 'redis';

/**
 * Incorporate user authentication into your application.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated, the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 403 error is returned.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load options.
    const options: AuthenticationOptions = this.loadOptions();

    // Exit if authentication is disabled.
    if (!options.enabled)
      return;

    // Session connection options.
    const sessionOptions: session.SessionOptions = {
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: options.expiration
      }
    };

    // When session is stored in redis.
    if (options.session_store === 'redis') {
      // Create a client to connect to the redis server.
      const redisClient = createClient({
        url: options.redis_host as string,
        legacyMode: true
      });

      // Check if you can connect to the Redis server.
      redisClient.connect().catch(console.error);

      // Set up redis session storage in the session store.
      const RedisStore = connectRedis(session);
      sessionOptions.store = new RedisStore({client: redisClient});
    }

    // Set session save method.
    app.use(session(sessionOptions));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: options.username,
      passwordField: options.password,
      session: true,
      // NOTE: The passReqToCallback option must be enabled in order to receive the request object in the first parameter of the authentication callback function.
      passReqToCallback: true
    }, async (
      req: express.Request,
      username: string,
      password: string,
      done: (error: any, user?: any, options?: IVerifyOptions
    ) => void) => {
      // Find the user who owns the credentials.
      const user = <{[key: string]: any}|null> await options.authenticate_user(username, password, req);

      // Authentication done.
      done(null, user || false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser<number>((user: {[key: string]: any}, done) => done(null, user.id || undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id, done) => {
      // Find credentialed user information.
      const user = <{[key: string]: any}> await options.subscribe_user(id as number);
      // const user = <{[key: string]: any}> await options.model.findOne({where: {id}, raw: true});
      // // For security, delete the password value.
      // if (user)
      //   delete user[options.password];

      // Done deserialization of authenticated user.
      done(null, user);
    });

    // Initialize Passport.
    app.use(passport.initialize());

    // Authenticate access with session.
    // It also manages req.user, reads the session id from the client cookie, and "deserializes" to the user information based on it.
    app.use(passport.session());

    // Check the authentication status of the request.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Check if the request URL does not require authentication.
      if (options.allow_unauthenticated && this.isNotRequireAuthentication(req, options.allow_unauthenticated))
        return void next();

      // Asynchronous request flag.
      const isAjax = options.is_ajax(req);

      // Check if you are logged in.
      if (req.isAuthenticated()) {
        // For authenticated users.
        if (req.path !== options.failure_redirect || isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else
          res.redirect(options.success_redirect);
      } else if (!isAjax)
        // If authentication is not established and asynchronous communication is not used, the user is redirected to the login page.
        if (req.path === options.failure_redirect)
          next();
        else
          res.redirect(options.failure_redirect);
      else
        // If authentication is not established and asynchronous communication is used, a 403 error is returned.
        res.status(403).end();
    });
  }

  /**
   * Returns the option.
   * 
   * @return {AuthenticationOptions} option.
   */
  private static loadOptions(): AuthenticationOptions {
    // Options with default values set.
    const defaultOptions: AuthenticationOptions = {
      enabled: false,
      session_store: 'memory',
      redis_host: undefined,
      username: 'username',
      password: 'password',
      success_redirect: '/',
      failure_redirect: '/login',
      authenticate_user: (username: string, password: string, req: express.Request) => new Promise(resolve => resolve(null)),
      subscribe_user: (id: number|string) => new Promise(resolve => resolve({} as {[key: string]: any})),
      allow_unauthenticated: [],
      expiration: 24 * 3600000, // 24hours
      is_ajax: (req: express.Request): boolean => {
        return !!req.xhr;
      }
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/authentication`;
    if (!fs.existsSync(`${filePath}.js`))
      return defaultOptions;

    // If an options file is found, it is merged with the default options.
    const mergeOptions = Object.assign(defaultOptions, require(filePath).default || require(filePath));

    // Check required options.
    if (mergeOptions.session_store === 'redis' && !mergeOptions.redis_host)
      throw new TypeError('If the session store is redis, redis_host in the authentication configuration is required');

    // If an options file is found, it returns options that override the default options.
    return mergeOptions;
  }

  /**
   * Check if the request URL does not require authentication.
   *
   * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param {(string|RegExp)[]} allowUrls A list of URLs that do not require authentication.
   * @returns {boolean} Return true if the request URL does not require authentication.
   */
  private static isNotRequireAuthentication(req: express.Request, allowUrls: (string|RegExp)[]): boolean {
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