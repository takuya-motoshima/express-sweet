import sequelize from 'sequelize';

/**
 * Database class.
 */
export default class extends sequelize.Sequelize {
  /**
   * Returns true if the DB can be connected.
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