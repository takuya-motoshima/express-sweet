import express from 'express';
/**
 * HTTP middleware setup for Express application.
 * Configures JSON/URL-encoded parsing, cookie parsing, static files, and request logging.
 *
 * @example
 * ```js
 * // Body size configuration in config/config.js
 * export default {
 *   max_body_size: '100mb'  // Controls request body size limit
 * };
 * ```
 */
/**
 * Mount HTTP middleware on Express application.
 * Sets up request parsing, cookies, static files, and logging.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import requestParser from './middlewares/requestParser';
 *
 * await requestParser(app);
 * ```
 */
export default function requestParser(app: express.Express): Promise<void>;
