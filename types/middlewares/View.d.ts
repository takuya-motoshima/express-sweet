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
     * Returns the option.
     *
     * @return {ViewOptions} option.
     */
    private static loadOptions;
}
