/**
 * Express Sweet configuration interfaces.
 * Exports all configuration interfaces for type-safe configuration setup.
 * @module interfaces
 */
/**
 * User authentication configuration interface using Passport.js
 */
export { default as AuthenticationConfig } from './AuthenticationConfig';
/**
 * Basic application configuration interface
 */
export { default as BasicConfig } from './BasicConfig';
/**
 * Database configuration interface for Sequelize connections
 */
export { default as DatabaseConfig } from './DatabaseConfig';
/**
 * Handlebars view engine configuration interface
 */
export { default as ViewConfig } from './ViewConfig';
/**
 * Logging configuration interface using Morgan
 */
export { default as LoggingConfig } from './LoggingConfig';
