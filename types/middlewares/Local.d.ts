import express from 'express';
/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
export default class {
    /**
     * Mount on application.
     * @param {express.Express} app Express application instance.
     * @return {Promise<void>}
     */
    static mount(app: express.Express): Promise<void>;
}
