import express from 'express';
import * as utils from '~/utils';

/**
 * Set local variables accessible in Handlebars views.
 * Variables can be accessed in all views as {{var}} or {{{var}}}.
 * 
 * Local variables set:
 * - baseUrl: The base URL for this application (can be rewritten via config hook)
 * - currentPath: The current request path
 * 
 * @example
 * ```handlebars
 * // Using in Handlebars templates
 * <a href="{{baseUrl}}/home">Home</a>
 * {{#if (eq currentPath '/dashboard')}}Active{{/if}}
 * ```
 * 
 * @example
 * // Base URL rewriting in config/config.js
 * ```js
 * export default {
 *   rewrite_base_url: baseUrl => {
 *     return `${baseUrl}/admin`;
 *   }
 * };
 * ```
 */
export default class Local {
  /**
   * Mount local variables middleware on Express application.
   * Sets up baseUrl and currentPath variables for use in views.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import Local from './middlewares/Local';
   * 
   * await Local.mount(app);
   * ```
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

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