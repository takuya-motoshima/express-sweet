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
  // Options with default values set.
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
    expiration: 24 * 3600000, // 24hours
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/authentication`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // If an options file is found, it is merged with the default options.
  let {default: options} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options);

  // Check required options.
  if (options.session_store === 'redis' && !options.redis_host) {
    throw new TypeError('If the session store is redis, redis_host in the authentication configuration is required');
  }

  // If the session cookie name is overwritten with an empty value, replace it with the default value.
  if (!options.cookie_name) {
    options.cookie_name = 'connect.sid';
  }

  // If an options file is found, it returns options that override the default options.
  return options;
}