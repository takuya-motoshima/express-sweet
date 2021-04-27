import express from 'express';
import Config from '~/interfaces/Config';
/**
 * Enable Handlebars template engine.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express, config: Config): void;
}
