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
  // Options with default values set.
  const defaultOptions: sequelize.Options = {
    database: 'unkown',
    username: 'unkown',
    password: undefined,
    host: 'localhost',
    dialect: 'mariadb'
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/database`;
  if (!fs.existsSync(`${filePath}.js`)) {
    return defaultOptions;
  }
  if (!process.env.NODE_ENV) {
    // If the NODE_ENV environment variable needed to load the DB configuration is not present, a warning is output.
    console.warn('Since there is no NODE_ENV environment variable required to load the DB configuration, \'development\' is used as the environment name.');
  }

  // If an options file is found, it returns options that override the default options.
  let {default: options}: {default: DatabaseConfig} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options[process.env.NODE_ENV||'development']) as DatabaseConfig;
  if (process.env.EXPRESS_DEBUG) {
    console.log(`Connection DB is ${options.host} ${options.database}`);
  }
  return options;
}