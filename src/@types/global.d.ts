/**
 * Extend a Global object.
 */
declare module NodeJS  {
  interface Global {
    /**
     * Application root directory.
     * @type {string}
     */
    APP_DIR: string;

    /**
     * Flag to prevent multiple loading of env.
     * True if env has already been loaded.
     * @type {boolean}
     */
    loadedEnv: boolean;
  }
}