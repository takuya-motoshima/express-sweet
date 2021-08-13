import sequelize from 'sequelize';
import database from '~/database/Database';

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
   * @type {sequelize.DataTypes}
   */
  public static readonly DataTypes: {[key: string]: any} = sequelize.DataTypes;

  /**
   * Operator.
   * 
   * @example
   * // Sequelize provides several operators.
   * Post.findAll({
   *   where: {
   *     [this.Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
   *     [this.Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
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
   *       [this.Op.like]: { [this.Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']
   *       // There are more postgres-only range operators, see below
   *     }
   *   }
   * });
   * 
   * @type {sequelize.Op}
   */
  public static readonly Op: {[key: string]: any} = sequelize.Op;

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
  public static readonly fn: (fn: string, ...args: unknown[]) => any = sequelize.fn;

  /**
   * Creates a object representing a column in the DB. This is often useful in conjunction with
   * `sequelize.fn`, since raw string arguments to fn will be escaped.
   * 
   * @type {sequelize.col}
   */
  public static readonly col: (col: string) => any = sequelize.col;

  /**
   * Creates a object representing a literal, i.e. something that will not be escaped.
   * 
   * @type {sequelize.literal}
   */
  public static readonly literal: (val: string) => any = sequelize.literal;

  /**
   * Initialize the model that represents the table in the DB with attributes and options.
   * This method is called automatically from within the "express-sweet.mount" method, so you don't have to run it yourself.
   *
   * @return {typeof Model} Returns this model class itself.
   */
  public static initialize(): (typeof Model) {
    console.log(`Initialize ${this.table} model`);
    this.init(this.attributes, {
      modelName: this.table,
      sequelize: database,
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
   * 
   * @see https://sequelize.org/master/manual/assocs.html
   */
  public static association(): void {
    // Define association in subclass.
  }

  /**
   * Starts a transaction and returns a transaction object to identify the running transaction.
   *
   * @example
   * // First, we start a transaction and save it into a variable
   * const t = await SampleModel.begin();
   *
   * try {
   *   // Then, we do some calls passing this transaction as an option:
   *   const user = await SampleModel.create({ name: 'Bart' }, { transaction: t });
   * 
   *   // If the execution reaches this line, no errors were thrown.
   *   // We commit the transaction.
   *   await t.commit();
   * } catch (error) {
   *   // If the execution reaches this line, an error was thrown.
   *   // We rollback the transaction.
   *   await t.rollback();
   * }
   * @see https://sequelize.org/master/manual/transactions.html
   *
   * @return {Promise<sequelize.Transaction>} Returns a transaction object to identify the transaction being executed.
   */
  public static async begin(): Promise<sequelize.Transaction> {
    return database.transaction();
  }

  /**
   * Returns data that matches the ID.
   */
  public static async findById(id: number): Promise<{}|null> {
    return this.findOne({where: {id}, raw: true});
  }
}