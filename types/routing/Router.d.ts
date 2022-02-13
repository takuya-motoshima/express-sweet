import express from 'express';
/**
 * Set up URL routing.
 *
 * Define URL routing based on the path of the file in the routes directory.
 * For example, if you have "routes/api/users.js", you can request the method in "user.js (ts)" with the base URL as "https:////api/users".
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express): void;
    /**
     * Returns the option.
     *
     * @return {Config} option.
     */
    private static loadOptions;
}
