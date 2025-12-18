import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import loadAppConfig from '~/utils/loadAppConfig';
import loadLoggingConfig from '~/utils/loadLoggingConfig';

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
