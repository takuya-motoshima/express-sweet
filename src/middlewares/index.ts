/**
 * Express middleware components for Express Sweet.
 *
 * Provides a collection of middleware functions that handle various aspects of Express applications
 * including CORS, authentication, view templating, error handling, and environment setup.
 * These middleware are automatically mounted by the main mount function.
 *
 * @module middlewares
 * @example
 * ```js
 * // Manual middleware mounting (usually not needed)
 * import * as expx from 'express-sweet';
 *
 * const app = express();
 * expx.middlewares.globalVars();
 * await expx.middlewares.envLoader();
 * await expx.middlewares.requestParser(app);
 * ```
 */

/**
 * Cross-Origin Resource Sharing (CORS) middleware
 */
export {default as corsPolicy} from './corsPolicy';

/**
 * Environment variables loading middleware
 */
export {default as envLoader} from './envLoader';

/**
 * Global variables setup middleware
 */
export {default as globalVars} from './globalVars';

/**
 * HTTP parsing and static file serving middleware
 */
export {default as requestParser} from './requestParser';

/**
 * Local template variables middleware
 */
export {default as localVars} from './localVars';

/**
 * Handlebars view engine middleware
 */
export {default as viewEngine, mountBeforeRender} from './viewEngine';

/**
 * Error handling middleware
 */
export {default as errorHandler} from './errorHandler';

/**
 * Passport.js authentication middleware
 */
export {default as passportAuth} from './passportAuth';

/**
 * File-based routing middleware
 */
export {default as routeMapper} from './routeMapper';
