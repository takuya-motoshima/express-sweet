import fs from 'node:fs';
import sequelize from 'sequelize';
import DatabaseConfig from '~/interfaces/DatabaseConfig';

/**
 * Load database configuration from config/database.js file.
 * Returns environment-specific configuration based on NODE_ENV.
 * @returns {Promise<sequelize.Options>} The loaded database configuration for current environment
 * @example
 * ```js
 * import loadDatabaseConfig from '~/utils/loadDatabaseConfig';
 * 
 * const config = await loadDatabaseConfig();
 * console.log(config.database);    // Database name for current environment
 * console.log(config.host);        // Database host
 * console.log(config.dialect);     // Database dialect (mariadb, mysql, etc.)
 * ```
 * 
 * @example
 * ```js
 * // config/database.js structure
 * export default {
 *   development: {
 *     username: 'root',
 *     password: 'password',
 *     database: 'myapp_dev',
 *     host: 'localhost',
 *     dialect: 'mariadb'
 *   },
 *   production: {
 *     username: 'root',
 *     password: 'password',
 *     database: 'myapp_prod',
 *     host: 'localhost',
 *     dialect: 'mariadb'
 *   }
 * }
 * ```
 */
export default async (): Promise<sequelize.Options> => {
  // Default options when config file doesn't exist
  const defaultOptions: sequelize.Options = {
    database: 'unknown',
    username: 'unknown',
    password: undefined,
    host: 'localhost',
    dialect: 'mariadb'
  };

  // Return default options if config file doesn't exist
  const filePath = `${process.cwd()}/config/database`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }

  // Warn if NODE_ENV is not set, default to 'development'
  if (!process.env.NODE_ENV) {
    console.warn('[Sweet] NODE_ENV not set, defaulting to "development" environment');
  }

  // Load and merge environment-specific configuration
  let {default: options}: {default: DatabaseConfig} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options[process.env.NODE_ENV||'development']) as DatabaseConfig;

  // Log database connection info in debug mode
  if (process.env.SWEET_DEBUG) {
    console.log(`[Sweet] Loading database config: ${options.database}@${options.host}`);
  }

  return options;
}