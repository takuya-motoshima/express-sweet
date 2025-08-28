import sequelize from 'sequelize';
import loadDatabaseConfig from '~/utils/loadDatabaseConfig';

/**
 * Database manager class for handling Sequelize database connections.
 * Implements singleton pattern to ensure single database connection across the application.
 * @example
 * ```js
 * // Get database instance
 * const db = await DatabaseManager.getInstance();
 * 
 * // Check connection
 * const isConnected = await DatabaseManager.isConnected();
 * 
 * // Get configuration
 * const config = await DatabaseManager.getConfig();
 * ```
 */
export default class DatabaseManager {
  /**
   * Singleton Sequelize instance
   */
  private static instance: sequelize.Sequelize | null = null;

  /**
   * Cached database configuration
   */
  private static config: any = null;

  /**
   * Gets the singleton Sequelize database instance.
   * Creates a new instance on first call, returns cached instance on subsequent calls.
   * @returns {Promise<sequelize.Sequelize>} The Sequelize database instance
   * @throws {Error} When database configuration loading fails
   * @example
   * ```js
   * const sequelize = await DatabaseManager.getInstance();
   * const users = await sequelize.models.User.findAll();
   * ```
   */
  static async getInstance(): Promise<sequelize.Sequelize> {
    if (!this.instance) {
      this.config = await loadDatabaseConfig();
      if (process.env.EXPRESS_DEBUG) {
        console.log(`Connecting to database: ${this.config.database} (${this.config.dialect})`);
      }
      this.instance = new sequelize.Sequelize(
        this.config.database!, 
        this.config.username!, 
        this.config.password || undefined, 
        this.config
      );
    }
    return this.instance;
  }

  /**
   * Tests the database connection.
   * @returns {Promise<boolean>} Returns true if connection is successful, false otherwise
   * @example
   * ```js
   * const canConnect = await DatabaseManager.isConnected();
   * if (canConnect) {
   *   console.log('Database is accessible');
   * } else {
   *   console.error('Cannot connect to database');
   * }
   * ```
   */
  static async isConnected(): Promise<boolean> {
    const sequelize = await this.getInstance();
    try {
      await sequelize.authenticate();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gets the original database configuration loaded from config files.
   * This returns the raw configuration before Sequelize processing.
   * @returns {Promise<object>} Database configuration object containing all loaded options
   * @throws {Error} When configuration loading fails
   * @see {@link https://sequelize.org/docs/v6/other-topics/dialect-specific-things/ | Sequelize Dialect Options}
   * @example
   * ```js
   * const config = await DatabaseManager.getConfig();
   * console.log('Database name:', config.database);
   * console.log('Host:', config.host);
   * console.log('Port:', config.port);
   * ```
   */
  static async getConfig(): Promise<object> {
    if (!this.config) {
      this.config = await loadDatabaseConfig();
    }
    return this.config;
  }

  /**
   * Gets the runtime Sequelize options after initialization.
   * This returns the actual options used by the Sequelize instance,
   * which may include defaults and processed values.
   * @returns {Promise<object>} Sequelize runtime options object
   * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-options | Sequelize Constructor Options}
   * @example
   * ```js
   * const options = await DatabaseManager.getSequelizeOptions();
   * console.log('Connection pool settings:', options.pool);
   * console.log('Dialect:', options.dialect);
   * ```
   */
  static async getSequelizeOptions(): Promise<object> {
    const sequelize = await this.getInstance();
    return (sequelize as any).options;
  }

  /**
   * Closes the database connection and resets the singleton instance.
   * Useful for testing or graceful application shutdown.
   * @returns {Promise<void>}
   * @example
   * ```js
   * // Graceful shutdown
   * process.on('SIGTERM', async () => {
   *   await DatabaseManager.close();
   *   process.exit(0);
   * });
   * ```
   */
  static async close(): Promise<void> {
    if (this.instance) {
      await this.instance.close();
      this.instance = null;
      this.config = null;
    }
  }
}