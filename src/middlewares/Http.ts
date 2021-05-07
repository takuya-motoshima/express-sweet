import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import Config from '~/interfaces/Config';
import fs from 'fs';
// TODO: Importing multer results in a run-time error.I couldn't find a solution, so I decided to load multer with require.
// import multer from 'multer';
// TODO: If you import morgan here, "GMT morgan deprecated" will occur, so morgan is used by require.
// import morgan from 'morgan';

/**
 * Defines all the requisites in HTTP.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load the config.
    const config = <Config>Object.assign({
      max_body_size: '100kb'
    }, fs.existsSync(`${process.cwd()}/config/config.js`) ? require(`${process.cwd()}/config/config`) : {});
    console.log(`Maximum body size: ${config.max_body_size}`);

    // Log HTTP request.
    const morgan = require('morgan')
    app.use(morgan('dev'));

    // For parsing application/json.
    app.use(express.json({limit: config.max_body_size}));

    // For parsing application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true, limit: config.max_body_size}));

    // For parsing multipart/form-data.
    const multer = require('multer');
    const upload = multer();
    app.use(upload.array('files'));

    // // For parsing Cookie.
    app.use(cookieParser());

    // Static file path.
    const publicDir = path.join(process.cwd(), 'public');
    console.log(`Public directory: ${publicDir}`);
    app.use(express.static(publicDir));
  }
}