import express from 'express'
import globalVars from '~/middlewares/globalVars';
import envLoader from '~/middlewares/envLoader';
import viewEngine from '~/middlewares/viewEngine';
import requestParser from '~/middlewares/requestParser';
import corsPolicy from '~/middlewares/corsPolicy';
import localVars from '~/middlewares/localVars';
import passportAuth from '~/middlewares/passportAuth';
import routeMapper from '~/middlewares/routeMapper';
import loadModels from '~/database/loadModels';
import errorHandler from '~/middlewares/errorHandler';

/**
 * Mount Express Sweet extensions on your Express application.
 * Initializes all middleware components in a specific order to ensure proper functionality.
 *
 * **Initialization Order:**
 * 1. Global variables
 * 2. Environment variables (.env)
 * 3. Database models
 * 4. HTTP middleware (body parsing, cookies, static files)
 * 5. View engine (Handlebars)
 * 6. CORS configuration
 * 7. Local variables
 * 8. Authentication (Passport.js)
 * 9. URL routing
 * 10. Error handler
 *
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
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
 * @example
 * ```js
 * // With custom middleware
 * import express from 'express';
 * import * as expx from 'express-sweet';
 *
 * const app = express();
 *
 * // Mount Express Sweet
 * await expx.mount(app);
 *
 * // Add custom routes after mounting
 * app.get('/custom', (req, res) => {
 *   res.send('Custom route');
 * });
 *
 * app.listen(3000);
 * ```
 */
export default async (app: express.Express): Promise<void> => {
  // Set global variables
  globalVars();

  // Load environment variables from .env file
  await envLoader();

  // Initialize database models and associations
  await loadModels();

  // Set up HTTP middleware (body parsing, cookies, static files, logging)
  await requestParser(app);

  // Configure Handlebars template engine
  await viewEngine(app);

  // Enable CORS if configured
  await corsPolicy(app);

  // Set local variables available in views
  await localVars(app);

  // Set up user authentication with Passport.js
  await passportAuth(app);

  // Configure file-based routing
  await routeMapper(app);

  // Set up error handling middleware (must be last)
  await errorHandler(app);
}