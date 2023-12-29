import sequelize from 'sequelize';
import Environment from '~/middlewares/Environment';
import * as utils from '~/utils';

/**
 * Connect to DB.
 */
export default new class Database extends sequelize.Sequelize {
  /**
   * Create a sequelize instance.
   */
  constructor() {
    // Set environment variables.
    Environment.mount();

    // Load configuration.
    const databaseConfig = utils.loadDatabaseConfig();

    // Instantiate sequelize with name of database, username and password.
    super(
      databaseConfig.database!,
      databaseConfig.username!,
      databaseConfig.password||undefined,
      databaseConfig
    );
  }

  /**
   * Returns true if the DB can be connected.
   * @example
   * const database = require('express-sweet').database.Database;
   * 
   * // Check database connection.
   * const isConnected = await database.isConnect();
   * @return {Promise<boolean>} Returns true if it can connect to the database, false if it cannot.
   */
  async isConnect(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }
}