import express from 'express';
/**
 * Incorporate user authentication into your application.
 */
export default class {
    /**
     * Mount on application.
     */
    static mount(app: express.Express): void;
    /**
     * Returns the option.
     *
     * @return {AuthenticationOptions} option.
     */
    private static loadOptions;
}
