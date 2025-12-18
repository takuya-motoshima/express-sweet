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
 */
/**
 * Main application mount function
 */
export { default as mount } from './mount';
/**
 * Database utilities and ORM functionality
 */
export * as database from './database';
/**
 * Authentication and other services
 */
export * as services from './services';
/**
 * Utility functions for type checking and configuration loading
 */
export * as utils from './utils';
/**
 * Express middleware components
 */
export * as middlewares from './middlewares';
/**
 * TypeScript interfaces for configuration
 */
export * as interfaces from './interfaces';
/**
 * Custom Handlebars template helpers
 */
export * as handlebars_helpers from './handlebars_helpers';
