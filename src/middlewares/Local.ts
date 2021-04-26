import express from 'express';
import Config from '~/interfaces/Config';
import Hooks from '~/interfaces/Hooks';

/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 * 
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Get Hooks configuration.
    const hooks = Object.assign({
      rewrite_base_url: (baseUrl: string): string => baseUrl
    }, require(`${process.cwd()}/config/hooks`)) as Hooks;

    // Generate baseUrl for this application based on request header.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (req.headers.referer) {
        const url = new URL(req.headers.referer);

        // Set baseUrl to a local variable.
        app.locals.baseUrl = url.origin;

        // Set the current URL to a local variable.
        app.locals.currentPath = req.originalUrl;

        // // Debug.
        // console.log(`app.locals.baseUrl: ${app.locals.baseUrl}`);
        // console.log(`app.locals.currentPath: ${app.locals.currentPath}`);
      } else {
        // Set baseUrl to a local variable.
        app.locals.baseUrl = 'x-forwarded-proto' in req.headers
          ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
          : `//${req.headers.host}`;
      }

      // Call a callback function that rewrites baseUrl.
      if (hooks.rewrite_base_url)
        app.locals.baseUrl = hooks.rewrite_base_url(app.locals.baseUrl);
      next();
    });
  }
}