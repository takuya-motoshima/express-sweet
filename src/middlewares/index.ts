/**
 * Express middleware components for Express Sweet.
 * 
 * Provides a collection of middleware classes that handle various aspects of Express applications
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
 * await expx.middlewares.Global.mount();
 * await expx.middlewares.Environment.mount();
 * await expx.middlewares.Http.mount(app);
 * ```
 */

/**
 * Cross-Origin Resource Sharing (CORS) middleware
 */
export {default as CORS} from './CORS';

/**
 * Environment variables loading middleware
 */
export {default as Environment} from './Environment';

/**
 * Global variables setup middleware
 */
export {default as Global} from './Global';

/**
 * HTTP parsing and static file serving middleware
 */
export {default as Http} from './Http';

/**
 * Local template variables middleware
 */
export {default as Local} from './Local';

/**
 * Handlebars view engine middleware
 */
export {default as View} from './View';

/**
 * Error handling middleware
 */
export {default as ErrorHandler} from './ErrorHandler';