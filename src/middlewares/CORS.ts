import fs from 'fs';
import express from 'express';
import Config from '~/interfaces/Config';

/**
 * Enables the CORS.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load options.
    const options = this.#loadOptions();

    // Exit if CORS is disabled.
    if (!options.cors_enabled)
      return;

    // Add CORS header to response when request received.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  static #loadOptions(): Config {
    // Options with default values set.
    const defaultOptions: Config = {
      cors_enabled: false
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defaultOptions;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defaultOptions, require(filePath).default||require(filePath));
  }
}