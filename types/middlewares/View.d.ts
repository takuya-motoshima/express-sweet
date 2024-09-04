import express from 'express';
/**
 * Enable Handlebars template engine.
 */
export default class {
    /**
     * Mount on application.
     * @param {express.Express} app Express application instance.
     * @return {Promise<void>}
     */
    static mount(app: express.Express): Promise<void>;
    /**
     * Mount middleware to be executed just before drawing the view.
     * @param {express.Express} app Express application instance.
     * @return {Promise<void>}
     */
    static mountBeforeRender(app: express.Express): Promise<void>;
}
