import express from 'express';
/**
 * Incorporate user authentication into your application using Passport.js middleware.
 * Provides username/password authentication with session management and route protection.
 * If an unauthenticated user makes a request to a URL that allows access only if authenticated,
 * the user will be redirected to the page specified by "failure_redirect".
 * If that access is asynchronous, a 401 error is returned.
 *
 * @see {@link https://www.passportjs.org/ | Passport.js}
 * @example
 * ```js
 * // Authentication configuration in config/authentication.js
 * export default {
 *   enabled: true,
 *   username: 'email',
 *   password: 'password',
 *   success_redirect: '/',
 *   failure_redirect: '/login',
 *   authenticate_user: async (username, password, req) => {
 *     const UserModel = require('../models/UserModel');
 *     return UserModel.findOne({
 *       where: { email: username, password },
 *       raw: true
 *     });
 *   },
 *   subscribe_user: async (id) => {
 *     const UserModel = require('../models/UserModel');
 *     return UserModel.findOne({
 *       where: { id },
 *       raw: true
 *     });
 *   }
 * }
 * ```
 */
export default class Authentication {
    #private;
    /**
     * Mount authentication middleware on Express application.
     * Sets up Passport.js with local strategy, session management, and route protection.
     * @param {express.Express} app Express application instance
     * @returns {Promise<void>}
     * @example
     * ```js
     * // This method is called automatically by express-sweet.mount()
     * import Authentication from './middlewares/Authentication';
     *
     * await Authentication.mount(app);
     * ```
     */
    static mount(app: express.Express): Promise<void>;
}
