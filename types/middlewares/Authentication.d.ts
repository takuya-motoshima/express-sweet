import express from 'express';
import Config from '~/interfaces/Config';
/**
 * Incorporate user authentication into your application.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express, config: Config): void;
}
