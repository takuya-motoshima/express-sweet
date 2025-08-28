/**
 * Express Sweet - A powerful Express.js extension library
 *
 * Express Sweet streamlines web development with utilities and enhancements for Express.js applications.
 * It provides database abstraction, authentication, view templating, routing, and various middleware components.
 *
 * @module express-sweet
 * @author Takuya Motoshima
 * @see {@link https://github.com/takuya-motoshima/express-sweet | Express Sweet Repository}
 * @example
 * ```js
 * // Basic usage
 * import express from 'express';
 * import * as expx from 'express-sweet';
 *
 * const app = express();
 * await expx.mount(app);
 *
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 * ```
 *
 * @example
 * ```js
 * // Using database models
 * import * as expx from 'express-sweet';
 *
 * export default class extends expx.database.Model {
 *   static get table() {
 *     return 'users';
 *   }
 *   static get attributes() {
 *     return {
 *       id: { type: this.DataTypes.INTEGER, primaryKey: true },
 *       name: this.DataTypes.STRING,
 *       email: this.DataTypes.STRING
 *     };
 *   }
 * }
 * ```
 *
 * @example
 * ```js
 * // Using authentication service
 * import * as expx from 'express-sweet';
 *
 * router.post('/login', async (req, res, next) => {
 *   const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
 *   res.json(isAuthenticated);
 * });
 * ```
 */
/**
 * Main application mount function
 * @function mount
 */
export { default as mount } from '~/mount';
/**
 * Database utilities and ORM functionality
 * @namespace database
 */
export * as database from './database';
/**
 * Authentication and other services
 * @namespace services
 */
export * as services from './services';
/**
 * Utility functions for type checking and configuration loading
 * @namespace utils
 */
export * as utils from './utils';
/**
 * Express middleware components
 * @namespace middlewares
 */
export * as middlewares from './middlewares';
/**
 * TypeScript interfaces for configuration
 * @namespace interfaces
 */
export * as interfaces from './interfaces';
/**
 * Custom Handlebars template helpers
 * @namespace handlebars_helpers
 */
export * as handlebars_helpers from './handlebars_helpers';
/**
 * Express routing utilities
 * @namespace routing
 */
export * as routing from './routing';
