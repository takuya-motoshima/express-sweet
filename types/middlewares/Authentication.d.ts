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
     * Sign in user.
     */
    signin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<unknown>;
    /**
     * Sign out the user.
     */
    signout(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
