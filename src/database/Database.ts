import sequelize from 'sequelize';

/**
 * Connect to DB.
 */
export default new class extends sequelize.Sequelize {
  /**
   * Create a sequelize instance.
   */
  constructor() {
    const env = process.env.NODE_ENV||'development';
    console.log('env=', env);
    // const env = 'development';
    const config = require(`${global.APP_DIR}/config/database`) as {[key: string]: sequelize.Options};
    const options = config[env] as sequelize.Options;
    super(options.database as string, options.username as string, options.password as string||undefined, options);
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
