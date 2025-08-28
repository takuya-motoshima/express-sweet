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
  // Options with default values set.
  const defaultOptions: LoggingConfig = {
    format: 'combined',
    skip: undefined,
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/logging`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }

  // If an options file is found, it is merged with the default options.
  let {default: options} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options);

  // If an options file is found, it returns options that override the default options.
  return options;
}