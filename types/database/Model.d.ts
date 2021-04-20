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
    static types: {
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
