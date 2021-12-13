/**
 * Database configuration.
 */
module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'testdb',
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'testdb',
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  production: {
    username: 'root',
    password: null,
    database: 'testdb',
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
}