import express from 'express';
import Config from '~/interfaces/Config';
import fs from 'fs';

/**
 * Enables the CORS.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load the config.
    const config = Object.assign({
      cors_enabled: false
    }, fs.existsSync(`${process.cwd()}/config/config.js`) ? require(`${process.cwd()}/config/config`) as Config : <Config>{});

    // Exit if CORS is disabled.
    if (!config.cors_enabled)
      return void console.log('CORS is disabled');

    // Add CORS header to response when request received.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
    console.log('CORS is enabled');
  }
}