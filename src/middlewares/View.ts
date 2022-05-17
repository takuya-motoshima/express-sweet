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
    // Load options.
    const options = this.loadOptions();

    // Debug View options.
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

  /**
   * Returns the option.
   * 
   * @return {ViewOptions} option.
   */
  private static loadOptions(): ViewOptions {
    // Options with default values set.
    const defOpts: ViewOptions = {
      views_dir: path.join(process.cwd(), 'views'),
      partials_dir: path.join(process.cwd(), 'views/partials'),
      layouts_dir: path.join(process.cwd(), 'views/layout'),
      default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
      extension: '.hbs'
   };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/view`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defOpts, require(filePath).default||require(filePath));
  }
}