import express from 'express'
import Global from '~/middlewares/Global';
import Environment from '~/middlewares/Environment';
import View from '~/middlewares/View';
import Http from '~/middlewares/Http';
import CORS from '~/middlewares/CORS';
import Local from '~/middlewares/Local';
import Authentication from '~/middlewares/Authentication';
import Router from '~/routing/Router';
import loadModels from '~/database/loadModels';
import ErrorHandler from '~/middlewares/ErrorHandler';

/**
 * Mount Express Sweet extensions on your Express application.
 * Initializes all middleware in a specific order: Global → Environment → Database → HTTP → View → CORS → Local → Authentication → Router → Error Handler.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * import express from 'express';
 * import * as expx from 'express-sweet';
 * 
 * const app = express();
 * await expx.mount(app);
 * 
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 * ```
 */
export default async (app: express.Express): Promise<void> => {
  // Set global variables.
  Global.mount();

  // Load environment variables.
  await Environment.mount();

  // Model initialization and association.
  await loadModels();

  // Defines all the requisites in HTTP.
  await Http.mount(app);

  // Enable Handlebars template engine.
  await View.mount(app);

  // Enables the CORS.
  await CORS.mount(app);

  // Set local variables.
  await Local.mount(app);

  // Incorporate user authentication into your application.
  await Authentication.mount(app);

  // Set up URL routing.
  await Router.mount(app);

  // Error handling.
  await ErrorHandler.mount(app);
}