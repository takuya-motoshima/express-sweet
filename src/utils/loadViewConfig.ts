import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import ViewConfig from '~/interfaces/ViewConfig';

/**
 * Load view configuration from config/view.js file.
 * Returns default Handlebars view configuration if config file doesn't exist.
 * @returns {Promise<ViewConfig>} The loaded view configuration with defaults
 * @example
 * ```js
 * import loadViewConfig from '~/utils/loadViewConfig';
 * 
 * const config = await loadViewConfig();
 * console.log(config.views_dir);      // 'views' (default)
 * console.log(config.extension);      // '.hbs' (default)
 * console.log(config.layouts_dir);    // 'views/layout' (default)
 * ```
 * 
 * @example
 * ```js
 * // config/view.js structure
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
export default async (): Promise<ViewConfig> => {
  // Options with default values set.
  const defaultOptions: ViewConfig = {
    views_dir: path.join(process.cwd(), 'views'),
    partials_dir: path.join(process.cwd(), 'views/partials'),
    layouts_dir: path.join(process.cwd(), 'views/layout'),
    default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
    extension: '.hbs',
    beforeRender: (req: express.Request, res: express.Response) => {}
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/view`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // If an options file is found, it returns options that override the default options.
  const {default: options} = await import(`${filePath}.js`);
  return Object.assign(defaultOptions, options);
}