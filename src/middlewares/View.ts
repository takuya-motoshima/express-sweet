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
  public static mount(app: express.Express, config: Config) {
    // Get config.
    config = Object.assign({
      views_dir: path.join(process.cwd(), 'views'),
      views_partials_dir: path.join(process.cwd(), 'views/partials'),
      views_layouts_dir: path.join(process.cwd(), 'views/layout'),
      views_default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
      views_extension: '.hbs'
    }, config);

    console.log(`Set "${config.views_dir}" to View directory`);
    console.log(`Set "${config.views_partials_dir}" to Partials directory`);
    console.log(`Set "${config.views_layouts_dir}" to Layouts directory`);
    console.log(`Set "${config.views_default_layout}" to Default layout`);

    // Express handlebars template engine.
    const hbs = require('express-hbs');

    // Added helper function.
    hbs.registerHelper('json', helpers.json);
    console.log('Set json handlebars helper');
    hbs.registerHelper('replace', helpers.replace);
    console.log('Set replace handlebars helper');
    hbs.registerHelper('cache_busting', helpers.cache_busting);
    console.log('Set cache_busting handlebars helper');
    for (let [name, helper] of Object.entries(helpers.conditionals)) {
      console.log(`Set ${name} handlebars helper`);
      hbs.registerHelper(name, helper);
    }

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