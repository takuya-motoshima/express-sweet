import express from 'express';
import fs from 'fs';
import path from 'path';
import * as helpers from '~/handlebars_helpers';
import Config from '~/interfaces/Config';
// import Handlebars from 'handlebars';

/**
 * Enable Handlebars template engine.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Get config.
    const config = Object.assign({
      views_dir: path.join(process.cwd(), 'views'),
      views_partials_dir: path.join(process.cwd(), 'views/partials'),
      views_layouts_dir: path.join(process.cwd(), 'views/layout'),
      views_default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
      views_extension: '.hbs'
    }, require(`${global.APP_DIR}/config/config`)) as Config;

    console.log(`View directory: ${config.views_dir}`);
    console.log(`Partials directory: ${config.views_partials_dir}`);
    console.log(`Layouts directory: ${config.views_layouts_dir}`);
    console.log(`Default layout: ${config.views_default_layout}`);

    // Express handlebars template engine.
    const hbs = require('express-hbs');

    // Added helper function.
    hbs.registerHelper('json', helpers.json);
    hbs.registerHelper('replace', helpers.replace);
    hbs.registerHelper('cache_busting', helpers.cache_busting);

    // Apply template engine to your app.
    app.engine('hbs', hbs.express4({
      partialsDir: config.views_partials_dir,
      layoutsDir: config.views_layouts_dir,
      defaultLayout: config.views_default_layout,
      extname: config.views_extension
      // handlebars: Handlebars
    }));
    app.set('view engine', 'hbs');
    app.set('views',  config.views_dir);
  }
}