/**
 * Mount environment variables from .env file.
 * Reads the environment variable file specified in config and sets variables in process.env.
 * Prevents multiple loading with a global flag.
 *
 * @example
 * ```js
 * // Environment variables configuration in config/config.js
 * export default {
 *   env_path: '.env'  // Path to environment file
 * };
 * ```
 *
 * @example
 * ```bash
 * // .env file contents
 * NODE_ENV=development
 * DATABASE_URL=mysql://localhost/mydb
 * SECRET_KEY=mysecret
 * ```
 */
export default class Environment {
    /**
     * Mount environment variables on application.
     * Loads .env file and sets variables in process.env if not already loaded.
     * @returns {Promise<void>}
     * @example
     * ```js
     * // This method is called automatically by express-sweet.mount()
     * import Environment from './middlewares/Environment';
     *
     * await Environment.mount();
     * ```
     */
    static mount(): Promise<void>;
}
