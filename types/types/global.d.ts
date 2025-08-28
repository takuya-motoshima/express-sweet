/**
 * Global type declarations for Express Sweet.
 *
 * Extends the global namespace with Express Sweet specific variables
 * that are accessible throughout the application runtime.
 *
 * @module global
 * @example
 * // Accessing global variables anywhere in the application
 * console.log(global.APP_DIR);     // "/path/to/your/app"
 * console.log(global.loadedEnv);   // true or false
 */
declare global {
    /**
     * Application root directory path.
     * Set by the Global middleware during application initialization.
     * Contains the absolute path to the directory where the main application file is located.
     * @type {string}
     * @example
     * // Access in routes or models
     * const configPath = `${global.APP_DIR}/config/custom.json`;
     * const publicPath = `${global.APP_DIR}/public/uploads`;
     */
    var APP_DIR: string;
    /**
     * Environment variables loading flag.
     * Set by the Environment middleware to prevent multiple loading of .env files.
     * True if environment variables have already been loaded from .env file.
     * @type {boolean}
     * @example
     * // Check if environment variables are loaded
     * if (global.loadedEnv) {
     *   console.log('Environment variables already loaded');
     * }
     */
    var loadedEnv: boolean;
}
export {};
