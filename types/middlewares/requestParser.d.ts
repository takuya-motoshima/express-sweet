import express from 'express';
/**
 * Mount HTTP middleware on Express application.
 *
 * Configures JSON/URL-encoded parsing, cookie parsing, static files, and request logging.
 * Sets up request parsing, cookies, static files, and logging.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import requestParser from './middlewares/requestParser.js';
 *
 * await requestParser(app);
 * ```
 * @example
 * ```js
 * // Body size configuration in config/config.js
 * export default {
 *   /**
 *    * Maximum request body size, defaults to '100kb'.
 *    * @type {string}
 *    *\/
 *   max_body_size: '100mb'
 * };
 * ```
 * @example
 * ```js
 * // Logging configuration in config/logging.js
 * export default {
 *   /**
 *    * Morgan logging format. Common formats: 'combined', 'common', 'dev', 'short', 'tiny'.
 *    * You can also define custom format string, defaults to 'combined'.
 *    * @type {string}
 *    *\/
 *   format: 'combined',
 *
 *   /**
 *    * Function to determine if logging should be skipped for a request.
 *    * Return true to skip logging, false to log the request, defaults to undefined.
 *    * @type {((req: express.Request, res: express.Response) => boolean)|undefined}
 *    *\/
 *   skip: (req, res) => {
 *     return req.path === '/health';
 *   }
 * };
 * ```
 */
export default function requestParser(app: express.Express): Promise<void>;
