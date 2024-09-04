import express from 'express';
import createError from 'http-errors';
import * as utils from '~/utils';

/**
 * Error handling.
 */
export default class {
  /**
   * Mount on application.
   * @param {express.Express} app Express application instance.
   * @return {Promise<void>}
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use(async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (basicConfig.hook_handle_error)
        // Call error hook function.
        basicConfig.hook_handle_error(err, req, res, next);
      else {
        // Output error to log.
        console.error(err);

        // Response error is returned.
        res.status(err.status||500).end();
      }
    });
  }
}