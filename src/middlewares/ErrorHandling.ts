import express from 'express';
import createError from 'http-errors';
import Config from '~/interfaces/Config';
import Types from '~/utils/Types';
import fs from 'fs';

/**
 * Error handling.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load the config.
    const config = <Config>Object.assign({
      error_handler: (err: any): void|Promise<void> => {}
    }, fs.existsSync(`${process.cwd()}/config/config.js`) ? require(`${process.cwd()}/config/config`) : {});

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use(async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Output error to log.
      console.error(err);

      // Call error handling Hook.
      if (config.error_handler) {
        if (Types.isAsyncFunction(config.error_handler))
          await config.error_handler(err);
        else
          config.error_handler(err);
      }

      // Set locals, only providing error in development.
      if (req.xhr) {
        res.status(err.status||500);
        res.json({error: err.message});
      } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // Render the error page.
        res.status(err.status||500);
        res.render('error');
      }
    });
  }
}