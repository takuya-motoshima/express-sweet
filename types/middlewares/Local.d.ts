import express from 'express';
/**
 * Set local variables accessible in Handlebars views.
 * Variables can be accessed in all views as {{var}} or {{{var}}}.
 *
 * Local variables set:
 * - baseUrl: The base URL for this application (can be rewritten via config hook)
 * - currentPath: The current request path
 *
 * @example
 * ```handlebars
 * // Using in Handlebars templates
 * <a href="{{baseUrl}}/home">Home</a>
 * {{#if (eq currentPath '/dashboard')}}Active{{/if}}
 * ```
 *
 * @example
 * // Base URL rewriting in config/config.js
 * ```js
 * export default {
 *   rewrite_base_url: baseUrl => {
 *     return `${baseUrl}/admin`;
 *   }
 * };
 * ```
 */
export default class Local {
    /**
     * Mount local variables middleware on Express application.
     * Sets up baseUrl and currentPath variables for use in views.
     * @param {express.Express} app Express application instance
     * @returns {Promise<void>}
     * @example
     * ```js
     * // This method is called automatically by express-sweet.mount()
     * import Local from './middlewares/Local';
     *
     * await Local.mount(app);
     * ```
     */
    static mount(app: express.Express): Promise<void>;
}
