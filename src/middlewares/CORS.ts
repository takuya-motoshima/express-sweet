import express from 'express';
import * as utils from '~/utils';

/**
 * Enables Cross-Origin Resource Sharing (CORS) middleware.
 * Allows requests from another domain to the application by setting appropriate headers.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | MDN CORS}
 * @example
 * ```js
 * // Enable CORS in config/config.js
 * export default {
 *   cors_enabled: true
 * };
 * ```
 */
export default class CORS {
  /**
   * Mount CORS middleware on Express application.
   * Sets appropriate CORS headers to allow cross-origin requests.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import CORS from './middlewares/CORS';
   * 
   * await CORS.mount(app);
   * ```
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

    // Exit if CORS is disabled.
    if (!basicConfig.cors_enabled) {
      return;
    }

    // Add CORS header to response when request received.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }
}