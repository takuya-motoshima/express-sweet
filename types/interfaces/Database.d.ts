import sequelize from 'sequelize';
/**
 * Database connection value (username, password, database name, etc.) configuration.
 */
export default interface  {
    [key: string]: sequelize.Options;
}
