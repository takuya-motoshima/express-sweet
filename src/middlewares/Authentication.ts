import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import AuthenticationOptions from '~/interfaces/AuthenticationOptions';
import fs from 'fs';
import Model from '~/database/Model';
import Types from '~/utils/Types';

/**
 * Incorporate user authentication into your application.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load options.
    const opts = this.loadOptions();

    // Exit if authentication is disabled.
    if (!opts.enabled)
      return;

    // Set session save method.
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: opts.expiration
      }
    }));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: opts.username,
      passwordField: opts.password,
      session: true
    }, async (username: string, password: string, done) => {
      // Find the user who owns the credentials.
      const user = <{[key: string]: any}|null> await opts.authenticate_user(username, password);
      // const user = <{[key: string]: any}> await (opts.model as typeof Model).findOne({
      //   where: {
      //     [opts.username]: username,
      //     [opts.password]: password
      //   },
      //   raw: true
      // });

      // Debug authentication results.
      if (user)
        console.log(`Successful authentication of ${username}`);
      else
        console.log(`Failure authentication of ${username}`);

      // Authentication done.
      done(null, user||false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser<number>((user: {[key: string]: any}, done) => done(null, user.id||undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id, done) => {
      // Find credentialed user information.
      const user = <{[key: string]: any}> await opts.subscribe_user(id as number);
      // const user = <{[key: string]: any}> await opts.model.findOne({where: {id}, raw: true});
      // // For security, delete the password value.
      // if (user) delete user[opts.password];

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
      // Check if the request URL does not require authentication
      if (opts.allow_unauthenticated && opts.allow_unauthenticated.length) {
        const url = req.path.replace(/\/$/, '');
        for (let allowedString of opts.allow_unauthenticated) {
          if (url.indexOf(allowedString) !== -1)
            return void next();
        }
      }

      // Asynchronous request flag.
      const isAjax = req.xhr;

      // Check if you are logged in.
      if (req.isAuthenticated()) {
        // For authenticated users.
        if (req.path !== opts.failure_redirect||isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else {
          res.redirect(opts.success_redirect);
        }
      } else {
        // For unauthenticated users.
        if (req.path === opts.failure_redirect||isAjax)
          next();
        else
          res.redirect(opts.failure_redirect);
      }
    });
  }

  /**
   * Returns the option.
   * 
   * @return {AuthenticationOptions} option.
   */
  private static loadOptions(): AuthenticationOptions {
    // Options with default values set.
    const defOpts: AuthenticationOptions = {
      enabled: false,
      username: 'username',
      password: 'password',
      success_redirect: '/',
      failure_redirect: '/login',
      authenticate_user: (username: string, password: string) => new Promise(resolve => resolve(null)),
      subscribe_user: (id: number|string) => new Promise(resolve => resolve({} as {[key: string]: any})),
      allow_unauthenticated: [],
      expiration: 24 * 3600000 // 24hours
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/authentication`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defOpts, require(filePath).default||require(filePath));
  }
}