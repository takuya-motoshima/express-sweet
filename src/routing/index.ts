/**
 * File-based routing system for Express Sweet.
 * 
 * Provides automatic route mapping based on file structure in the routes directory.
 * Routes are automatically mounted based on their file path and name.
 * 
 * @module routing
 * @example
 * ```bash
 * // File-based routing structure
 * routes/
 * ├── index.js        // responds to GET /
 * ├── users.js        // responds to GET /users
 * ├── api/
 * │   ├── auth.js     // responds to GET /api/auth
 * │   └── users.js    // responds to GET /api/users
 * └── admin/
 *     └── dashboard.js // responds to GET /admin/dashboard
 * ```
 * 
 * @example
 * ```js
 * // Basic route file (routes/users.js)
 * import {Router} from 'express';
 * 
 * const router = Router();
 * router.get('/', (req, res) => {
 *   res.send('Users list');
 * });
 * 
 * export default router;
 * ```
 */

/**
 * File-based routing class that automatically maps route files to URL endpoints
 */
export {default as Router} from './Router';