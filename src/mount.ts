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
 * Mount extensions on your application.
 * @param {express.Express} app Express application instance.
 * @return {Promise<void>}
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