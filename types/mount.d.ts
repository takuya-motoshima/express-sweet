import express from 'express';
/**
 * Mount Express Sweet extensions on your Express application.
 * Initializes all middleware in a specific order: Global → Environment → Database → HTTP → View → CORS → Local → Authentication → Router → Error Handler.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * import express from 'express';
 * import * as expx from 'express-sweet';
 *
 * const app = express();
 * await expx.mount(app);
 *
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 * ```
 */
declare const _default: (app: express.Express) => Promise<void>;
export default _default;
