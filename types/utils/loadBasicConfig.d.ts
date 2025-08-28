import BasicConfig from '~/interfaces/BasicConfig';
/**
 * Load basic application configuration from config/config.js file.
 * Returns default configuration if config file doesn't exist.
 * @returns {Promise<BasicConfig>} The loaded basic configuration with defaults
 * @example
 * ```js
 * import loadBasicConfig from '~/utils/loadBasicConfig';
 *
 * const config = await loadBasicConfig();
 * console.log(config.cors_enabled);    // false (default)
 * console.log(config.max_body_size);   // '100kb' (default)
 * console.log(config.router_dir);      // '/path/to/app/routes' (default)
 * ```
 */
declare const _default: () => Promise<BasicConfig>;
export default _default;
