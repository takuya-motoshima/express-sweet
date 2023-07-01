import express from 'express';
/**
 * Incorporate user authentication into your application.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated, the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 401 error is returned.
 */
export default class {
    #private;
    /**
     * Mount on application.
     */
    static mount(app: express.Express): void;
}
