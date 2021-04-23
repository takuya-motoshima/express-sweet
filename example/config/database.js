/**
 * DB connection options.
 */
module.exports = {
  development: {
    username: 'root',
    database: 'sample',
    host: 'localhost',
    dialect: 'mariadb',
    timezone: 'Etc/GMT-9',
    logging: false,
    dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  test: {
    username: 'root',
    database: 'sample',
    host: 'localhost',
    dialect: 'mariadb',
    timezone: 'Etc/GMT-9',
    logging: false,
    dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  production: {
    username: 'root',
    database: 'sample',
    host: 'localhost',
    dialect: 'mariadb',
    timezone: 'Etc/GMT-9',
    logging: false,
    dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  }
}