import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import loadAppConfig from '~/utils/loadAppConfig';
import loadLoggingConfig from '~/utils/loadLoggingConfig';

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
export default async function requestParser(app: express.Express): Promise<void> {
  // Load configuration.
  const appConfig = await loadAppConfig();
  const loggingConfig = await loadLoggingConfig();

  // Use extended query parser for nested objects (Express 4 compatibility)
  app.set('query parser', 'extended');

  // Log HTTP request.
  app.use(morgan(loggingConfig.format, {
    skip: loggingConfig.skip
  }));

  // For parsing application/json.
  app.use(express.json({
    limit: appConfig.max_body_size,
  }));

  // For parsing application/x-www-form-urlencoded.
  app.use(express.urlencoded({
    extended: true,
    limit: appConfig.max_body_size
  }));

  // For parsing Cookie.
  app.use(cookieParser());

  // Static file path.
  const publicDir = path.join(process.cwd(), 'public');
  app.use(express.static(publicDir));
}
