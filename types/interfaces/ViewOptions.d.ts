/**
 * View's configuration interface.
 */
export default interface  {
    /**
     * Absolute path to the directory where the view files are located, defaults to `<application root directory>/views`.
     * @type {string}
     */
    views_dir?: string;
    /**
     * Path to partials templates, one or several directories, defaults to `<application root directory>/views/partials`.
     * @type {string|string[]}
     */
    partials_dir?: string | string[];
    /**
     * Path to layout templates, defaults to `<application root directory>/views/layout`.
     * @type {string}
     */
    layouts_dir?: string;
    /**
     * Absolute path to default layout template. defaults to `<application root directory>/views/layout/default.hbs`.
     * @type {string}
     */
    default_layout?: string;
    /**
     * Extension for templates & partials, defaults to `.hbs`,
     * @type {string}
     */
    extension?: string;
}
