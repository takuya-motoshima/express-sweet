import express from 'express';
import * as utils from '~/utils';

/**
 * Enables Cross-Origin Resource Sharing (CORS) middleware.
 * Allows requests from another domain to the application by setting appropriate headers.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS | MDN CORS}
 * @example
 * ```js
 * // Enable CORS in config/config.js
 * export default {
 *   cors_enabled: true
 * };
 * ```
 */

/**
 * Mount CORS middleware on Express application.
 * Sets appropriate CORS headers to allow cross-origin requests.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import corsPolicy from './middlewares/corsPolicy';
 *
 * await corsPolicy(app);
 * ```
 */
export default async function corsPolicy(app: express.Express): Promise<void> {
  // Load basic configuration
  const appConfig = await utils.loadAppConfig();

  // Skip CORS setup if disabled
  if (!appConfig.cors_enabled) {
    return;
  }

  // Apply CORS headers to all responses
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Allow requests from the origin that made the request
    res.header('Access-Control-Allow-Origin', req.headers.origin);

    // Specify allowed request headers
    res.header('Access-Control-Allow-Headers', [
      'X-Requested-With',        // XMLHttpRequest identification
      'X-HTTP-Method-Override',  // HTTP method override for legacy clients
      'Content-Type',            // Request body content type
      'Accept',                  // Acceptable response content types
      'Authorization',           // Bearer tokens, API keys, and other auth credentials
      'Cache-Control',           // Cache directives
      'If-None-Match',           // ETag validation for conditional requests
      'If-Modified-Since',       // Last-Modified validation for conditional requests
      'Range',                   // Partial content requests for resumable downloads
      'X-CSRF-Token',            // CSRF protection token
    ].join(', '));

    // Specify allowed HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Allow credentials (cookies, authorization headers) in cross-origin requests
    res.header('Access-Control-Allow-Credentials', 'true');

    // Handle preflight OPTIONS requests immediately
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });
}
