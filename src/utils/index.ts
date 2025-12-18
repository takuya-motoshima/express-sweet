/**
 * Utility functions for Express Sweet.
 * 
 * Provides type checking functions and configuration loading utilities
 * used throughout the Express Sweet framework.
 * 
 * @module utils
 * @example
 * ```js
 * // Using type checking utilities
 * import * as expx from 'express-sweet';
 * 
 * if (expx.utils.isArray(value)) {
 *   // Handle array
 * }
 * if (expx.utils.isAsyncFunction(handler)) {
 *   await handler();
 * }
 * ```
 * 
 * @example
 * ```js
 * // Using configuration loaders
 * import * as expx from 'express-sweet';
 * 
 * const appConfig = await expx.utils.loadAppConfig();
 * const dbConfig = await expx.utils.loadDatabaseConfig();
 * const authConfig = await expx.utils.loadAuthenticationConfig();
 * const loggingConfig = await expx.utils.loadLoggingConfig();
 * ```
 */

/**
 * Check if value is an array using Object.prototype.toString
 */
export {default as isArray} from './isArray';

/**
 * Check if value is specifically an async function
 */
export {default as isAsyncFunction} from './isAsyncFunction';

/**
 * Check if value is a function (including async functions)
 */
export {default as isFunction} from './isFunction';

/**
 * Check if value is a plain object (excludes arrays and null)
 */
export {default as isObject} from './isObject';

/**
 * Check if value is a non-empty string
 */
export {default as isString} from './isString';

/**
 * Load authentication configuration from config/authentication.js
 */
export {default as loadAuthenticationConfig} from './loadAuthenticationConfig';

/**
 * Load application configuration from config/config.js
 */
export {default as loadAppConfig} from './loadAppConfig';

/**
 * Load database configuration from config/database.js
 */
export {default as loadDatabaseConfig} from './loadDatabaseConfig';

/**
 * Load view configuration from config/view.js
 */
export {default as loadViewConfig} from './loadViewConfig';

/**
 * Load logging configuration from config/logging.js
 */
export {default as loadLoggingConfig} from './loadLoggingConfig';

/**
 * Load upload configuration from config/upload.js
 */
export {default as loadUploadConfig} from './loadUploadConfig';