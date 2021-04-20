import express from 'express';
import Config from '~/interfaces/Config';

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
    // Get config.
    const config = Object.assign({
      rewrite_base_url: (baseUrl: string): string => baseUrl,
    }, require(`${global.APP_DIR}/config/config`)) as Config;

    // Generate baseUrl for this application based on request header.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Generate base URL.
      let baseUrl = req.headers.referer
        ? new URL(req.headers.referer).origin
        : 'x-forwarded-proto' in req.headers ? `${req.headers['x-forwarded-proto']}://${req.headers.host}` : `//${req.headers.host}`;

      // Call a callback function that rewrites baseUrl.
      if (config.rewrite_base_url)
        baseUrl = config.rewrite_base_url(baseUrl);

      // Set baseUrl to a local variable.
      app.locals.baseUrl = baseUrl;
      // console.log(`app.locals.baseUrl: ${app.locals.baseUrl}`);
      next();
    });
  }
}