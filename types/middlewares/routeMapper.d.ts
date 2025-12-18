import express from 'express';
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
/**
 * Mount file-based routing on Express application.
 * Scans the routes directory and automatically maps files to URL endpoints.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import routeMapper from './middlewares/routeMapper';
 *
 * await routeMapper(app);
 * ```
 */
export default function routeMapper(app: express.Express): Promise<void>;
