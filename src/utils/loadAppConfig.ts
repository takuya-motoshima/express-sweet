import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import AppConfig from '~/interfaces/AppConfig';

/**
 * Load application configuration from config/config.js file.
 * Returns default configuration if config file doesn't exist.
 * @returns {Promise<AppConfig>} The loaded application configuration with defaults
 * @example
 * ```js
 * import loadAppConfig from '~/utils/loadAppConfig';
 *
 * const config = await loadAppConfig();
 * console.log(config.cors_enabled);    // false (default)
 * console.log(config.max_body_size);   // '100kb' (default)
 * console.log(config.router_dir);      // '/path/to/app/routes' (default)
 * ```
 */
export default async (): Promise<AppConfig> => {
  // Define default configuration values
  const defaultOptions: AppConfig = {
    env_path: undefined,
    cors_enabled: false,
    max_body_size: '100kb',
    router_dir: path.join(process.cwd(), 'routes'),
    default_router: undefined,
    rewrite_base_url: (baseUrl: string): string => baseUrl,
    is_ajax: (req: express.Request): boolean => {
      return !!req.xhr;
    },
    hook_handle_error: undefined,
  };

  // Return defaults if config file doesn't exist
  const filePath = `${process.cwd()}/config/config`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }

  // Load and merge user configuration with defaults
  const {default: options} = await import(`${filePath}.js`);
  return Object.assign(defaultOptions, options);
}