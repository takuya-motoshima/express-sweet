import sequelize from 'sequelize';
import DatabaseOptions from '~/interfaces/DatabaseOptions';
import fs from 'fs';
import Environment from '~/middlewares/Environment';

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

    // Load options.
    const options = Database.loadOptions();

    // Instantiate sequelize with name of database, username and password.
    super(options.database!, options.username!, options.password||undefined, options);
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

  /**
   * Returns the option.
   * 
   * @return {sequelize.Options} option.
   */
  public static loadOptions(): sequelize.Options {
    // Options with default values set.
    const defOpts: sequelize.Options = {
      database: 'unkown',
      username: 'unkown',
      password: undefined,
      host: 'localhost',
      dialect: 'mariadb'
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/database`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // Get the execution environment.
    const env = process.env.NODE_ENV||'development';

    // If an options file is found, it returns options that override the default options.
    const options = <DatabaseOptions>require(filePath).default||require(filePath);
    const mergeOptions = Object.assign(defOpts, options[env]);
    console.log(`Connection DB host: ${mergeOptions.host}`);
    console.log(`Connection DB: ${mergeOptions.database}`);
    return mergeOptions;
  }
}