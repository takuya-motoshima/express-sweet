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
    console.log(`The environment is "${env}"`);

    // Database connection config path.
    const path = `${process.cwd()}/config/database`;
    console.log(`Load "${path}.js"`);

    if (fs.existsSync(`${path}.js`)) {
      // Instantiate sequelize with name of database, username and password.
      const options = (require(path) as Database)[env] as sequelize.Options;
      super(
        options.database!,
        options.username!,
        options.password||null,
        options
      );
    } else {
      console.error(`${path} not found`);
      // throw new Error(`${path} not found`);
      super('unkown', 'unkown', null, {host: 'localhost', dialect: 'mariadb'});
    }
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
