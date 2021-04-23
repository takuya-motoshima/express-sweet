import sequelize from 'sequelize';
/**
 * Model base class.
 */
export default class Model extends sequelize.Model {
    /**
     * Table name used by the model.
     * @type {string}
     */
    protected static table: string;
    /**
     * Table column list.
     * @type {sequelize.ModelAttributes}
     */
    protected static attributes: sequelize.ModelAttributes;
    /**
     * Column type.
     * @type {sequelize.DataTypes}
     */
    static DataTypes: {
        [key: string]: any;
    };
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
     *       [this.Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)
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
    static Op: {
        [key: string]: any;
    };
    /**
     * Mount on application.
     */
    static mount(): typeof Model;
    /**
     * Define table associations.
     * @see https://sequelize.org/master/manual/assocs.html
     */
    protected static association(): void;
    /**
     * Start a transaction.
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
     */
    static begin(): Promise<sequelize.Transaction>;
    /**
     * Returns data that matches the ID.
     */
    static findById(id: number): Promise<{} | null>;
}
