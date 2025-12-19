import express from 'express';
/**
 * Mount CORS middleware on Express application.
 *
 * Enables Cross-Origin Resource Sharing (CORS) middleware.
 * Allows requests from another domain to the application by setting appropriate headers.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | MDN CORS}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import corsPolicy from './middlewares/corsPolicy.js';
 *
 * await corsPolicy(app);
 * ```
 * @example
 * ```js
 * // Enable CORS in config/config.js
 * export default {
 *   /**
 *    * Enable CORS for cross-origin requests, defaults to disabled (false).
 *    * @type {boolean}
 *    *\/
 *   cors_enabled: true
 * };
 * ```
 */
export default function corsPolicy(app: express.Express): Promise<void>;
