import express from 'express'
import Global from '~/middlewares/Global';
import Environment from '~/middlewares/Environment';
import View from '~/middlewares/View';
import Http from '~/middlewares/Http';
import CORS from '~/middlewares/CORS';
import Local from '~/middlewares/Local';
import Authentication from '~/middlewares/Authentication';
import Router from '~/routing/Router';
import Config from '~/interfaces/Config';
import fs from 'fs';

/**
 * Mount extensions on your application.
 * 
 * @param {express.Express}  app                Express application instance
 */
export default function(app: express.Express): void {
  // Set global variables.
  Global.mount();

  // Get config.
  const configPath = `${process.cwd()}/config/config`;
  if (!fs.existsSync(`${configPath}.js`)) 
    throw new Error(`${configPath} not found`);
  const config = require(configPath) as Config;

  // Set environment variables.
  Environment.mount();

  // Enable Handlebars template engine.
  View.mount(app);

  // Defines all the requisites in HTTP.
  Http.mount(app);

  // Enables the CORS.
  if (config.cors_enabled) {
    console.log('CORS is enabled');
    CORS.mount(app);
  } else console.log('CORS is disabled');

  // Set local variables.
  Local.mount(app);

  // Incorporate user authentication into your application.
  if (config.auth_enabled)
    Authentication.mount(app);

  // Set up URL routing.
  Router.mount(app);
}