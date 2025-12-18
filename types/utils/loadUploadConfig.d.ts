import type UploadConfig from '~/interfaces/UploadConfig';
/**
 * Load upload configuration from config/upload.js file.
 * Returns default configuration if config file doesn't exist.
 *
 * @returns {Promise<UploadConfig>} The loaded upload configuration with defaults
 *
 * @example
 * ```typescript
 * import loadUploadConfig from '~/utils/loadUploadConfig';
 *
 * const config = await loadUploadConfig();
 * if (config.enabled) {
 *   const middleware = config.resolve_middleware(req, multer);
 *   // Apply middleware...
 * }
 * ```
 */
declare const _default: () => Promise<UploadConfig>;
export default _default;
