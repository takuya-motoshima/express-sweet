import express from 'express';
/**
 * Error handling.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express): void;
    /**
     * Returns the option.
     *
     * @return {Config} option.
     */
    private static loadOptions;
}
