/**
 * Database configuration.
 */
export default {
  development: {
    username: 'root',
    password: null,
    database: 'test',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: console.log
    //,timezone: 'Etc/GMT-9'
    //,dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  test: {
    username: 'root',
    password: null,
    database: 'test',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
    //,timezone: 'Etc/GMT-9'
    //,dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  },
  production: {
    username: 'root',
    password: null,
    database: 'test',
    host: 'localhost',
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
    //,timezone: 'Etc/GMT-9'
    //,dialectOptions: {useUTC: false, timezone: 'Etc/GMT-9'}
  }
}