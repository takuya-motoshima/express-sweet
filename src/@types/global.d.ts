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
  }
}