import sequelize from 'sequelize';
declare const _default: {
    /**
     * Returns true if the DB can be connected.
     *
     * @example
     * const database = require('express-sweet').database.Database;
     *
     * // Check database connection.
     * const isConnected = await database.isConnect();
     *
     * @return {Promise<boolean>} Returns true if it can connect to the database, false if it cannot.
     */
    isConnect(): Promise<boolean>;
    Sequelize: typeof sequelize.Sequelize;
    readonly config: sequelize.Config;
    readonly modelManager: import("sequelize/types/lib/model-manager").ModelManager;
    readonly connectionManager: import("sequelize/types/lib/connection-manager").ConnectionManager;
    readonly models: {
        [key: string]: sequelize.ModelCtor<sequelize.Model<any, any>>;
    };
    beforeValidate(name: string, fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/lib/instance-validator").ValidationOptions) => void): void;
    beforeValidate(fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/lib/instance-validator").ValidationOptions) => void): void;
    afterValidate(name: string, fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/lib/instance-validator").ValidationOptions) => void): void;
    afterValidate(fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/lib/instance-validator").ValidationOptions) => void): void;
    beforeCreate(name: string, fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions) => void): void;
    beforeCreate(fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions) => void): void;
    afterCreate(name: string, fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions) => void): void;
    afterCreate(fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions) => void): void;
    beforeDestroy(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    beforeDestroy(fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    afterDestroy(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    afterDestroy(fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    beforeUpdate(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions) => void): void;
    beforeUpdate(fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions) => void): void;
    afterUpdate(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions) => void): void;
    afterUpdate(fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions) => void): void;
    beforeBulkCreate(name: string, fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions) => void): void;
    beforeBulkCreate(fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions) => void): void;
    afterBulkCreate(name: string, fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions) => void): void;
    afterBulkCreate(fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions) => void): void;
    beforeBulkDestroy(name: string, fn: (options: sequelize.BulkCreateOptions) => void): void;
    beforeBulkDestroy(fn: (options: sequelize.BulkCreateOptions) => void): void;
    afterBulkDestroy(name: string, fn: (options: sequelize.DestroyOptions) => void): void;
    afterBulkDestroy(fn: (options: sequelize.DestroyOptions) => void): void;
    beforeBulkUpdate(name: string, fn: (options: sequelize.UpdateOptions) => void): void;
    beforeBulkUpdate(fn: (options: sequelize.UpdateOptions) => void): void;
    afterBulkUpdate(name: string, fn: (options: sequelize.UpdateOptions) => void): void;
    afterBulkUpdate(fn: (options: sequelize.UpdateOptions) => void): void;
    beforeFind(name: string, fn: (options: sequelize.FindOptions) => void): void;
    beforeFind(fn: (options: sequelize.FindOptions) => void): void;
    beforeFindAfterExpandIncludeAll(name: string, fn: (options: sequelize.FindOptions) => void): void;
    beforeFindAfterExpandIncludeAll(fn: (options: sequelize.FindOptions) => void): void;
    beforeFindAfterOptions(name: string, fn: (options: sequelize.FindOptions) => void): void;
    beforeFindAfterOptions(fn: (options: sequelize.FindOptions) => void): void;
    afterFind(name: string, fn: (instancesOrInstance: sequelize.Model<any, any> | sequelize.Model<any, any>[] | null, options: sequelize.FindOptions) => void): void;
    afterFind(fn: (instancesOrInstance: sequelize.Model<any, any> | sequelize.Model<any, any>[] | null, options: sequelize.FindOptions) => void): void;
    beforeDefine(name: string, fn: (attributes: sequelize.ModelAttributes<sequelize.Model<any, any>>, options: sequelize.ModelOptions<sequelize.Model<any, any>>) => void): void;
    beforeDefine(fn: (attributes: sequelize.ModelAttributes<sequelize.Model<any, any>>, options: sequelize.ModelOptions<sequelize.Model<any, any>>) => void): void;
    afterDefine(name: string, fn: (model: typeof sequelize.Model) => void): void;
    afterDefine(fn: (model: typeof sequelize.Model) => void): void;
    beforeInit(name: string, fn: (config: sequelize.Config, options: sequelize.Options) => void): void;
    beforeInit(fn: (config: sequelize.Config, options: sequelize.Options) => void): void;
    afterInit(name: string, fn: (sequelize: sequelize.Sequelize) => void): void;
    afterInit(fn: (sequelize: sequelize.Sequelize) => void): void;
    beforeBulkSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    beforeBulkSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    afterBulkSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    afterBulkSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    beforeSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    beforeSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    afterSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    afterSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/lib/hooks").HookReturn): void;
    getDialect(): string;
    getQueryInterface(): sequelize.QueryInterface;
    define(modelName: string, attributes: sequelize.ModelAttributes<sequelize.Model<any, any>>, options?: sequelize.ModelOptions<sequelize.Model<any, any>> | undefined): typeof sequelize.Model;
    model(modelName: string): sequelize.ModelCtor<sequelize.Model<any, any>>;
    isDefined(modelName: string): boolean;
    import<T extends typeof sequelize.Model>(path: string, defineFunction?: ((sequelize: sequelize.Sequelize, dataTypes: typeof sequelize.DataTypes) => T) | undefined): T;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPDATE>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKUPDATE>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.INSERT>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPSERT>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.DELETE>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKDELETE>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SHOWTABLES>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.DESCRIBE>): any;
    query<M extends sequelize.Model<any, any>>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithModel): any;
    query<T_1 extends object>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT> & {
        plain: true;
    }): any;
    query<T_2 extends object>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT>): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: (sequelize.QueryOptions | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW>) & {
        plain: true;
    }): any;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options?: sequelize.QueryOptions | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW> | undefined): any;
    random(): sequelize.Utils.Fn;
    set(variables: object, options: sequelize.QueryOptionsTransactionRequired): any;
    escape(value: string | number | Date): string;
    createSchema(schema: string, options: sequelize.Logging): any;
    showAllSchemas(options: sequelize.Logging): any;
    dropSchema(schema: string, options: sequelize.Logging): any;
    dropAllSchemas(options: sequelize.Logging): any;
    sync(options?: sequelize.SyncOptions | undefined): any;
    truncate(options?: sequelize.DestroyOptions | undefined): any;
    drop(options?: sequelize.DropOptions | undefined): any;
    authenticate(options?: sequelize.QueryOptions | undefined): any;
    validate(options?: sequelize.QueryOptions | undefined): any;
    transaction<T_3>(options: sequelize.TransactionOptions, autoCallback: (t: sequelize.Transaction) => PromiseLike<T_3>): any;
    transaction<T_4>(autoCallback: (t: sequelize.Transaction) => PromiseLike<T_4>): any;
    transaction(options?: sequelize.TransactionOptions | undefined): any;
    close(): any;
    databaseVersion(): any;
    addHook<K extends keyof import("sequelize/types/lib/hooks").SequelizeHooks>(hookType: K, name: string, fn: import("sequelize/types/lib/hooks").SequelizeHooks[K]): any;
    addHook<K_1 extends keyof import("sequelize/types/lib/hooks").SequelizeHooks>(hookType: K_1, fn: import("sequelize/types/lib/hooks").SequelizeHooks[K_1]): any;
    removeHook<K_2 extends keyof import("sequelize/types/lib/hooks").SequelizeHooks>(hookType: K_2, name: string): any;
    hasHook<K_3 extends keyof import("sequelize/types/lib/hooks").SequelizeHooks>(hookType: K_3): boolean;
    hasHooks<K_4 extends keyof import("sequelize/types/lib/hooks").SequelizeHooks>(hookType: K_4): boolean;
};
/**
 * Connect to DB.
 */
export default _default;
