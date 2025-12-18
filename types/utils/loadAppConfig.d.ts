import AppConfig from '~/interfaces/AppConfig';
/**
 * Load application configuration from config/config.js file.
 * Returns default configuration if config file doesn't exist.
 * @returns {Promise<AppConfig>} The loaded application configuration with defaults
 * @example
 * ```js
 * import loadAppConfig from '~/utils/loadAppConfig';
 *
 * const config = await loadAppConfig();
 * console.log(config.cors_enabled);    // false (default)
 * console.log(config.max_body_size);   // '100kb' (default)
 * console.log(config.router_dir);      // '/path/to/app/routes' (default)
 * ```
 */
declare const _default: () => Promise<AppConfig>;
export default _default;
