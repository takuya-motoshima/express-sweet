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
// import ErrorHandling from '~/middlewares/ErrorHandling';

/**
 * Mount extensions on your application.
 * 
 * @param {express.Express}  app                Express application instance
 */
export default function(app: express.Express): void {
  // Model initialization and association.
  loadModels();

  // Set global variables.
  Global.mount();

  // Set environment variables.
  Environment.mount();

  // Enable Handlebars template engine.
  View.mount(app);

  // Defines all the requisites in HTTP.
  Http.mount(app);

  // Enables the CORS.
  CORS.mount(app);

  // Set local variables.
  Local.mount(app);

  // Incorporate user authentication into your application.
  Authentication.mount(app);

  // Set up URL routing.
  Router.mount(app);

  // Error handling.
  // ErrorHandling.mount(app);
}