import express from 'express';
/**
 * Mount local variables middleware on Express application.
 *
 * Set local variables accessible in Handlebars views.
 * Variables can be accessed in all views as {{var}} or {{{var}}}.
 * Sets up baseUrl and currentPath variables for use in views.
 *
 * Local variables set:
 * - baseUrl: The base URL for this application (undefined if URL construction fails)
 * - currentPath: The current request path
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import localVars from './middlewares/localVars.js';
 *
 * await localVars(app);
 * ```
 * @example
 * ```handlebars
 * // Using in Handlebars templates
 * {{#if baseUrl}}
 *   <a href="{{baseUrl}}/home">Home</a>
 * {{/if}}
 * {{#if (eq currentPath '/dashboard')}}Active{{/if}}
 * ```
 * @example
 * ```js
 * // Base URL rewriting in config/config.js
 * export default {
 *   /**
 *    * Custom base URL rewriting hook, defaults to undefined.
 *    * The hook receives undefined if URL construction fails.
 *    * @type {((baseUrl: string|undefined) => string)|undefined}
 *    *\/
 *   rewrite_base_url: baseUrl => {
 *     if (!baseUrl) return 'http://localhost:3000'; // Fallback
 *     return `${baseUrl}/admin`;
 *   }
 * };
 * ```
 */
export default function localVars(app: express.Express): Promise<void>;
