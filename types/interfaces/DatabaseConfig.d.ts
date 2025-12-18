import sequelize from 'sequelize';
/**
 * Database configuration interface for Sequelize connections.
 * Defines environment-specific database configurations (development, test, production).
 * Each environment contains Sequelize connection options.
 * @see {@link https://sequelize.org/docs/v6/other-topics/migrations/#configuration | Sequelize Configuration}
 * @example
 * ```js
 * // config/database.js
 * export default {
 *   development: {
 *     username: 'root',
 *     password: 'password',
 *     database: 'myapp_dev',
 *     host: 'localhost',
 *     dialect: 'mariadb',
 *     logging: console.log
 *   },
 *   test: {
 *     username: 'root',
 *     password: 'password',
 *     database: 'myapp_test',
 *     host: 'localhost',
 *     dialect: 'mariadb',
 *     logging: false
 *   },
 *   production: {
 *     username: 'root',
 *     password: 'password',
 *     database: 'myapp_prod',
 *     host: 'localhost',
 *     dialect: 'mariadb',
 *     logging: false,
 *     pool: {
 *       max: 5,
 *       min: 0,
 *       acquire: 30000,
 *       idle: 10000
 *     }
 *   }
 * };
 * ```
 */
export default interface DatabaseConfig {
    /**
     * Environment-specific database configuration.
     * Key represents environment name (development, test, production, etc.)
     * Value contains Sequelize connection options for that environment.
     * @type {sequelize.Options}
     */
    [key: string]: sequelize.Options;
}
