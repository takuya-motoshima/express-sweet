import express from 'express';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import session from 'express-session';
import Config from '~/interfaces/Config';

/**
 * Incorporate user authentication into your application.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Get config.
    const config = Object.assign({
      auth_username: 'username',
      auth_password: 'password',
      auth_success_redirect: '',
      auth_failure_redirect: '/login',
      auth_model: undefined,
      auth_exclude: undefined,
      auth_expiration: 24 * 3600000 // 24hours
    }, require(`${global.APP_DIR}/config/config`)) as Config;

    // Set session save method.
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: config.auth_expiration
      }
    }));

    // Use passport-local to set up local authentication with username and password.
    passport.use(new LocalStrategy({
      usernameField: config.auth_username,
      passwordField: config.auth_password,
      session: true
    }, async (username: string, password: string, done) => {
      const user = await config.auth_model.findOne({
        where: {
          [config.auth_username]: username,
          [config.auth_password]: password
        },
        raw: true
      });
      done(null, user||false);
    }));

    // Serialize the user information (ID in this case) and embed it in the session.
    passport.serializeUser<number>((user: {[key: string]: any}, done) => done(null, user.id||undefined));

    // When the request is received, the user data corresponding to the ID is acquired and stored in req.user.
    passport.deserializeUser(async (id, done) => {
      // @ts-ignore
      const user = await config.auth_model.findOne({where: {id}, raw: true}) as {[key: string]: any};
      if (user) delete user[config.auth_password];
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
      if (config.auth_exclude && config.auth_exclude.length) {
        const requestUrl = req.path.replace(/\/$/, '');
        if (config.auth_exclude.indexOf(requestUrl) !== -1)
          return void next();
      }

      const isAjax = req.xhr;
      if (req.isAuthenticated()) {
        if (req.path !== config.auth_failure_redirect||isAjax) {
          // Make user information available as a template variable when a view is requested.
          res.locals.session = req.user;
          next();
        } else res.redirect(config.auth_success_redirect);
      } else {
        if (req.path === config.auth_failure_redirect||isAjax)
          next();
        else
          res.redirect(config.auth_failure_redirect);
      }
    });
  }

  /**
   * Sign in user.
   */
  signin(req: express.Request, res: express.Response, next: express.NextFunction) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (error, user) => {
        if (error) return void reject(error);
        if (!user) return void resolve(false);
        req.logIn(user, error => {
          if (error) return void reject(error);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  /**
   * Sign out the user.
   */
  signout(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.logout();
  }
}
