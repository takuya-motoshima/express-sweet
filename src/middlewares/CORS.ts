import express from 'express';
import * as utils from '~/utils';

/**
 * Enables the CORS.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const basicConfig = utils.loadBasicConfig();

    // Exit if CORS is disabled.
    if (!basicConfig.cors_enabled)
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
}