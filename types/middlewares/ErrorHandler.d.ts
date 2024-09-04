import express from 'express';
/**
 * Error handling.
 */
export default class {
    /**
     * Mount on application.
     * @param {express.Express} app Express application instance.
     * @return {Promise<void>}
     */
    static mount(app: express.Express): Promise<void>;
}
