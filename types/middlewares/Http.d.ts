import express from 'express';
import Config from '~/interfaces/Config';
/**
 * Defines all the requisites in HTTP.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express, config: Config): void;
}
