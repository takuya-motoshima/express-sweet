import express from 'express';
/**
 * Enable Handlebars template engine.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express): void;
    /**
     * Mount middleware to be executed just before drawing the view.
     */
    static mountBeforeRender(app: express.Express): void;
}
