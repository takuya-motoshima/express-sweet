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
 * @param {express.Express} app Express application instance
 */
export default function(app: express.Express): void {
  // Set global variables.
  Global.mount();

  // Set environment variables.
  Environment.mount();

  // Model initialization and association.
  loadModels();

  // Defines all the requisites in HTTP.
  Http.mount(app);

  // Enable Handlebars template engine.
  View.mount(app);

  // Enables the CORS.
  CORS.mount(app);

  // Set local variables.
  Local.mount(app);

  // Incorporate user authentication into your application.
  Authentication.mount(app);

  // Set up URL routing.
  Router.mount(app);

  // Error handling.
  ErrorHandler.mount(app);
}