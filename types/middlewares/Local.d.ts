import express from 'express';
import Hooks from '~/interfaces/Hooks';
/**
 * Set local variables.
 * It can be accessed in all views as {{var}} or {{{var}}}.
 *
 * Below is a description of the variables.
 * baseUrl: The base URL for this application.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express, hooks: Hooks): void;
}
