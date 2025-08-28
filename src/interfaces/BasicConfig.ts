import express from 'express';

/**
 * Express Sweet basic application configuration interface.
 * Defines configuration options for environment, CORS, routing, error handling, and more.
 * @see {@link https://expressjs.com/ | Express.js}
 * @example
 * ```js
 * // config/config.js
 * export default {
 *   env_path: '.env',
 *   cors_enabled: true,
 *   max_body_size: '100kb',
 *   router_dir: 'routes',
 *   default_router: '/blog',
 *   rewrite_base_url: baseUrl => `${baseUrl}/admin`,
 *   is_ajax: req => /^\/api/.test(req.path),
 *   hook_handle_error: (error, req, res, next) => {
 *     if (error.status === 404) res.render('error/404');
 *     else res.render('error/500');
 *   }
 * };
 * ```
 */
export default interface BasicConfig {
  /**
   * Environment variable file (.env) path, defaults to none (undefined).
   * @type {string}
   */
  env_path?: string,

  /**
   * CORS permission, defaults to invalid (false).
   * @type {{enabled: boolean}}
   */
  cors_enabled?: boolean,

  /**
   * Maximum body size you can request, defaults to `100kb`.
   * @type {string|number}
   */
  max_body_size?: string|number,

  /**
   * Absolute path to the router directory, defaults to `<application root directory>/routes`.
   * @type {string}
   */
  router_dir?: string,

  /**
   * The endpoint to run when the root URL is requested, defaults to none (undefined).
   * @type {string}
   */
  default_router?: string,

  /**
   * This is a hook that rewrites the base URL.
   * If you want to rewrite the app.locals.baseUrl property and the view's baseUrl variable, use this hook to return a new base URL.
   * The default value is the referrer's origin (eg https://example.com).
   * @type {(baseUrl: string): string}
   * @example
   * ```js
   * rewrite_base_url: baseUrl => {
   *   return `${baseUrl}/admin`;
   * }
   * ```
   */
  rewrite_base_url?: (baseUrl: string) => string,

  /**
   * How to determine if it is an ajax request.
   * The default is that if there is an XMLHttpRequest in the request header (req.xhr) returns true.
   * For example, if there is no XMLHttpRequest in req(express.Request) and the Ajax endpoint starts with /api, a custom Ajax decision can be made like "return /^\/api\//.test(req.path)".
   * @type {(req: express.Request) => boolean}
   * @example
   * ```js
   * is_ajax: req => {
   *   // If the request URL begins with /api, it is assumed to be Ajax.
   *   return /^\/api/.test(req.path);
   *   // return !!req.xhr;
   * }
   * ```
   */
  is_ajax: (req: express.Request) => boolean,

  /**
   * Hooks the default behavior on request errors.
   * If unset, simply returns an error HTTP status. (<code>res.status(error.status||500).end();</code>)
   * @type {(error: any, req: express.Request, res: express.Response, next: express.NextFunction) => void}
   * @example
   * ```js
   * hook_handle_error: (error, req, res, next) => {
   *   if (error.status === 404)
   *     // If the URL cannot be found, a 404 error screen (views/errors/404.hbs) is displayed.
   *     res.render('errors/404');
   *   else
   *     // For other errors, unknown error screen (views/error/500.hbs) is displayed.
   *     res.render('error/500');
   * },
   * ```
   */
  hook_handle_error?: (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => void,
}