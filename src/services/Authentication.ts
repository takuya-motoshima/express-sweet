import express from 'express';
import passport from 'passport';

/**
 * User authentication service.
 */
export default class {
  /**
   * Authenticate the user.
   * 
   * @param  {express.Request}      req  The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param  {express.Response}     res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   * @param  {express.NextFunction} next A function that can access the next middleware function in the application's request-response cycle.
   * @return {Promise<boolean>}     Returns true if authentication is successful, false otherwise.
   */
  public static signin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user) => {
        if (err) return void reject(err);
        if (!user) return void resolve(false);
        req.logIn(user, err => {
          if (err) return void reject(err);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  /**
   * Log out the user.
   * 
   * @param {express.Request}      req  The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param {express.Response}     res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   * @param {express.NextFunction} next A function that can access the next middleware function in the application's request-response cycle.
   */
  public static signout(req: express.Request, res: express.Response, next: express.NextFunction): void {
    req.logout();
  }
}
