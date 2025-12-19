import express from 'express';
import createError from 'http-errors';
import * as utils from '~/utils';

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
export default async function errorHandler(app: express.Express): Promise<void> {
  // Load basic configuration
  const appConfig = await utils.loadAppConfig();

  // Catch all unhandled routes as 404 errors
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  });

  // Global error handler (must be defined last)
  app.use(async (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (appConfig.hook_handle_error)
      // Delegate error handling to custom hook function
      appConfig.hook_handle_error(error, req, res, next);
    else {
      // Log error to console
      console.error(error);

      // Send HTTP status code (404, 500, etc.) without body
      res.status(error.status||500).end();
    }
  });
}
