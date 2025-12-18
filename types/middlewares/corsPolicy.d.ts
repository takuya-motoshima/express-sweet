import express from 'express';
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
/**
 * Mount CORS middleware on Express application.
 * Sets appropriate CORS headers to allow cross-origin requests.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import corsPolicy from './middlewares/corsPolicy';
 *
 * await corsPolicy(app);
 * ```
 */
export default function corsPolicy(app: express.Express): Promise<void>;
