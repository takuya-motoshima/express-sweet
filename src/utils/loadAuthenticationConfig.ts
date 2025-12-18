import fs from 'node:fs';
import express from 'express';
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
export default async (): Promise<AuthenticationConfig> => {
  // Default configuration (authentication disabled)
  const defaultOptions: AuthenticationConfig = {
    enabled: false,
    session_store: 'memory',
    cookie_name: 'connect.sid',
    cookie_secure: true,
    cookie_httpOnly: true,
    redis_host: undefined,
    username: 'username',
    password: 'password',
    success_redirect: '/',
    failure_redirect: '/login',
    authenticate_user: (username: string, password: string, req: express.Request) => new Promise(resolve => resolve(null)),
    subscribe_user: (id: number|string) => new Promise(resolve => resolve({} as {[key: string]: any})),
    allow_unauthenticated: [],
    expiration: 24 * 3600000, // 24 hours
  };

  // Return default options if config file doesn't exist
  const filePath = `${process.cwd()}/config/authentication`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // Load and merge user configuration with defaults
  let {default: options} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options);

  // Validate required options
  if (options.session_store === 'redis' && !options.redis_host) {
    throw new TypeError('redis_host is required when session_store is set to \'redis\'');
  }

  // Ensure cookie_name is not empty
  if (!options.cookie_name) {
    options.cookie_name = 'connect.sid';
  }

  return options;
}