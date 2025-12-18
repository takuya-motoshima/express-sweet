import fs from 'node:fs';
import express from 'express';
import LoggingConfig from '~/interfaces/LoggingConfig';

/**
 * Load logging configuration from config/logging.js file.
 * Returns default logging configuration if config file doesn't exist.
 * @returns {Promise<LoggingConfig>} The loaded logging configuration with defaults
 * @example
 * ```js
 * import loadLoggingConfig from '~/utils/loadLoggingConfig';
 * 
 * const config = await loadLoggingConfig();
 * console.log(config.format);  // 'combined' (default)
 * console.log(config.skip);    // undefined (default)
 * ```
 */
export default async (): Promise<LoggingConfig> => {
  // Default logging configuration (Morgan 'combined' format)
  const defaultOptions: LoggingConfig = {
    format: 'combined',
    skip: undefined,
  };

  // Return default options if config file doesn't exist
  const filePath = `${process.cwd()}/config/logging`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }

  // Load and merge user configuration with defaults
  const {default: options} = await import(`${filePath}.js`);
  return Object.assign(defaultOptions, options);
}