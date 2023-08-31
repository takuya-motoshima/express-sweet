import sequelize from 'sequelize';
/**
 * Model base class.
 */
export default class Model extends sequelize.Model {
    /**
     * The name of the table that the model accesses.
     * This member must be defined in a subclass.
     * @type {string}
     */
    protected static table: string;
    /**
     * List of columns in the table accessed by this model.
     * This member must be defined in a subclass.
     * @type {sequelize.ModelAttributes}
     */
    protected static attributes: sequelize.ModelAttributes;
    /**
     * Column type.
     *
     * @see https://sequelize.org/master/variable/index.html#static-variable-DataTypes
     * @type {sequelize.DataTypes}
     */
    static readonly DataTypes: {
        [key: string]: any;
    };
    /**
     * An enum of query types used by sequelize.query
     *
     * @see https://sequelize.org/master/variable/index.html#static-variable-QueryTypes
     * @type {sequelize.QueryTypes}
     */
    static readonly QueryTypes: {
        [key: string]: string;
    };
    /**
     * Operator.
     *
     * @example
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
     *
     * @type {sequelize.Op}
     */
    static readonly Op: {
        [key: string]: any;
    };
    /**
     * Creates a object representing a database function. This can be used in search queries, both in where and
     * order parts, and as default values in column definitions. If you want to refer to columns in your
     * function, you should use `sequelize.col`, so that the columns are properly interpreted as columns and not a strings.
     *
     * @example
     * // Convert a user's username to upper case
     * Post.update({
     *   username: this.fn('upper', this.col('username'))
     * })
     *
     * @type {sequelize.fn}
     */
    static readonly fn: (fn: string, ...args: unknown[]) => any;
    /**
     * Creates a object representing a column in the DB. This is often useful in conjunction with
     * `sequelize.fn`, since raw string arguments to fn will be escaped.
     *
     * @type {sequelize.col}
     */
    static readonly col: (col: string) => any;
    /**
     * Creates a object representing a literal, i.e. something that will not be escaped.
     *
     * @type {sequelize.literal}
     */
    static readonly literal: (val: string) => any;
    /**
     * A way of specifying attr = condition.
     *
     * @type {sequelize.where}
     */
    static readonly where: (attr: sequelize.AttributeType, comparator: string, logic: sequelize.LogicType) => sequelize.Utils.Where;
    /**
     * Reference to sequelize.Transaction.
     * This includes properties such as isolation level enums used with the transaction option.
     *
     * @example
     * BookModel.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
     * BookModel.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
     * BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
     * BookModel.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
     *
     * @see https://sequelize.org/master/class/lib/transaction.js~Transaction.html
     * @type {sequelize.Transaction}
     */
    static readonly Transaction: (typeof sequelize.Transaction);
    /**
     * Initialize the model that represents the table in the DB with attributes and options.
     * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
     *
     * @return {typeof Model} Returns this model class itself.
     */
    static initialize(): (typeof Model);
    /**
     * Associate the model.
     * Define associations with other models such as "hasOne", "hasMany", "belongsTo", "belongsToMany".
     * If you omit the alias (as) option, the associated name will be hasOne, singular for belongsTo, and plural for hasMany.
     * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
     *
     * @see https://sequelize.org/master/manual/assocs.html
     */
    static association(): void;
    /**
     * Starts a transaction and returns a transaction object to identify the running transaction.
     *
     * @example
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
     *   // Check the update result.
     *   // results in: New title of book: When Im Gone
     *   await book.reload();
     *   console.log(`New title of book: ${book.title}`);
     * } catch (err) {
     *   if (transaction)
     *     await transaction.rollback();
     * }
     *
     * @see https://sequelize.org/master/manual/transactions.html
     * @param   {sequelize.TransactionOptions}    options?  Options provided when the transaction is created.
     * @return  {Promise<sequelize.Transaction>}            Returns a transaction object to identify the transaction being executed.
     */
    static begin(options?: sequelize.TransactionOptions): Promise<sequelize.Transaction>;
    /**
     * Returns data that matches the ID.
     */
    static findById(id: number): Promise<{} | null>;
    /**
     * Raw Queries.
     * As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the Model.query method.
     *
     * @example
     * // By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc).
     * // Note that since this is a raw query, the metadata are dialect specific.
     * const [results, metadata] = await BookModel.query("UPDATE book SET title = 'When Im Gone' WHERE id = 1");
     *
     * // In cases where you don't need to access the metadata you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:
     * // We didn't need to destructure the result here - the results were returned directly
     * const users = await BookModel.query("SELECT * FROM book", {type: BookModel.QueryTypes.SELECT});
     *
     * @see https://sequelize.org/master/manual/raw-queries.html
     *
     * @param   {string} sql      SQL string.
     * @param   {object} options  Query options.
     * @return  {Promise<any>}    By default, the function will return two arguments: an array of results, and a metadata object, containing number of affected rows etc.
     *                            If you are running a type of query where you don't need the metadata, for example a SELECT query, you can pass in a query type to make sequelize format the results:
     */
    static query(sql: string, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPDATE> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKUPDATE> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.INSERT> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPSERT> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.DELETE> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKDELETE> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.SHOWTABLES> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.DESCRIBE> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW> | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW>): Promise<any>;
}
