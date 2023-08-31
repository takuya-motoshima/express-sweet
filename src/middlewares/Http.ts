import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
// TODO: Importing multer results in a run-time error.I couldn't find a solution, so I decided to load multer with require.
// import multer from 'multer';
// TODO: If you import morgan here, "GMT morgan deprecated" will occur, so morgan is used by require.
// import morgan from 'morgan';
import * as utils from '~/utils';

/**
 * Defines all the requisites in HTTP.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const basicConfig = utils.loadBasicConfig();

    // Log HTTP request.
    const morgan = require('morgan')
    app.use(morgan('dev'));

    // For parsing application/json.
    app.use(express.json({limit: basicConfig.max_body_size}));

    // For parsing application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true, limit: basicConfig.max_body_size}));

    // For parsing multipart/form-data.
    const multer = require('multer');
    const upload = multer({limits: {fieldSize: Infinity}});
    app.use(upload.array('files'));

    // For parsing Cookie.
    app.use(cookieParser());

    // Static file path.
    const publicDir = path.join(process.cwd(), 'public');
    app.use(express.static(publicDir));
  }
}