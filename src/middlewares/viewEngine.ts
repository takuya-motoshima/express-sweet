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

/**
 * Mount Handlebars view engine on Express application.
 * Configures template engine, helpers, layouts, and partials.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import viewEngine from './middlewares/viewEngine';
 *
 * await viewEngine(app);
 * ```
 */
export default async function viewEngine(app: express.Express): Promise<void> {
  // Load view configuration
  const viewConfig = await utils.loadViewConfig();

  // Configure Handlebars template engine with custom helpers
  app.engine(viewConfig.extension || '.hbs', engine({
    partialsDir: viewConfig.partials_dir,
    layoutsDir: viewConfig.layouts_dir,
    defaultLayout: viewConfig.default_layout,
    extname: viewConfig.extension,
    // Flatten all helper modules into single helpers object
    helpers: Object.entries(helpers).reduce((helpers, [_, handles]) => {
      for (let [name, handle] of Object.entries(handles))
        helpers[name] = handle;
      return helpers;
    }, {} as Record<string, Handlebars.HelperDelegate>),
  }));
  app.set('view engine', viewConfig.extension || '.hbs');
  // Disable view caching for development (enables template hot-reloading)
  app.disable('view cache');
  app.set('views',  viewConfig.views_dir);

  // NOTE: beforeRender mounting moved to after Authentication middleware to ensure req.user is available.
  // See mountBeforeRender() which is called in mount.ts after Authentication.mount()
  // await mountBeforeRender(app);
}

/**
 * Mount middleware to be executed just before rendering the view.
 * Allows setting view variables and executing beforeRender hooks from configuration.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // Called automatically after authentication middleware setup
 * import {mountBeforeRender} from './middlewares/viewEngine';
 *
 * await mountBeforeRender(app);
 * ```
 */
export async function mountBeforeRender(app: express.Express): Promise<void> {
  // Load view configuration
  const viewConfig = await utils.loadViewConfig();

  // Execute beforeRender hook before each view rendering
  app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (viewConfig.beforeRender) {
      // Call beforeRender hook (handle both sync and async functions)
      if (utils.isAsyncFunction(viewConfig.beforeRender))
        await viewConfig.beforeRender(req, res);
      else
        viewConfig.beforeRender(req, res);
    }
    next();
  });
}
