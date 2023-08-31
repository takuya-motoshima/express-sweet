import express from 'express';
/**
 * View's configuration interface.
 */
export default interface SesOptions {
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
    /**
     * Hook function just before the view is rendered.
     * For example, you can set your own local variables that can be used within the view.
     *
     * @example
     * // The message set here can be referenced in the view as {{message}}.
     * beforeRender: (req, res) => {
     *   res.locals.message = 'Hello World';
     * }
     *
     * @type {(res: express.Response) => Promise<void>|void}
     */
    beforeRender?: (req: express.Request, res: express.Response) => Promise<void> | void;
}
