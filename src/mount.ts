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
import Hooks from '~/interfaces/Hooks';
import ErrorHandling from '~/middlewares/ErrorHandling';
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
  let config = <Config>{};
  const configPath = `${process.cwd()}/config/config`;
  if (fs.existsSync(`${configPath}.js`)) 
    config = require(configPath) as Config;
  // if (!fs.existsSync(`${configPath}.js`)) 
  //   throw new Error(`${configPath} not found`);
  // const config = require(configPath) as Config;

  // Get Hooks configuration.
  let hooks = <Hooks>{};
  const hooksPath = `${process.cwd()}/config/hooks`;
  if (fs.existsSync(`${hooksPath}.js`)) 
    hooks = require(hooksPath) as Hooks;

  // Set environment variables.
  Environment.mount(config);

  // Enable Handlebars template engine.
  View.mount(app, config);

  // Defines all the requisites in HTTP.
  Http.mount(app, config);

  // Enables the CORS.
  if (config.cors_enabled) {
    console.log('CORS is enabled');
    CORS.mount(app);
  } else
    console.log('CORS is disabled');

  // Set local variables.
  Local.mount(app, hooks);

  // Incorporate user authentication into your application.
  if (config.auth_enabled)
    Authentication.mount(app, config);

  // Set up URL routing.
  Router.mount(app, config);

  // // Error handling.
  // ErrorHandling.mount(app, hooks);
}