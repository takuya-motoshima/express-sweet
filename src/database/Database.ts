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
    const env = process.env.NODE_ENV||'development';
    console.log(`The environment is "${env}"`);
    const configPath = `${process.cwd()}/config/database`;
    console.log(`Load "${configPath}.js"`);
    if (!fs.existsSync(`${configPath}.js`)) 
      throw new Error(`${configPath} not found`);
    const config = require(configPath) as Database;
    const options = config[env] as sequelize.Options;
    super(
      options.database as string,
      options.username as string,
      options.password as string||undefined,
      options
    );
  }

  /**
   * Returns true if the DB can be connected.
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
