/**
 * Mount global variables on application.
 *
 * Set global variables accessible throughout the application.
 * Variables can be accessed like "global.xxx" in all router and model classes.
 * Sets up global.APP_DIR for access throughout the application.
 *
 * Global variables set:
 * - APP_DIR: The directory where app.js is located (process.cwd())
 *
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import globalVars from './middlewares/globalVars.js';
 *
 * globalVars();
 * ```
 * @example
 * ```js
 * // Access in any router or model
 * console.log(global.APP_DIR); // "/path/to/your/app"
 * ```
 */
export default function globalVars(): void;
