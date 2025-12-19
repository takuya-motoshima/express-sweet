import express from 'express';
import {engine} from 'express-handlebars';
import * as helpers from '~/handlebars_helpers';
import * as utils from '~/utils';

/**
 * Mount Handlebars view engine on Express application.
 *
 * Enable Handlebars template engine with custom helpers and configuration.
 * Sets up view engine, layouts, partials, and before-render hooks.
 * Configures template engine, helpers, layouts, and partials.
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @see {@link https://handlebarsjs.com/guide/ | Handlebars Guide}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import viewEngine from './middlewares/viewEngine.js';
 *
 * await viewEngine(app);
 * ```
 * @example
 * ```js
 * // View configuration in config/view.js
 * import path from 'node:path';
 *
 * export default {
 *   /**
 *    * Absolute path to the directory where the view files are located, defaults to `<application root directory>/views`.
 *    * @type {string}
 *    *\/
 *   views_dir: path.join(process.cwd(), 'views'),
 *
 *   /**
 *    * Path to partials templates, one or several directories, defaults to `<application root directory>/views/partials`.
 *    * @type {string|string[]}
 *    *\/
 *   partials_dir: path.join(process.cwd(), 'views/partials'),
 *
 *   /**
 *    * Path to layout templates, defaults to `<application root directory>/views/layout`.
 *    * @type {string}
 *    *\/
 *   layouts_dir: path.join(process.cwd(), 'views/layout'),
 *
 *   /**
 *    * Absolute path to default layout template, defaults to `<application root directory>/views/layout/default.hbs`.
 *    * @type {string}
 *    *\/
 *   default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
 *
 *   /**
 *    * Extension for templates & partials, defaults to `.hbs`.
 *    * @type {string}
 *    *\/
 *   extension: '.hbs',
 *
 *   /**
 *    * Hook function just before the view is rendered.
 *    * For example, you can set your own local variables that can be used within the view.
 *    * @type {((req: express.Request, res: express.Response) => Promise<void>|void)|undefined}
 *    *\/
 *   beforeRender: (req, res) => {
 *     res.locals.extra = 'Extra';
 *   }
 * };
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
