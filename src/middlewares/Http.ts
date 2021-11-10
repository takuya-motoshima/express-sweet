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
    // Load options.
    const opts = this.loadOptions();
    console.log(`The maximum body size is set to ${opts.max_body_size}`);

    // Log HTTP request.
    const morgan = require('morgan')
    app.use(morgan('dev'));

    // For parsing application/json.
    app.use(express.json({limit: opts.max_body_size}));

    // For parsing application/x-www-form-urlencoded.
    app.use(express.urlencoded({extended: true, limit: opts.max_body_size}));

    // For parsing multipart/form-data.
    const multer = require('multer');
    const upload = multer({limits: {fieldSize: Infinity}});
    app.use(upload.array('files'));

    // // For parsing Cookie.
    app.use(cookieParser());

    // Static file path.
    const publicDir = path.join(process.cwd(), 'public');
    console.log(`Set public directory to ${publicDir}`);
    app.use(express.static(publicDir));
  }

  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  private static loadOptions(): Config {
    // Options with default values set.
    const defOpts: Config = {
       max_body_size: '100kb'
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defOpts, require(filePath).default||require(filePath));
  }
}