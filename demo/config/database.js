/**
 * Database configuration.
 */
// For Docker, set the DB container name to host.
const host = process.env.IS_DOCKER ? 'sample_db' : 'localhost';
module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  production: {
    username: 'root',
    password: 'password',
    database: 'sample_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
}