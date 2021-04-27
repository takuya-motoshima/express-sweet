import express from 'express';
import createError from 'http-errors';
import Hooks from '~/interfaces/Hooks';
import Types from '~/utils/Types';

/**
 * Error handling.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express, hooks: Hooks) {
    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use(async (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Get Hooks configuration.
      hooks = Object.assign({
        error_handling: (err: any): void|Promise<void> => {}
      }, hooks);

      // Output error to log.
      console.error(err);

      // Call error handling Hook.
      if (hooks.error_handling) {
        if (Types.isAsyncFunction(hooks.error_handling))
          await hooks.error_handling(err);
        else
          hooks.error_handling(err);
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