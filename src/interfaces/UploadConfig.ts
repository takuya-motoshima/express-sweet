import type express from 'express';

/**
 * File upload configuration interface using Multer.
 * Defines dynamic upload middleware resolution per request based on path and method.
 * @see {@link https://github.com/expressjs/multer | Multer Documentation}
 * @example
 * ```js
 * // config/upload.js
 * export default {
 *   enabled: true,
 *   resolve_middleware: (req, multer) => {
 *     if (req.path === '/api/admin/firms' && req.method === 'POST') {
 *       const upload = multer({ storage: multer.memoryStorage() });
 *       return upload.fields([
 *         { name: 'logo', maxCount: 1 },
 *         { name: 'eyecatch', maxCount: 1 }
 *       ]);
 *     }
 *     return null;
 *   }
 * };
 * ```
 */
export default interface UploadConfig {
  /**
   * Enable file upload middleware, defaults to disabled (false).
   * If config/upload.js doesn't exist, upload middleware won't be applied.
   * @type {boolean}
   */
  enabled: boolean,

  /**
   * Hook function to dynamically resolve multer middleware based on request.
   * Return a multer middleware instance or null to skip upload handling for the request.
   * @type {(req: express.Request, multer: typeof import('multer')) => Function|null}
   * @example
   * ```js
   * // Single file upload
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/user/avatar' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.single('avatar');
   *   }
   *   return null;
   * }
   * ```
   * @example
   * ```js
   * // Multiple files with same field name
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/gallery' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.array('photos', 10);
   *   }
   *   return null;
   * }
   * ```
   * @example
   * ```js
   * // Multiple file fields
   * resolve_middleware: (req, multer) => {
   *   if (req.path === '/api/admin/firms' && req.method === 'POST') {
   *     const upload = multer({ storage: multer.memoryStorage() });
   *     return upload.fields([
   *       { name: 'logo', maxCount: 1 },
   *       { name: 'eyecatch', maxCount: 1 }
   *     ]);
   *   }
   *   return null;
   * }
   * ```
   */
  resolve_middleware: (req: express.Request, multer: typeof import('multer')) => Function|null,
}
