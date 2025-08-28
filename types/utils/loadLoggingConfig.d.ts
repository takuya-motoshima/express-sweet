import LoggingConfig from '~/interfaces/LoggingConfig';
/**
 * Load logging configuration from config/logging.js file.
 * Returns default logging configuration if config file doesn't exist.
 * @returns {Promise<LoggingConfig>} The loaded logging configuration with defaults
 * @example
 * ```js
 * import loadLoggingConfig from '~/utils/loadLoggingConfig';
 *
 * const config = await loadLoggingConfig();
 * console.log(config.format);  // 'combined' (default)
 * console.log(config.skip);    // undefined (default)
 * ```
 */
declare const _default: () => Promise<LoggingConfig>;
export default _default;
