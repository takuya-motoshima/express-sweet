import express from 'express';
/**
 * Mount authentication middleware on Express application.
 * Sets up Passport.js with local strategy, session management, and route protection.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import passportAuth from './middlewares/passportAuth';
 *
 * await passportAuth(app);
 * ```
 */
export default function passportAuth(app: express.Express): Promise<void>;
