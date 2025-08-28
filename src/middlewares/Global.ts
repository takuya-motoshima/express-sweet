/**
 * Set global variables accessible throughout the application.
 * Variables can be accessed like "global.xxx" in all router and model classes.
 *
 * Global variables set:
 * - APP_DIR: The directory where app.js is located (process.cwd())
 * 
 * @example
 * ```js
 * // Access in any router or model
 * console.log(global.APP_DIR); // "/path/to/your/app"
 * ```
 */
export default class Global {
  /**
   * Mount global variables on application.
   * Sets up global.APP_DIR for access throughout the application.
   * @example
   * ```js
   * // This method is called automatically by express-sweet.mount()
   * import Global from './middlewares/Global';
   * 
   * Global.mount();
   * ```
   */
  static mount() {
    // Application root directory.
    global.APP_DIR = process.cwd();
    if (process.env.EXPRESS_DEBUG) {
      console.log('Set global variable APP_DIR');
    }
  }
}