import express from 'express';
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
export default function routeMapper(app: express.Express): Promise<void>;
