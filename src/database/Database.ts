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
    const opts = Database.loadOptions();

    // Instantiate sequelize with name of database, username and password.
    super(opts.database!, opts.username!, opts.password||undefined, opts);
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
    const opts = <DatabaseOptions>require(filePath).default||require(filePath);
    const envOpts = Object.assign(defOpts, opts[env]);
    // console.log(`DB config: ${JSON.stringify(envOpts, null, 2)}`);
    return envOpts;
  }
}