import AuthenticationConfig from '~/interfaces/AuthenticationConfig';
/**
 * Load authentication configuration from config/authentication.js file.
 * Returns default authentication configuration if config file doesn't exist.
 * @returns {Promise<AuthenticationConfig>} The loaded authentication configuration with defaults
 * @example
 * ```js
 * import loadAuthenticationConfig from '~/utils/loadAuthenticationConfig';
 *
 * const config = await loadAuthenticationConfig();
 * console.log(config.enabled);           // false (default)
 * console.log(config.username);          // 'username' (default)
 * console.log(config.success_redirect);  // '/' (default)
 * ```
 */
declare const _default: () => Promise<AuthenticationConfig>;
export default _default;
