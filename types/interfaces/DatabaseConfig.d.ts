import sequelize from 'sequelize';
/**
 * Database configuration.
 */
export default interface DatabaseConfig {
    [key: string]: sequelize.Options;
}
