import express from 'express';
import passport from 'passport';

/**
 * User authentication service.
 */
export default class {
  /**
   * Sign in user.
   */
  public static signin(req: express.Request, res: express.Response, next: express.NextFunction) {
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
  public static signout(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.logout();
  }
}
