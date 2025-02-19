import path from 'path';

/**
 * EXPRESS SWEET basic configuration interface.
 */
export default {
  /**
   * Environment variable file (.env) path, defaults to none (undefined).
   * @type {string}
   */
  env_path: '.env',

  /**
   * CORS permission, defaults to invalid (false).
   * @type {{enabled: boolean}}
   */
  cors_enabled: true,

  /**
   * Maximum body size you can request, defaults to `100kb`.
   * @type {string|number}
   */
  max_body_size: '100kb',

  /**
   * Absolute path to the router directory, defaults to `<application root directory>/routes`.
   * @type {string}
   */
  router_dir: path.join(process.cwd(), 'routes'),

  /**
   * The endpoint to run when the root URL is requested, defaults to none (undefined).
   * @type {string}
   */
  default_router: '/home',

  /**
   * This is a hook that rewrites the base URL.
   * If you want to rewrite the app.locals.baseUrl property and the view's baseUrl variable, use this hook to return a new base URL.
   * The default value is the referrer's origin (eg https://example.com).
   * @type {(baseUrl: string): string}
   * @example
   * rewrite_base_url: baseUrl => {
   *   return `${baseUrl}/admin`;
   * }
   */
  rewrite_base_url: baseUrl => {
    return baseUrl;
  },

  /**
   * This is a hook for error handling.
   * For example, you can use it when you want to send an external notification of the error received by this hook.
   * @type {(error: any): void|Promise<void>}
   * @example
   * error_handler: async error => {
   *   // Notify system administrator of error.
   *   return new Promise((resolve, reject) => {
   *     const sendmail = require('sendmail')();
   *     sendmail({
   *       from: 'no-reply@example.com',
   *       to: 'administrator@example.com',
   *       subject: 'Error occurred',
   *       text: error.message
   *     }, error => {
   *       error ? reject(error) : resolve();
   *     });
   *   });
   * }
   */
  error_handler: error => {
    console.error(`An error has occurred. Error message: ${error.message}`);
  }
}