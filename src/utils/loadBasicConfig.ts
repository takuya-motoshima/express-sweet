import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import BasicConfig from '~/interfaces/BasicConfig';

/**
 * Load basic application configuration from config/config.js file.
 * Returns default configuration if config file doesn't exist.
 * @returns {Promise<BasicConfig>} The loaded basic configuration with defaults
 * @example
 * ```js
 * import loadBasicConfig from '~/utils/loadBasicConfig';
 * 
 * const config = await loadBasicConfig();
 * console.log(config.cors_enabled);    // false (default)
 * console.log(config.max_body_size);   // '100kb' (default)
 * console.log(config.router_dir);      // '/path/to/app/routes' (default)
 * ```
 */
export default async (): Promise<BasicConfig> => {
  // Options with default values set.
  const defaultOptions: BasicConfig = {
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

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/config`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }

  // If an options file is found, it returns options that override the default options.
  const {default: options} = await import(`${filePath}.js`);
  return Object.assign(defaultOptions, options);
}