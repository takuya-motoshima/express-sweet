/**
 * Extend a Global object.
 */
declare global {
    /**
      * Application root directory.
      * @type {string}
      */
    var APP_DIR: string;
    /**
      * Flag to prevent multiple loading of env.
      * True if env has already been loaded.
      * @type {boolean}
      */
    var loadedEnv: boolean;
}
export {};
