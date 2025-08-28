import sequelize from 'sequelize';
import DatabaseManager from '~/database/DatabaseManager';

/**
 * Model base class that extends Sequelize.Model for database operations.
 * This is a class that abstracts the tables in the database and provides
 * convenient access to the database connection, Query Builder, and additional methods.
 * 
 * @extends {sequelize.Model}
 * @see {@link https://sequelize.org/api/v6/class/src/model.js~model | Sequelize Model}
 * @example
 * ```js
 * // Creating a custom model
 * import * as expx from 'express-sweet';
 * 
 * export default class extends expx.database.Model {
 *   static get table() {
 *     return 'user';
 *   }
 * 
 *   static get attributes() {
 *     return {
 *       id: {
 *         type: this.DataTypes.INTEGER,
 *         primaryKey: true,
 *         autoIncrement: true
 *       },
 *       name: this.DataTypes.STRING,
 *       email: this.DataTypes.STRING,
 *       password: this.DataTypes.STRING,
 *       icon: this.DataTypes.STRING,
 *       created: this.DataTypes.DATE,
 *       modified: this.DataTypes.DATE
 *     };
 *   }
 * }
 * ```
 * 
 * @example
 * ```js
 * // Basic CRUD operations
 * import BookModel from '../models/BookModel';
 * 
 * // INSERT INTO book (title) VALUES ('Beautiful')
 * await BookModel.create({title: 'Beautiful'});
 * 
 * // SELECT * FROM book
 * await BookModel.findAll();
 * 
 * // UPDATE book SET title = 'Beautiful' WHERE id= 1
 * await BookModel.update({title: 'Beautiful'}, {where: {id: 1}});
 * 
 * // DELETE FROM book WHERE id= 1
 * await BookModel.destroy({where: {id: 1}});
 * ```
 */
export default class Model extends (sequelize.Model as any) {
  /**
   * The name of the table that the model accesses.
   * This member must be defined in a subclass.
   * @type {string}
   * @example
   * ```js
   * import * as expx from 'express-sweet';
   * 
   * export default class extends expx.database.Model {
   *   static get table() {
   *     return 'user';
   *   }
   * }
   * ```
   */
  protected static table: string;

  /**
   * List of columns in the table accessed by this model.
   * This member must be defined in a subclass.
   * @type {sequelize.ModelAttributes}
   * @see {@link https://sequelize.org/api/v6/variable/index.html#static-variable-DataTypes | Sequelize DataTypes}
   * @example
   * ```js
   * import * as expx from 'express-sweet';
   * 
   * export default class extends expx.database.Model {
   *   static get attributes() {
   *     return {
   *       id: {
   *         type: this.DataTypes.INTEGER,
   *         primaryKey: true,
   *         autoIncrement: true
   *       },
   *       name: this.DataTypes.STRING,
   *       email: this.DataTypes.STRING,
   *       password: this.DataTypes.STRING,
   *       icon: this.DataTypes.STRING,
   *       created: this.DataTypes.DATE,
   *       modified: this.DataTypes.DATE
   *     };
   *   }
   * }
   * ```
   */
  protected static attributes: sequelize.ModelAttributes;

  /**
   * Database instance.
   * Shared Sequelize instance managed by DatabaseManager.
   * @type {sequelize.Sequelize}
   */
  protected static db: sequelize.Sequelize;

  /**
   * A convenience class holding commonly used data types.
   * This is an alias for `sequelize.DataTypes`.
   * @type {sequelize.DataTypes}
   * @see {@link https://sequelize.org/api/v6/variable/index.html#static-variable-DataTypes | Sequelize DataTypes}
   * @example
   * ```js
   * {id: this.DataTypes.INTEGER}
   * ```
   */
  static readonly DataTypes: {[key: string]: any} = sequelize.DataTypes;

  /**
   * An enum of query types used by sequelize.query.
   * @see https://sequelize.org/api/v6/variable/index.html#static-variable-QueryTypes
   * @type {sequelize.QueryTypes}
   */
  static readonly QueryTypes: {[key: string]: string} = sequelize.QueryTypes;

  /**
   * Operator.
   * @type {sequelize.Op}
   * @example
   * ```js
   * // Sequelize provides several operators.
   * Post.findAll({
   *   where: {
   *     [this.Op.and]: [{a: 5}, {b: 6}],            // (a = 5) AND (b = 6)
   *     [this.Op.or]: [{a: 5}, {b: 6}],             // (a = 5) OR (b = 6)
   *     someAttribute: {
   *       // Basics
   *       [this.Op.eq]: 3,                              // = 3
   *       [this.Op.ne]: 20,                             // != 20
   *       [this.Op.is]: null,                           // IS NULL
   *       [this.Op.not]: true,                          // IS NOT TRUE
   *       [this.Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)
   * 
   *       // Using dialect specific column identifiers (PG in the following example):
   *       [this.Op.col]: 'user.organization_id',        // = "user"."organization_id"
   * 
   *       // Number comparisons
   *       [this.Op.gt]: 6,                              // > 6
   *       [this.Op.gte]: 6,                             // >= 6
   *       [this.Op.lt]: 10,                             // < 10
   *       [this.Op.lte]: 10,                            // <= 10
   *       [this.Op.between]: [6, 10],                   // BETWEEN 6 AND 10
   *       [this.Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15
   * 
   *       // Other operators
   *       [this.Op.all]: this.literal('SELECT 1'),      // > ALL (SELECT 1)
   *       [this.Op.in]: [1, 2],                         // IN [1, 2]
   *       [this.Op.notIn]: [1, 2],                      // NOT IN [1, 2]
   *       [this.Op.like]: '%hat',                       // LIKE '%hat'
   *       [this.Op.notLike]: '%hat',                    // NOT LIKE '%hat'
   *       [this.Op.startsWith]: 'hat',                  // LIKE 'hat%'
   *       [this.Op.endsWith]: 'hat',                    // LIKE '%hat'
   *       [this.Op.substring]: 'hat',                   // LIKE '%hat%'
   *       [this.Op.iLike]: '%hat',                      // ILIKE '%hat' (case insensitive) (PG only)
   *       [this.Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (PG only)
   *       [this.Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
   *       [this.Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
   *       [this.Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (PG only)
   *       [this.Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (PG only)
   *       [this.Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (PG only)
   *       // In Postgres, this.Op.like/this.Op.iLike/this.Op.notLike can be combined to this.Op.any:
   *       [this.Op.like]: {[this.Op.any]: ['cat', 'hat']}  // LIKE ANY ARRAY['cat', 'hat']
   *       // There are more postgres-only range operators, see below
   *     }
   *   }
   * });
   * ```
   */
  static readonly Op: {[key: string]: any} = sequelize.Op;

  /**
   * Creates a object representing a database function. This can be used in search queries, both in where and
   * order parts, and as default values in column definitions. If you want to refer to columns in your
   * function, you should use `sequelize.col`, so that the columns are properly interpreted as columns and not a strings.
   * @type {sequelize.fn}
   * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-fn | Sequelize fn}
   * @example
   * ```js
   * import BookModel from '../models/BookModel';
   * 
   * // SELECT upper(`title`) AS `title` FROM `book` AS `book`;
   * const books = await BookModel.findAll({
   *   attributes: [[BookModel.fn('upper', BookModel.col('title')), 'title']],
   *   raw: true
   * });
   * ```
   */
  static readonly fn: (fn: string, ...args: unknown[]) => any = sequelize.fn;

  /**
   * Creates a object representing a column in the DB. This is often useful in conjunction with
   * `sequelize.fn`, since raw string arguments to fn will be escaped.
   * @type {sequelize.col}
   * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-col | Sequelize col}
   */
  static readonly col: (col: string) => any = sequelize.col;

  /**
   * Creates a object representing a literal, i.e. something that will not be escaped.
   * @type {sequelize.literal}
   * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-literal | Sequelize literal}
   * @example
   * ```js
   * import BookModel from '../models/BookModel';
   * 
   * // SELECT `id`, `title`, (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count` FROM `book` AS `book`;
   * const books = await BookModel.findAll({
   *   attributes: [
   *     'id',
   *     'title',
   *     [BookModel.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
   *   ],
   *   raw: true
   * });
   * ```
   */
  static readonly literal: (val: string) => any = sequelize.literal;

  /**
   * A way of specifying attr = condition.
   * The attr can either be an object taken from Model.rawAttributes or an object from sequelize utility functions.
   * @type {sequelize.where}
   * @see {@link https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-where | Sequelize where}
   * @example
   * ```js
   * import BookModel from '../models/BookModel';
   * 
   * // SELECT `title` FROM `book` AS `book` WHERE CHAR_LENGTH(`title`) <= 10;
   * const books = await BookModel.findAll({
   *   attributes: ['title'],
   *   where: BookModel.where(
   *     BookModel.fn('CHAR_LENGTH', BookModel.col('title')),
   *     {[BookModel.Op.lte]: 10}
   *   ),
   *   raw: true
   * });
   * ```
   */
  static readonly where: (attr: sequelize.AttributeType, comparator: string, logic: sequelize.LogicType) => sequelize.Utils.Where = sequelize.where;

  /**
   * Reference to sequelize.Transaction.  
   * This includes properties such as isolation level enums used with the transaction option.
   * @see https://sequelize.org/api/v6/class/src/transaction.js~transaction
   * @type {sequelize.Transaction}
   * @example
   * ```js
   * BookModel.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
   * BookModel.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
   * BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
   * BookModel.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
   * ```
   */
  static readonly Transaction: (typeof sequelize.Transaction) = sequelize.Transaction;


  /**
   * Initializes the model with attributes and options.
   * This method is called automatically from within the "express-sweet.mount" method.
   * @override
   * @returns {Promise<any>} Returns this model class itself.
   */
  static async init(): Promise<any> {
    if (process.env.EXPRESS_DEBUG) {
      console.log(`Initialize ${this.table} model`);
    }

    // Get shared Database instance from DatabaseManager.
    this.db = await DatabaseManager.getInstance();
    super.init(this.attributes, {
      modelName: this.table,
      sequelize: this.db,
      freezeTableName: true,
      timestamps: false
    });
    // this.association();
    return this;
  }

  /**
   * Associate the model.
   * Define associations with other models such as "hasOne", "hasMany", "belongsTo", "belongsToMany".
   * If you omit the alias (as) option, the associated name will be hasOne, singular for belongsTo, and plural for hasMany.
   * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
   * @see {@link https://sequelize.org/api/v6/class/src/associations/base.js~association | Sequelize Associations}
   * @example
   * ```js
   * import * as expx from 'express-sweet';
   * import ProfileModel from './ProfileModel';
   * 
   * export default class extends expx.database.Model {
   *   static association() {
   *     // User has one profile.
   *     this.hasOne(ProfileModel, {
   *       foreignKey: 'userId', // profile.userId
   *       sourceKey: 'id', // user.id
   *       as: 'profile'
   *     });
   *   }
   * }
   * ```
   */
  static association(): void {
    // Define association in subclass.
  }

  /**
   * Starts a transaction and returns a transaction object to identify the running transaction.
   * @see https://sequelize.org/api/v6/class/src/transaction.js~transaction
   * @param {sequelize.TransactionOptions} options Options provided when the transaction is created.
   * @returns {Promise<sequelize.Transaction>} Returns a transaction object to identify the transaction being executed.
   * @example
   * ```js
   * // Simple transaction usage example.
   * let transaction;
   * try {
   *   transaction = await BookModel.begin();
   *   const book = await BookModel.create({title: 'When Im Gone'}, {transaction});
   *   await transaction.commit();
   * } catch {
   *   if (transaction)
   *     await transaction.rollback();
   * }
   * 
   * // You can also use transaction options.
   * let transaction;
   * try {
   *   transaction = await BookModel.begin({
   *     isolationLevel: BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
   *     type: BookModel.Transaction.TYPES.DEFERRED,
   *   });
   *   const book = await BookModel.findOne({where: {id: 1}}, {transaction});
   *   book.title = 'When Im Gone';
   *   await book.save({transaction});
   *   await transaction.commit();
   * 
   *   // Load updated data.
   *   await book.reload();
   * } catch (error) {
   *   if (transaction)
   *     await transaction.rollback();
   * }
   * ```
   */
  static async begin(options?: sequelize.TransactionOptions): Promise<sequelize.Transaction> {
    return this.db.transaction(options);
  }

  /**
   * Returns data that matches the ID.
   * This is a convenience method that wraps findOne with ID condition.
   * @param {number} id The ID to search for
   * @returns {Promise<object|null>} Returns the model instance or null if not found
   * @example
   * ```js
   * import BookModel from '../models/BookModel';
   * 
   * // SELECT * FROM book WHERE id = 1 LIMIT 1;
   * const book = await BookModel.findById(1);
   * ```
   */
  static async findById(id: number): Promise<{}|null> {
    return (this as any).findOne({where: {id}, raw: true});
  }

  /**
   * Raw Queries.
   * As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the Model.query method.
   * @see https://sequelize.org/master/manual/raw-queries.html
   * @param {string} sql SQL string.
   * @param {object} options Query options.
   * @returns {Promise<any>} By default, the function will return two arguments: an array of results, and a metadata object, containing number of affected rows etc.
   *                        If you are running a type of query where you don't need the metadata, for example a SELECT query, you can pass in a query type to make sequelize format the results:
   * @example
   * ```js
   * // By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc).
   * // Note that since this is a raw query, the metadata are dialect specific.
   * const [results, metadata] = await BookModel.query("UPDATE book SET title = 'When Im Gone' WHERE id = 1");
   * 
   * // In cases where you don't need to access the metadata you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:
   * // We didn't need to destructure the result here - the results were returned directly
   * const users = await BookModel.query("SELECT * FROM book", {type: BookModel.QueryTypes.SELECT});
   * ```
   */
  static async query(
    sql: string,
    options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPDATE>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKUPDATE>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.INSERT>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPSERT>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.DELETE>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKDELETE>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.SHOWTABLES>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.DESCRIBE>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT>
      | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW>
  ): Promise<any> {
    return this.db.query(sql, options);
  }
}