import express from 'express';
import * as helpers from '~/handlebars_helpers';
import * as utils from '~/utils';

/**
 * Enable Handlebars template engine.
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const viewConfig = utils.loadViewConfig();

    // Express handlebars template engine.
    const hbs = require('express-hbs');

    // Added helper function.
    for (let [_, helper] of Object.entries(helpers))
      for (let [name, handler] of Object.entries(helper))
        hbs.registerHelper(name, handler);

    // Apply template engine to your app.
    app.engine('hbs', hbs.express4({
      partialsDir: viewConfig.partials_dir,
      layoutsDir: viewConfig.layouts_dir,
      defaultLayout: viewConfig.default_layout,
      extname: viewConfig.extension,
    }));
    app.set('view engine', 'hbs');
    app.set('views',  viewConfig.views_dir);

    // NOTE: Fixed a bug that login user data (req.user) could not be referenced in the function called just before view rendering (config/view.js#beforeRender).
    //        This needed to be done after the login user was loaded in the login authentication middleware (middlewares/Authentication).
    // // Mount middleware to be executed just before drawing the view.
    // this.mountBeforeRender(app);
  }

  /**
   * Mount middleware to be executed just before drawing the view.
   */
  static mountBeforeRender(app: express.Express) {
    // Load configuration.
    const viewConfig = utils.loadViewConfig();

    // Set variables that can be accessed from within the view.
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (viewConfig.beforeRender) {
        // Determine if the view drawing callback is asynchronous.
        if (utils.isAsyncFunction(viewConfig.beforeRender))
          await viewConfig.beforeRender(req, res);
        else
          viewConfig.beforeRender(req, res);
      }
      next();
    });
  }
}