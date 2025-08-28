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
declare const _default: () => Promise<ViewConfig>;
export default _default;
