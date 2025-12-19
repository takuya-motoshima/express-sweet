import express from 'express';
/**
 * Mount error handling middleware on Express application.
 *
 * Catches 404 errors and provides customizable error handling through hooks.
 * Sets up 404 error catching and custom error handling hooks.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import errorHandler from './middlewares/errorHandler.js';
 *
 * await errorHandler(app);
 * ```
 * @example
 * ```js
 * // Custom error handling in config/config.js
 * export default {
 *   /**
 *    * Custom error handler hook, defaults to undefined.
 *    * @type {((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => void)|undefined}
 *    *\/
 *   hook_handle_error: (error, req, res, next) => {
 *     if (error.status === 404)
 *       res.render('error/404');
 *     else
 *       res.render('error/500');
 *   }
 * };
 * ```
 */
export default function errorHandler(app: express.Express): Promise<void>;
