import fs from 'node:fs';
import sequelize from 'sequelize';
import DatabaseConfig from '~/interfaces/DatabaseConfig';
import Environment from '~/middlewares/Environment';

/**
  * Get database configuration (config/database).
  * @return {Promise<sequelize.Options>} Loaded configuration.
  */
export default async (): Promise<sequelize.Options> => {
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

  // Get NODE_ENV environment variable.
  await Environment.mount();

  // If an options file is found, it returns options that override the default options.
  let {default: options}: {default: DatabaseConfig} = await import(`${filePath}.js`);
  options = Object.assign(defaultOptions, options[process.env.NODE_ENV||'development']) as DatabaseConfig;
  if (process.env.EXPRESS_DEBUG)
    console.log(`Connection DB is ${options.host} ${options.database}`);
  return options;
}