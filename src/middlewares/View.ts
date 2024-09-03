import express from 'express';
import {engine} from 'express-handlebars';
import * as helpers from '~/handlebars_helpers';
import * as utils from '~/utils';

/**
 * Enable Handlebars template engine.
 */
export default class {
  /**
   * Mount on application.
   * @param {express.Express} app Express application instance.
   * @return {Promise<void>}
   */
  static async mount(app: express.Express) {
    // Load configuration.
    const viewConfig = await utils.loadViewConfig();

    // Apply template engine to your app.
    app.engine(viewConfig.extension || '.hbs', engine({
      partialsDir: viewConfig.partials_dir,
      layoutsDir: viewConfig.layouts_dir,
      defaultLayout: viewConfig.default_layout,
      extname: viewConfig.extension,
      helpers: Object.entries(helpers).reduce((helpers, [_, handles]) => {
        for (let [name, handle] of Object.entries(handles))
          helpers[name] = handle;
        return helpers;
      }, {} as Record<string, Handlebars.HelperDelegate>),
    }));
    app.set('view engine', viewConfig.extension || '.hbs');
    app.set('view cache', false);
    app.set('views',  viewConfig.views_dir);

    // NOTE: Fixed a bug that login user data (req.user) could not be referenced in the function called just before view rendering (config/view.js#beforeRender).This needed to be done after the login user was loaded in the login authentication middleware (middlewares/Authentication).
    // await this.mountBeforeRender(app);
  }

  /**
   * Mount middleware to be executed just before drawing the view.
   * @param {express.Express} app Express application instance.
   * @return {Promise<void>}
   */
  static async mountBeforeRender(app: express.Express) {
    // Load configuration.
    const viewConfig = await utils.loadViewConfig();

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