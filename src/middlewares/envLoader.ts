import fs from 'node:fs';
import dotenv from 'dotenv';
import * as utils from '~/utils';

/**
 * Mount environment variables on application.
 *
 * Reads the environment variable file specified in config and sets variables in process.env.
 * Prevents multiple loading with a global flag.
 *
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import envLoader from './middlewares/envLoader.js';
 *
 * await envLoader();
 * ```
 * @example
 * ```js
 * // Environment variables configuration in config/config.js
 * export default {
 *   /**
 *    * Path to environment file, defaults to undefined.
 *    * @type {string|undefined}
 *    *\/
 *   env_path: '.env'
 * };
 * ```
 * @example
 * ```bash
 * // .env file contents
 * NODE_ENV=development
 * DATABASE_URL=mysql://localhost/mydb
 * SECRET_KEY=mysecret
 * ```
 */
export default async function envLoader(): Promise<void> {
  // Skip if environment variables already loaded
  if (global.loadedEnv) {
    return;
  }

  // Load basic configuration
  const appConfig = await utils.loadAppConfig();

  // Skip if no .env file path configured
  if (!appConfig.env_path)
    return;

  // Parse .env file and populate process.env with key-value pairs
  const env = dotenv.parse(fs.readFileSync(appConfig.env_path!));
  for (let key in env) {
    process.env[key] = env[key];
  }

  // Mark as loaded to prevent duplicate loading
  global.loadedEnv = true;
}
