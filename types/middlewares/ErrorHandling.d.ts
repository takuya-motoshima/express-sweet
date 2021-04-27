import express from 'express';
import Hooks from '~/interfaces/Hooks';
/**
 * Error handling.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express, hooks: Hooks): void;
}
