import sequelize from 'sequelize';
import Database from '~/interfaces/Database';
import fs from 'fs';

/**
 * Connect to DB.
 */
export default new class extends sequelize.Sequelize {
  /**
   * Create a sequelize instance.
   */
  constructor() {
    // Get the execution environment.
    const env = process.env.NODE_ENV||'development';

    // Database connection config path.
    const path = `${process.cwd()}/config/database`;
    if (fs.existsSync(`${path}.js`)) {
      // Instantiate sequelize with name of database, username and password.
      const options = (require(path) as Database)[env] as sequelize.Options;
      super(options.database!, options.username!, options.password||undefined, options);
    } else {
      console.error(`${path} not found`);
      // throw new Error(`${path} not found`);
      super('unkown', 'unkown', undefined, {host: 'localhost', dialect: 'mariadb'});
    }
  }

  /**
   * Returns true if the DB can be connected.
   *
   * @example
   * const database = require('express-sweet').database.Database;
   * 
   * // Check database connection.
   * const isConnected = await database.isConnect();
   *
   * @return {Promise<boolean>} Returns true if it can connect to the database, false if it cannot.
   */
  public async isConnect(): Promise<boolean> {
    try {
      await this.authenticate();
      return true;
    } catch {
      return false;
    }
  }
}
