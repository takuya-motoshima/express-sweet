import sequelize from 'sequelize';
/**
 * Database class.
 */
export default class extends sequelize.Sequelize {
    /**
     * Returns true if the DB can be connected.
     * @return {Promise<boolean>} Returns true if it can connect to the database, false if it cannot.
     */
    isConnect(): Promise<boolean>;
    /**
     * Returns the current database configuration.
     * @return {object} Database configuration object containing all sequelize options
     * @see {@link https://sequelize.org/docs/v6/other-topics/dialect-specific-things/ | Sequelize Dialect Options}
     * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-options | Sequelize Constructor Options}
     */
    getConfig(): object;
}
