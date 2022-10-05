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
    /**
     * Check if the request URL does not require authentication.
     *
     * @param {express.Request} req The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
     * @param {(string|RegExp)[]} allowUrls A list of URLs that do not require authentication.
     * @returns {boolean} Return true if the request URL does not require authentication.
     */
    private static isNotRequireAuthentication;
}
