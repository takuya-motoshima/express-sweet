import express from 'express';
import * as utils from '~/utils';

/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const basicConfig = utils.loadBasicConfig();

    // Generate baseUrl for this application based on request header.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {

      // Set the current URL to a local variable.
      app.locals.currentPath = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`).pathname;

      // Set base URL.
      if (req.headers.referer) {
        const url = new URL(req.headers.referer);

        // Set baseUrl to a local variable.
        app.locals.baseUrl = url.origin;
      } else {
        // Set baseUrl to a local variable.
        app.locals.baseUrl = 'x-forwarded-proto' in req.headers
          ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
          : `//${req.headers.host}`;
      }

      // Call a callback function that rewrites baseUrl.
      if (basicConfig.rewrite_base_url)
        app.locals.baseUrl = basicConfig.rewrite_base_url(app.locals.baseUrl);
      next();
    });
  }
}