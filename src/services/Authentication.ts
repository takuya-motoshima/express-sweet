import express from 'express';
import passport from 'passport';
import Config from '~/interfaces/Authentication';
import fs from 'fs';

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
  public static authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
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
   */
  public static logout(req: express.Request): void {
    req.logout();
  }

  /**
   * Redirects to the page that responds immediately after successful authentication set in "success_redirect" of "config/authentication.js".
   * 
   * @param {express.Response} res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   */
  public static successRedirect(res: express.Response): void {
    // Load the config.
    const config = <Config>Object.assign({
      success_redirect: '/',
    }, fs.existsSync(`${process.cwd()}/config/authentication.js`) ? require(`${process.cwd()}/config/authentication`) : {});
    res.redirect(config.success_redirect as string);
  }

  /**
   * Redirects to the page that responds immediately after authentication failure set in "failure_redirect" of "config/authentication.js".
   * 
   * @param {express.Response} res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   */
  public static failureRedirect(res: express.Response): void {
    // Load the config.
    const config = <Config>Object.assign({
      failure_redirect: '/login',
    }, fs.existsSync(`${process.cwd()}/config/authentication.js`) ? require(`${process.cwd()}/config/authentication`) : {});
    res.redirect(config.failure_redirect as string);
  }
}
