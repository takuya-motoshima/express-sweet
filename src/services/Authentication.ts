import express from 'express';
import passport from 'passport';
import * as utils from '~/utils';

/**
 * User authentication service using Passport.js.
 * Provides methods for user authentication, logout, and redirect handling.
 * 
 * @see {@link https://www.passportjs.org/ | Passport.js}
 * @example
 * ```js
 * // Using in async request handler
 * import * as expx from 'express-sweet';
 * 
 * router.post('/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   res.json(isAuthenticated);
 * });
 * ```
 * 
 * @example
 * ```js
 * // Using in sync request handler
 * router.post('/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   if (isAuthenticated)
 *     await expx.services.Authentication.successRedirect(res);
 *   else
 *     await expx.services.Authentication.failureRedirect(req, res);
 * });
 * ```
 */
export default class Authentication {
  /**
   * Authenticate the user using username and password from request body.
   * Uses Passport.js local strategy for authentication.
   * @param {express.Request} req The HTTP request object containing user credentials
   * @param {express.Response} res The HTTP response object
   * @param {express.NextFunction} next The next middleware function
   * @returns {Promise<boolean>} Returns true if authentication is successful, false otherwise
   * @example
   * ```js
   * // For asynchronous requests
   * const router = Router();
   * router.post('/login', async (req, res, next) => {
   *   const isAuthenticated = await Authentication.authenticate(req, res, next);
   *   res.json(isAuthenticated);
   * });
   * ```
   */
  static authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (error: any, user: any) => {
        if (error)
          return void reject(error);
        if (!user)
          return void resolve(false);
        req.logIn(user, (error: any) => {
          if (error)
            return void reject(error);
          resolve(true);
        });
      })(req, res, next);
    });
  }

  /**
   * Log out the user by removing req.user property and clearing the login session.
   * @param {express.Request} req The HTTP request object
   * @example
   * ```js
   * import {Router} from 'express';
   * import * as expx from 'express-sweet';
   * 
   * const router = Router();
   * router.get('/logout', (req, res) => {
   *   expx.services.Authentication.logout(req);
   *   res.redirect('/');
   * });
   * ```
   */
  static logout(req: express.Request): void {
    req.logout((error: any) => {});
  }

  /**
   * Redirects to the success page after successful authentication.
   * Uses the URL specified in "success_redirect" of config/authentication.js.
   * @param {express.Response} res The HTTP response object
   * @returns {Promise<void>}
   * @example
   * ```js
   * // For synchronous login handling
   * const isAuthenticated = await Authentication.authenticate(req, res, next);
   * if (isAuthenticated)
   *   await Authentication.successRedirect(res);
   * ```
   */
  static async successRedirect(res: express.Response): Promise<void> {
    // Load authentication configuration
    const authenticationConfig = await utils.loadAuthenticationConfig();
    res.redirect(authenticationConfig.success_redirect!);
  }

  /**
   * Redirects to the failure page after authentication failure.
   * Uses the URL specified in "failure_redirect" of config/authentication.js.
   * Supports both static URLs and dynamic URL functions.
   * @param {express.Request} req The HTTP request object
   * @param {express.Response} res The HTTP response object
   * @returns {Promise<void>}
   * @example
   * ```js
   * // For synchronous login handling
   * const isAuthenticated = await Authentication.authenticate(req, res, next);
   * if (!isAuthenticated)
   *   await Authentication.failureRedirect(req, res);
   * ```
   */
  static async failureRedirect(req: express.Request, res: express.Response): Promise<void> {
    // Load authentication configuration
    const authenticationConfig = await utils.loadAuthenticationConfig();

    // Resolve failure redirect URL (can be static string or dynamic function)
    const failureRedirectUrl = (utils.isFunction(authenticationConfig.failure_redirect)
      ? (authenticationConfig.failure_redirect as (req: express.Request, res: express.Response) => string)(req, res)
      : authenticationConfig.failure_redirect) as string;
    res.redirect(failureRedirectUrl);
  }
}