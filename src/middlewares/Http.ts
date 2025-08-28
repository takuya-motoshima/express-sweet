import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import morgan from 'morgan';
import loadBasicConfig from '~/utils/loadBasicConfig';
import loadLoggingConfig from '~/utils/loadLoggingConfig';

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
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await loadBasicConfig();
    const loggingConfig = await loadLoggingConfig();

    // Log HTTP request.
    app.use(morgan(loggingConfig.format, {
      skip: loggingConfig.skip
    }));

    // For parsing application/json.
    app.use(express.json({limit: basicConfig.max_body_size}));

    // For parsing application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true, limit: basicConfig.max_body_size}));

    // For parsing multipart/form-data.
    const upload = multer({
      limits: {
        fieldSize: Infinity,
      },
    });
    app.use(upload.array('files'));

    // For parsing Cookie.
    app.use(cookieParser());

    // Static file path.
    const publicDir = path.join(process.cwd(), 'public');
    app.use(express.static(publicDir));
  }
}