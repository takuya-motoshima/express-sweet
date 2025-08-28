import express from 'express';
import {globSync} from 'glob';
import * as utils from '~/utils';

/**
 * Set up URL routing based on file structure in the routes directory.
 * Automatically maps route files to URL endpoints using file-based routing.
 * Supports nested routing and default routes.
 * 
 * @example
 * ```js
 * // Basic routing: routes/user.js responds to GET /user
 * import {Router} from 'express';
 * 
 * const router = Router();
 * router.get('/', (req, res) => {
 *   res.send('Hello World');
 * });
 * 
 * export default router;
 * ```
 * 
 * @example
 * ```js
 * // Nested routing: routes/api/users.js responds to GET /api/users
 * import {Router} from 'express';
 * 
 * const router = Router();
 * router.get('/', (req, res) => {
 *   res.send('Hello World');
 * });
 * 
 * export default router;
 * ```
 * 
 * @example
 * ```js
 * // Default routing configuration in config/config.js
 * export default {
 *   default_router: '/blog'  // routes/blog.js handles root URL "/"
 * };
 * ```
 */
export default class Router {
  /**
   * Mount file-based routing on Express application.
   * Scans the routes directory and automatically maps files to URL endpoints.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import Router from './routing/Router';
   * 
   * await Router.mount(app);
   * ```
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filePath of globSync(`${basicConfig.router_dir}/**/*.js`, {nodir: false})) {
      // Import router module.
      const {default: router} = await import(filePath);

      // Get the router directory name and file name respectively.
      const matches = filePath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches) {
        continue;
      }
      const [_, dir, filename] = matches;

      // Generate a URL from the directory and filename and map the module to the URL.
      const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
      if (process.env.EXPRESS_DEBUG) {
        console.log(`URL mapping ${url}`);
      }
      app.use(url, router);

      if (url === basicConfig.default_router) {
        // Set the default router to run when accessed with "/".
        app.use('/', router);
      }
    }
  }
}