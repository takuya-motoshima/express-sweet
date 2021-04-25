import express from 'express';
/**
 * User authentication service.
 */
export default class {
    /**
     * Sign in user.
     */
    static signin(req: express.Request, res: express.Response, next: express.NextFunction): Promise<unknown>;
    /**
     * Sign out the user.
     */
    static signout(req: express.Request, res: express.Response, next: express.NextFunction): void;
}
