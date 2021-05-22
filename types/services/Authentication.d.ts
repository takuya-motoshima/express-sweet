import express from 'express';
/**
 * User authentication service.
 */
export default class {
    /**
     * Authenticate the user.
     *
     * @param  {express.Request}      req  The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
     * @param  {express.Response}     res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
     * @param  {express.NextFunction} next A function that can access the next middleware function in the application's request-response cycle.
     * @return {Promise<boolean>}     Returns true if authentication is successful, false otherwise.
     */
    static signin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean>;
    /**
     * Log out the user.
     *
     * @param {express.Request}      req  The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
     * @param {express.Response}     res  The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
     * @param {express.NextFunction} next A function that can access the next middleware function in the application's request-response cycle.
     */
    static signout(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
