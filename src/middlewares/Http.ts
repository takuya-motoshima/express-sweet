import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import morgan from 'morgan';
import loadBasicConfig from '~/utils/loadBasicConfig';

/**
 * Defines all the requisites in HTTP.
 */
export default class {
  /**
   * Mount on application.
   * @param {express.Express} app Express application instance.
   * @return {Promise<void>}
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await loadBasicConfig();

    // Log HTTP request.
    app.use(morgan('dev'));

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