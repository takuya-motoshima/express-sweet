/**
 * Database utilities and ORM functionality for Express Sweet.
 *
 * Provides Sequelize-based database abstraction with singleton connection management,
 * custom Model base class, and automatic model loading system.
 *
 * @module database
 * @example
 * ```js
 * // Using DatabaseManager
 * import * as expx from 'express-sweet';
 *
 * const db = await expx.database.DatabaseManager.getInstance();
 * const isConnected = await expx.database.DatabaseManager.isConnected();
 * ```
 *
 * @example
 * ```js
 * // Creating a custom model
 * import * as expx from 'express-sweet';
 *
 * export default class extends expx.database.Model {
 *   static get table() {
 *     return 'users';
 *   }
 *   static get attributes() {
 *     return {
 *       id: { type: this.DataTypes.INTEGER, primaryKey: true },
 *       name: this.DataTypes.STRING,
 *       email: this.DataTypes.STRING
 *     };
 *   }
 * }
 * ```
 */
/**
 * Singleton database connection manager for Sequelize
 */
export { default as DatabaseManager } from './DatabaseManager';
/**
 * Base model class extending Sequelize.Model
 */
export { default as Model } from './Model';
/**
 * Automatic model loading and association function
 */
export { default as loadModels } from './loadModels';
