import express from 'express';
import {globSync} from 'glob';
import multer from 'multer';
import * as utils from '~/utils';
// @ts-ignore - router/lib/layer has no type definitions
import Layer from 'router/lib/layer';

/**
 * Mount file-based routing on Express application.
 *
 * Set up URL routing based on file structure in the routes directory.
 * Automatically maps route files to URL endpoints using file-based routing.
 * Supports nested routing and default routes.
 * Scans the routes directory and automatically maps files to URL endpoints.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import routeMapper from './middlewares/routeMapper.js';
 *
 * await routeMapper(app);
 * ```
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
 * @example
 * ```js
 * // Default routing configuration in config/config.js
 * export default {
 *   /**
 *    * Default router path. The specified route handles root URL "/", defaults to undefined.
 *    * @type {string|undefined}
 *    *\/
 *   default_router: '/blog'
 * };
 * ```
 * @example
 * ```js
 * // File upload configuration in config/upload.js
 * export default {
 *   /**
 *    * Enable file upload middleware, defaults to disabled (false).
 *    * @type {boolean}
 *    *\/
 *   enabled: true,
 *
 *   /**
 *    * Hook function to dynamically resolve multer middleware based on request.
 *    * Return a multer middleware instance or null to skip upload handling.
 *    * @type {((req: express.Request, multer: typeof import('multer')) => Function|null)|undefined}
 *    *\/
 *   resolve_middleware: (req, multer) => {
 *     if (req.path === '/api/user/avatar' && req.method === 'POST') {
 *       const upload = multer({ storage: multer.memoryStorage() });
 *       return upload.single('avatar');
 *     }
 *     return null;
 *   }
 * };
 * ```
 */
export default async function routeMapper(app: express.Express): Promise<void> {
  // Load configuration.
  const appConfig = await utils.loadAppConfig();
  const uploadConfig = await utils.loadUploadConfig();

  // Set the URL to route based on the path of the file in the routes directory.
  for (let filePath of globSync(`${appConfig.router_dir}/**/*.js`, {nodir: false})) {
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
    if (process.env.SWEET_DEBUG) {
      console.log(`[Sweet] Mapping URL: ${url}`);
    }

    // Inject multipart/form-data handling middleware at the beginning of each route's middleware stack
    const routerStack = (router as any).stack;
    if (Array.isArray(routerStack)) {
      routerStack.forEach((layer: any) => {
        if (layer.route && Array.isArray(layer.route.stack)) {
          // Create multer middleware for multipart/form-data handling
          const multerMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // Check if request is multipart/form-data
            const contentType = req.get('Content-Type') || '';
            if (!contentType.includes('multipart/form-data')) {
              return next();
            }

            if (process.env.SWEET_DEBUG) {
              console.log(`[Sweet] Processing multipart/form-data request: ${req.method} ${req.path}`);
            }

            // Check if upload config is enabled
            if (!uploadConfig.enabled) {
              // Upload config disabled, use default multer().none() for multipart without files
              if (process.env.SWEET_DEBUG) {
                console.log('[Sweet] Upload config disabled, using multer().none()');
              }
              return multer().none()(req, res, (err: any) => {
                if (err) {
                  console.error('[Sweet] Multipart/form-data request error:', err);
                  return next(err);
                }
                next();
              });
            }

            // Upload config enabled, resolve appropriate middleware
            const uploadMiddleware = uploadConfig.resolve_middleware(req, multer);
            const middleware = uploadMiddleware || multer().none();

            if (process.env.SWEET_DEBUG) {
              console.log(`[Sweet] Applying multer middleware: ${uploadMiddleware ? 'custom' : 'none()'}`);
            }

            middleware(req, res, (err: any) => {
              if (err) {
                console.error('[Sweet] Multipart/form-data request error:', err);
                return next(err);
              }
              next();
            });
          };

          // Create a proper Layer instance (like route.js does at line 206 and 233)
          const multerLayer = Layer('/', {}, multerMiddleware);
          multerLayer.method = undefined; // undefined means it applies to all methods

          // Insert at the beginning using unshift
          layer.route.stack.unshift(multerLayer);
        }
      });
    }

    app.use(url, router);

    if (url === appConfig.default_router) {
      // Set the default router to run when accessed with "/"
      app.use('/', router);
    }
  }
}
