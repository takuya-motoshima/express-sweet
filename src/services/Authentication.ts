import express from 'express';
import passport from 'passport';
import * as utils from '~/utils';

/**
 * User authentication service.
 */
export default class {
  /**
   * Authenticate the user.
   * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param {express.Response} res The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   * @param {express.NextFunction} next A function that can access the next middleware function in the application's request-response cycle.
   * @return {Promise<boolean>} Returns true if authentication is successful, false otherwise.
   */
  static authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err: any, user: any) => {
        if (err)
          return void reject(err);
        if (!user)
          return void resolve(false);
        req.logIn(user, (err: any) => {
          if (err)
            return void reject(err);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  /**
   * Log out the user.
   * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   */
  static logout(req: express.Request): void {
    req.logout((err: any) => {});
  }

  /**
   * Redirects to the page that responds immediately after successful authentication set in "success_redirect" of "config/authentication.js".
   * @param {express.Response} res The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   */
  static successRedirect(res: express.Response): void {
    // Load configuration.
    const authenticationConfig = utils.loadAuthenticationConfig();
    res.redirect(authenticationConfig.success_redirect!);
  }

  /**
   * Redirects to the page that responds immediately after authentication failure set in "failure_redirect" of "config/authentication.js".
   * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
   * @param {express.Response} res The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
   */
  static failureRedirect(req: express.Request, res: express.Response): void {
    // Load configuration.
    const authenticationConfig = utils.loadAuthenticationConfig();

    // URL to redirect to in case of login failure.
    const failureRedirectUrl = (utils.isFunction(authenticationConfig.failure_redirect)
      ? (authenticationConfig.failure_redirect as (req: express.Request, res: express.Response) => string)(req, res)
      : authenticationConfig.failure_redirect) as string;
    res.redirect(failureRedirectUrl);
  }
}