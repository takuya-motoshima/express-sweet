import express from 'express';
import * as utils from '~/utils';

/**
 * Set local variables accessible in Handlebars views.
 * Variables can be accessed in all views as {{var}} or {{{var}}}.
 *
 * Local variables set:
 * - baseUrl: The base URL for this application (undefined if URL construction fails)
 * - currentPath: The current request path
 *
 * @example
 * ```handlebars
 * // Using in Handlebars templates
 * {{#if baseUrl}}
 *   <a href="{{baseUrl}}/home">Home</a>
 * {{/if}}
 * {{#if (eq currentPath '/dashboard')}}Active{{/if}}
 * ```
 *
 * @example
 * // Base URL rewriting in config/config.js
 * // The hook receives undefined if URL construction fails
 * ```js
 * export default {
 *   rewrite_base_url: baseUrl => {
 *     if (!baseUrl) return 'http://localhost:3000'; // Fallback
 *     return `${baseUrl}/admin`;
 *   }
 * };
 * ```
 */

/**
 * Mount local variables middleware on Express application.
 * Sets up baseUrl and currentPath variables for use in views.
 * @param {express.Express} app Express application instance
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This method is called automatically by express-sweet.mount()
 * import localVars from './middlewares/localVars';
 *
 * await localVars(app);
 * ```
 */
export default async function localVars(app: express.Express): Promise<void> {
  // Load application configuration
  const appConfig = await utils.loadAppConfig();

  // Middleware to set local variables for each request
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Debug logging for request properties when SWEET_DEBUG is enabled
    if (process.env.SWEET_DEBUG) {
      console.log('[Sweet] Request Info:', {
        protocol: req.protocol,
        'req.get(\'host\')': req.get('host'),
        'req.hostname': req.hostname,
        'req.host': req.host,
        'req.headers.host': req.headers.host,
        'req.headers[\'x-forwarded-host\']': req.headers['x-forwarded-host'] || '(none)',
        'req.headers[\'x-forwarded-proto\']': req.headers['x-forwarded-proto'] || '(none)',
        originalUrl: req.originalUrl,
        referer: req.headers.referer || '(none)'
      });
    }

    // Prioritize x-forwarded-proto over req.protocol for reverse proxy environments
    // This works regardless of 'trust proxy' setting for consistent behavior
    // Example: Client --HTTPS--> Proxy --HTTP--> Express
    //   x-forwarded-proto: 'https' (original client protocol)
    //   req.protocol: 'http' (proxy to Express protocol)
    //   We want 'https' to generate correct baseUrl
    const protocol = 'x-forwarded-proto' in req.headers
      ? req.headers['x-forwarded-proto'] as string
      : req.protocol;

    // Prioritize req.headers.host (raw header) over req.get('host') (Express helper)
    // req.headers.host is more reliable and includes proxy-rewritten values
    // Fallback to 'localhost' if both are undefined (shouldn't happen in normal cases)
    const host = req.headers.host || req.get('host') || 'localhost';

    // Construct full URL from extracted protocol and host
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    // Parse URL to extract currentPath and baseUrl
    // If URL construction fails (invalid host header), fallback to manual parsing
    try {
      const url = new URL(fullUrl);
      app.locals.currentPath = url.pathname;
      app.locals.baseUrl = url.origin;
    } catch {
      // Fallback: Extract currentPath from req.originalUrl (always safe)
      app.locals.currentPath = req.originalUrl.split('?')[0].split('#')[0];

      // Don't set baseUrl if we can't reliably construct it from headers
      // Client can handle undefined via rewrite_base_url hook or template {{#if baseUrl}} checks
      app.locals.baseUrl = undefined;
    }

    // Debug logging for final values before rewrite_base_url hook
    if (process.env.SWEET_DEBUG) {
      console.log('[Sweet] Final values:', {
        currentPath: app.locals.currentPath,
        baseUrl: app.locals.baseUrl
      });
    }

    // Apply custom base URL rewriting hook if configured
    // Hook is always called to allow client-side handling of undefined baseUrl
    if (appConfig.rewrite_base_url)
      app.locals.baseUrl = appConfig.rewrite_base_url(app.locals.baseUrl);
    next();
  });
}
