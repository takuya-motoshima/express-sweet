import express from 'express';
import createError from 'http-errors';
import * as utils from '~/utils';

/**
 * Error handling middleware for Express applications.
 * Catches 404 errors and provides customizable error handling through hooks.
 * 
 * @example
 * ```js
 * // Custom error handling in config/config.js
 * export default {
 *   hook_handle_error: (error, req, res, next) => {
 *     if (error.status === 404)
 *       res.render('error/404');
 *     else
 *       res.render('error/500');
 *   }
 * };
 * ```
 */
export default class ErrorHandler {
  /**
   * Mount error handling middleware on Express application.
   * Sets up 404 error catching and custom error handling hooks.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import ErrorHandler from './middlewares/ErrorHandler';
   * 
   * await ErrorHandler.mount(app);
   * ```
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use(async (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (basicConfig.hook_handle_error)
        // Call error hook function.
        basicConfig.hook_handle_error(error, req, res, next);
      else {
        // Output error to log.
        console.error(error);

        // Response error is returned.
        res.status(error.status||500).end();
      }
    });
  }
}