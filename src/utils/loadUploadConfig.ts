import fs from 'node:fs';
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
export default async (): Promise<UploadConfig> => {
  // Default configuration: upload disabled
  const defaultConfig: UploadConfig = {
    enabled: false,
    resolve_middleware: () => null,
  };

  // If the config file doesn't exist, return default config
  const filePath = `${process.cwd()}/config/upload`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultConfig;
  }

  // If config file exists, load and merge with defaults
  const {default: userConfig} = await import(`${filePath}.js`);
  return Object.assign(defaultConfig, userConfig);
}
