import fs from 'fs';
import express from 'express';
import AuthenticationConfig from '~/interfaces/AuthenticationConfig';

/**
  * Get Authentication configuration (config/authentication).
  * @return {AuthenticationConfig} Loaded configuration.
  */
export default (): AuthenticationConfig => {
  // Options with default values set.
  const defaultOptions: AuthenticationConfig = {
    enabled: false,
    session_store: 'memory',
    cookie_name: 'connect.sid',
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
  const mergeOptions = Object.assign(defaultOptions, require(filePath).default || require(filePath));

  // Check required options.
  if (mergeOptions.session_store === 'redis' && !mergeOptions.redis_host)
    throw new TypeError('If the session store is redis, redis_host in the authentication configuration is required');

  // If the session cookie name is overwritten with an empty value, replace it with the default value.
  if (!mergeOptions.cookie_name)
    mergeOptions.cookie_name = 'connect.sid';

  // If an options file is found, it returns options that override the default options.
  return mergeOptions;
}