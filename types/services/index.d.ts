/**
 * Business logic services for Express Sweet.
 *
 * Provides high-level service classes for common application functionality
 * such as user authentication, authorization, and other business operations.
 *
 * @module services
 * @example
 * ```js
 * // Using authentication service in routes
 * import * as expx from 'express-sweet';
 * import {Router} from 'express';
 *
 * const router = Router();
 *
 * router.post('/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   if (isAuthenticated)
 *     await expx.services.Authentication.successRedirect(res);
 *   else
 *     await expx.services.Authentication.failureRedirect(req, res);
 * });
 *
 * router.get('/logout', (req, res) => {
 *   expx.services.Authentication.logout(req);
 *   res.redirect('/');
 * });
 * ```
 */
/**
 * User authentication service using Passport.js
 */
export { default as Authentication } from './Authentication';
