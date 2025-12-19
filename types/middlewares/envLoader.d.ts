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
export default function envLoader(): Promise<void>;
