import express from 'express';
import fs from 'fs';
import path from 'path';
import * as helpers from '~/handlebars_helpers';
import ViewOptions from '~/interfaces/ViewOptions';
// import Handlebars from 'handlebars';

/**
 * Enable Handlebars template engine.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount(app: express.Express) {
    // Load the config.
    const config = <ViewOptions>Object.assign({
      views_dir: path.join(process.cwd(), 'views'),
      partials_dir: path.join(process.cwd(), 'views/partials'),
      layouts_dir: path.join(process.cwd(), 'views/layout'),
      default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
      extension: '.hbs'     
    }, fs.existsSync(`${process.cwd()}/config/view.js`) ? require(`${process.cwd()}/config/view`) : {});
    console.log(`Set view directory to ${config.views_dir}`);
    console.log(`Set partials directory to ${config.partials_dir}`);
    console.log(`Set layouts directory to ${config.layouts_dir}`);
    console.log(`The default layout is ${config.default_layout}`);
    console.log(`The extension of the view file is ${config.extension}`);

    // Express handlebars template engine.
    const hbs = require('express-hbs');

    // Added helper function.
    for (let [_, helper] of Object.entries(helpers)) {
      for (let [name, handler] of Object.entries(helper)) {
        console.log(`Add ${name} to handlebars helper`);
        hbs.registerHelper(name, handler);
      }
    }

    // Apply template engine to your app.
    app.engine('hbs', hbs.express4({
      partialsDir: config.partials_dir,
      layoutsDir: config.layouts_dir,
      defaultLayout: config.default_layout,
      extname: config.extension
      // handlebars: Handlebars
    }));
    app.set('view engine', 'hbs');
    app.set('views',  config.views_dir);
  }
}