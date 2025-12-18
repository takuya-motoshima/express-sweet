import express from 'express';
/**
 * Set local variables accessible in Handlebars views.
 * Variables can be accessed in all views as {{var}} or {{{var}}}.
 *
 * Local variables set:
 * - baseUrl: The base URL for this application (undefined if URL construction fails)
 * - currentPath: The current request path
 *
 * @example
 * ```handlebars
 * // Using in Handlebars templates
 * {{#if baseUrl}}
 *   <a href="{{baseUrl}}/home">Home</a>
 * {{/if}}
 * {{#if (eq currentPath '/dashboard')}}Active{{/if}}
 * ```
 *
 * @example
 * // Base URL rewriting in config/config.js
 * // The hook receives undefined if URL construction fails
 * ```js
 * export default {
 *   rewrite_base_url: baseUrl => {
 *     if (!baseUrl) return 'http://localhost:3000'; // Fallback
 *     return `${baseUrl}/admin`;
 *   }
 * };
 * ```
 */
/**
 * Mount local variables middleware on Express application.
 * Sets up baseUrl and currentPath variables for use in views.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import localVars from './middlewares/localVars';
 *
 * await localVars(app);
 * ```
 */
export default function localVars(app: express.Express): Promise<void>;
