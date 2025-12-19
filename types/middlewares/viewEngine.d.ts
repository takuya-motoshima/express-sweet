import express from 'express';
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
export default function viewEngine(app: express.Express): Promise<void>;
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
export declare function mountBeforeRender(app: express.Express): Promise<void>;
