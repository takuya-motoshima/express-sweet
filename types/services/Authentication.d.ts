import express from 'express';
/**
 * User authentication service using Passport.js.
 *
 * Provides static methods for user authentication, logout, and redirect handling.
 * Works with Passport.js local strategy configured in authentication middleware.
 *
 * @see {@link https://www.passportjs.org/ | Passport.js}
 * @example
 * ```js
 * // Basic authentication with JSON response
 * import {Router} from 'express';
 * import * as expx from 'express-sweet';
 *
 * const router = Router();
 * router.post('/api/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   res.json({success: isAuthenticated});
 * });
 *
 * export default router;
 * ```
 * @example
 * ```js
 * // Authentication with redirect handling
 * import {Router} from 'express';
 * import * as expx from 'express-sweet';
 *
 * const router = Router();
 * router.post('/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   if (isAuthenticated)
 *     await expx.services.Authentication.successRedirect(res);
 *   else
 *     await expx.services.Authentication.failureRedirect(req, res);
 * });
 *
 * export default router;
 * ```
 */
export default class Authentication {
    /**
     * Authenticate user using username and password from request body.
     *
     * Uses Passport.js local strategy configured via authentication middleware.
     * Expects `req.body.username` and `req.body.password` to be present.
     *
     * @param {express.Request} req HTTP request object containing user credentials in body
     * @param {express.Response} res HTTP response object
     * @param {express.NextFunction} next Next middleware function
     * @returns {Promise<boolean>} Returns true if authentication successful, false otherwise
     * @example
     * ```js
     * import {Router} from 'express';
     * import * as expx from 'express-sweet';
     *
     * const router = Router();
     * router.post('/login', async (req, res, next) => {
     *   try {
     *     const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
     *     if (isAuthenticated) {
     *       res.json({success: true, user: req.user});
     *     } else {
     *       res.status(401).json({success: false, message: 'Invalid credentials'});
     *     }
     *   } catch (error) {
     *     next(error);
     *   }
     * });
     *
     * export default router;
     * ```
     */
    static authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean>;
    /**
     * Log out the current user.
     *
     * Removes req.user property and clears the login session.
     * This method is synchronous and does not require await.
     *
     * @param {express.Request} req HTTP request object containing the user session
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
     *
     * export default router;
     * ```
     */
    static logout(req: express.Request): void;
    /**
     * Redirect to success page after successful authentication.
     *
     * Uses the URL specified in `success_redirect` option of config/authentication.js.
     * Should be called after successful authentication.
     *
     * @param {express.Response} res HTTP response object
     * @returns {Promise<void>}
     * @example
     * ```js
     * import {Router} from 'express';
     * import * as expx from 'express-sweet';
     *
     * const router = Router();
     * router.post('/login', async (req, res, next) => {
     *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
     *   if (isAuthenticated) {
     *     await expx.services.Authentication.successRedirect(res);
     *   } else {
     *     await expx.services.Authentication.failureRedirect(req, res);
     *   }
     * });
     *
     * export default router;
     * ```
     */
    static successRedirect(res: express.Response): Promise<void>;
    /**
     * Redirect to failure page after authentication failure.
     *
     * Uses the URL specified in `failure_redirect` option of config/authentication.js.
     * Supports both static URLs and dynamic URL functions.
     * Should be called after failed authentication.
     *
     * @param {express.Request} req HTTP request object
     * @param {express.Response} res HTTP response object
     * @returns {Promise<void>}
     * @example
     * ```js
     * import {Router} from 'express';
     * import * as expx from 'express-sweet';
     *
     * const router = Router();
     * router.post('/login', async (req, res, next) => {
     *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
     *   if (isAuthenticated) {
     *     await expx.services.Authentication.successRedirect(res);
     *   } else {
     *     await expx.services.Authentication.failureRedirect(req, res);
     *   }
     * });
     *
     * export default router;
     * ```
     */
    static failureRedirect(req: express.Request, res: express.Response): Promise<void>;
}
