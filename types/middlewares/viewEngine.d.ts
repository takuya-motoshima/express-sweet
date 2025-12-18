import express from 'express';
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
