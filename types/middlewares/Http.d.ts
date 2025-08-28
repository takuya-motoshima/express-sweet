import express from 'express';
/**
 * HTTP middleware setup for Express application.
 * Configures JSON/URL-encoded parsing, file uploads, cookie parsing, static files, and request logging.
 *
 * @example
 * ```js
 * // Body size configuration in config/config.js
 * export default {
 *   max_body_size: '100mb'  // Controls request body size limit
 * };
 * ```
 */
export default class Http {
    /**
     * Mount HTTP middleware on Express application.
     * Sets up request parsing, file uploads, cookies, static files, and logging.
     * @param {express.Express} app Express application instance
     * @returns {Promise<void>}
     * @example
     * ```js
     * // This method is called automatically by express-sweet.mount()
     * import Http from './middlewares/Http';
     *
     * await Http.mount(app);
     * ```
     */
    static mount(app: express.Express): Promise<void>;
}
