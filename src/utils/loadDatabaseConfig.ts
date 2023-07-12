import fs from 'fs';
import sequelize from 'sequelize';
import DatabaseConfig from '~/interfaces/DatabaseConfig';

/**
  * Get database configuration (config/database).
  * 
  * @return {sequelize.Options} Loaded configuration.
  */
export default (): sequelize.Options => {
  // Options with default values set.
  const defaultOptions: sequelize.Options = {
    database: 'unkown',
    username: 'unkown',
    password: undefined,
    host: 'localhost',
    dialect: 'mariadb'
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/database`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // Get the execution environment.
  const env = process.env.NODE_ENV||'development';

  // If an options file is found, it returns options that override the default options.
  const options = <DatabaseConfig>require(filePath).default||require(filePath);
  const mergeOptions = Object.assign(defaultOptions, options[env]);
  if (process.env.EXPRESS_DEBUG)
    console.log(`Connection DB is ${mergeOptions.host} ${mergeOptions.database}`);
  return mergeOptions;
}