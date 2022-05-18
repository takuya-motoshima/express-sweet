import express from 'express';
import createError from 'http-errors';
import Config from '~/interfaces/Config';
import utils from '~/utils';
import fs from 'fs';

/**
 * Error handling.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load options.
    const options = this.loadOptions();

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use(async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Output error to log.
      console.error(err);

      // Call error handling Hook.
      if (options.error_handler) {
        if (utils.isAsyncFunction(options.error_handler))
          await options.error_handler(err);
        else
          options.error_handler(err);
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


  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  private static loadOptions(): Config {
    // Options with default values set.
    const defaultOptions: Config = {
      error_handler: (err: any): void|Promise<void> => {}
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defaultOptions;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defaultOptions, require(filePath).default||require(filePath));
  }
}