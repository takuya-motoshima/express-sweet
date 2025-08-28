import sequelize from 'sequelize';
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
declare const _default: () => Promise<sequelize.Options>;
export default _default;
