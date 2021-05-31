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
    // Initialize options.
    const options = <ViewOptions>Object.assign({
      views_dir: path.join(process.cwd(), 'views'),
      partials_dir: path.join(process.cwd(), 'views/partials'),
      layouts_dir: path.join(process.cwd(), 'views/layout'),
      default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
      extension: '.hbs'     
    }, fs.existsSync(`${process.cwd()}/config/view.js`) ? require(`${process.cwd()}/config/view`) : {});
    console.log(`Set view directory to ${options.views_dir}`);
    console.log(`Set partials directory to ${options.partials_dir}`);
    console.log(`Set layouts directory to ${options.layouts_dir}`);
    console.log(`The default layout is ${options.default_layout}`);
    console.log(`The extension of the view file is ${options.extension}`);

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
      partialsDir: options.partials_dir,
      layoutsDir: options.layouts_dir,
      defaultLayout: options.default_layout,
      extname: options.extension
      // handlebars: Handlebars
    }));
    app.set('view engine', 'hbs');
    app.set('views',  options.views_dir);
  }
}