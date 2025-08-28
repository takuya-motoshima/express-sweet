import express from 'express';
import {engine} from 'express-handlebars';
import * as helpers from '~/handlebars_helpers';
import * as utils from '~/utils';

/**
 * Enable Handlebars template engine with custom helpers and configuration.
 * Sets up view engine, layouts, partials, and before-render hooks.
 * 
 * @see {@link https://handlebarsjs.com/guide/ | Handlebars Guide}
 * @example
 * ```js
 * // View configuration in config/view.js
 * export default {
 *   views_dir: 'views',
 *   partials_dir: 'views/partials',
 *   layouts_dir: 'views/layout',
 *   default_layout: 'views/layout/default',
 *   extension: '.hbs',
 *   beforeRender: (req, res) => {
 *     res.locals.extra = 'Extra';
 *   }
 * };
 * ```
 */
export default class View {
  /**
   * Mount Handlebars view engine on Express application.
   * Configures template engine, helpers, layouts, and partials.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import View from './middlewares/View';
   * 
   * await View.mount(app);
   * ```
   */
  static async mount(app: express.Express): Promise<void> {
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
    // app.enable('view cache');
    app.disable('view cache');
    app.set('views',  viewConfig.views_dir);

    // NOTE: Fixed a bug that login user data (req.user) could not be referenced in the function called just before view rendering (config/view.js#beforeRender).This needed to be done after the login user was loaded in the login authentication middleware (middlewares/Authentication).
    // await this.mountBeforeRender(app);
  }

  /**
   * Mount middleware to be executed just before rendering the view.
   * Allows setting view variables and executing beforeRender hooks from configuration.
   * @param {express.Express} app Express application instance
   * @returns {Promise<void>}
   * @example
   * ```js
   * // Called automatically after authentication middleware setup
   * await View.mountBeforeRender(app);
   * ```
   */
  static async mountBeforeRender(app: express.Express): Promise<void> {
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