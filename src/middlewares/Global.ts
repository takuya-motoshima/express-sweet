import path from 'path';

/**
 * Set global variables.
 * It can be accessed like "global.xxx" in all router and model classes.
 *
 * Below is a description of the variables.
 * APP_DIR: The directory where app.js is located.
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount() {
    // Application root directory.
    global.APP_DIR = process.cwd();
    console.debug(`global.APP_DIR: ${global.APP_DIR}`);
  }
}