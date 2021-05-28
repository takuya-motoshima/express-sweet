import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import AuthenticationOptions from '~/interfaces/AuthenticationOptions';
import fs from 'fs';
import Model from '~/database/Model';

/**
 * Incorporate user authentication into your application.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load the config.
    const config = <AuthenticationOptions>Object.assign({
      enabled: false,
      username: 'username',
      password: 'password',
      success_redirect: '/',
      failure_redirect: '/login',
      model: undefined,
      allow_unauthenticated: [],
      expiration: 24 * 3600000 // 24hours
    }, fs.existsSync(`${process.cwd()}/config/authentication.js`) ? require(`${process.cwd()}/config/authentication`) : {});

    // Exit if authentication is disabled.
    if (!config.enabled)
      return;

    // Set session save method.
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: config.expiration
      }
    }));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: config.username,
      passwordField: config.password,
      session: true
    }, async (username: string, password: string, done) => {
      // @ts-ignore
      const user = await config.model.findOne({
        where: {
          [config.username!]: username,
          [config.password!]: password
        },
        raw: true
      }) as {[key: string]: any};
      done(null, user||false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser<number>((user: {[key: string]: any}, done) => done(null, user.id||undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id, done) => {
      // @ts-ignore
      const user = await config.model.findOne({
        where: {id},
        raw: true
      }) as {[key: string]: any};

      // For security, delete the password value.
      if (user)
        delete user[config.password!];
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
      if (config.allow_unauthenticated && config.allow_unauthenticated.length) {
        const url = req.path.replace(/\/$/, '');
        for (let allowedString of config.allow_unauthenticated)
          if (url.indexOf(allowedString) !== -1) {
            return void next();
          }
      }

      // Asynchronous request flag.
      const isAjax = req.xhr;

      // Check if you are logged in.
      if (req.isAuthenticated()) {
        // For authenticated users.
        if (req.path !== config.failure_redirect||isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        }
          else res.redirect(config.success_redirect!);
      } else {
        // For unauthenticated users.
        if (req.path === config.failure_redirect||isAjax)
          next();
        else
          res.redirect(config.failure_redirect!);
      }
    });
  }
}
