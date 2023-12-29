import sequelize from 'sequelize';
/**
 * Connect to DB.
 */
declare const _default: {
    /**
     * Returns true if the DB can be connected.
     * @example
     * const database = require('express-sweet').database.Database;
     *
     * // Check database connection.
     * const isConnected = await database.isConnect();
     * @return {Promise<boolean>} Returns true if it can connect to the database, false if it cannot.
     */
    isConnect(): Promise<boolean>;
    fn: typeof sequelize.fn;
    col: typeof sequelize.col;
    cast: typeof sequelize.cast;
    literal: typeof sequelize.literal;
    and: typeof sequelize.and;
    or: typeof sequelize.or;
    json: typeof sequelize.json;
    where: typeof sequelize.where;
    Sequelize: typeof sequelize.Sequelize;
    readonly config: sequelize.Config;
    readonly modelManager: import("sequelize/types/model-manager").ModelManager;
    readonly connectionManager: import("sequelize/types/dialects/abstract/connection-manager").ConnectionManager;
    readonly models: {
        [key: string]: sequelize.ModelCtor<sequelize.Model<any, any>>;
    };
    beforeValidate(name: string, fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/instance-validator").ValidationOptions) => void): void;
    beforeValidate(fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/instance-validator").ValidationOptions) => void): void;
    afterValidate(name: string, fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/instance-validator").ValidationOptions) => void): void;
    afterValidate(fn: (instance: sequelize.Model<any, any>, options: import("sequelize/types/instance-validator").ValidationOptions) => void): void;
    beforeCreate(name: string, fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions<any>) => void): void;
    beforeCreate(fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions<any>) => void): void;
    afterCreate(name: string, fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions<any>) => void): void;
    afterCreate(fn: (attributes: sequelize.Model<any, any>, options: sequelize.CreateOptions<any>) => void): void;
    beforeDestroy(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    beforeDestroy(fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    afterDestroy(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    afterDestroy(fn: (instance: sequelize.Model<any, any>, options: sequelize.InstanceDestroyOptions) => void): void;
    beforeUpdate(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions<any>) => void): void;
    beforeUpdate(fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions<any>) => void): void;
    afterUpdate(name: string, fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions<any>) => void): void;
    afterUpdate(fn: (instance: sequelize.Model<any, any>, options: sequelize.UpdateOptions<any>) => void): void;
    beforeBulkCreate(name: string, fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions<any>) => void): void;
    beforeBulkCreate(fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions<any>) => void): void;
    afterBulkCreate(name: string, fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions<any>) => void): void;
    afterBulkCreate(fn: (instances: sequelize.Model<any, any>[], options: sequelize.BulkCreateOptions<any>) => void): void;
    beforeBulkDestroy(name: string, fn: (options: sequelize.BulkCreateOptions<any>) => void): void;
    beforeBulkDestroy(fn: (options: sequelize.BulkCreateOptions<any>) => void): void;
    afterBulkDestroy(name: string, fn: (options: sequelize.DestroyOptions<any>) => void): void;
    afterBulkDestroy(fn: (options: sequelize.DestroyOptions<any>) => void): void;
    beforeBulkUpdate(name: string, fn: (options: sequelize.UpdateOptions<any>) => void): void;
    beforeBulkUpdate(fn: (options: sequelize.UpdateOptions<any>) => void): void;
    afterBulkUpdate(name: string, fn: (options: sequelize.UpdateOptions<any>) => void): void;
    afterBulkUpdate(fn: (options: sequelize.UpdateOptions<any>) => void): void;
    beforeFind(name: string, fn: (options: sequelize.FindOptions<any>) => void): void;
    beforeFind(fn: (options: sequelize.FindOptions<any>) => void): void;
    beforeFindAfterExpandIncludeAll(name: string, fn: (options: sequelize.FindOptions<any>) => void): void;
    beforeFindAfterExpandIncludeAll(fn: (options: sequelize.FindOptions<any>) => void): void;
    beforeFindAfterOptions(name: string, fn: (options: sequelize.FindOptions<any>) => void): void;
    beforeFindAfterOptions(fn: (options: sequelize.FindOptions<any>) => void): void;
    afterFind(name: string, fn: (instancesOrInstance: sequelize.Model<any, any> | sequelize.Model<any, any>[] | null, options: sequelize.FindOptions<any>) => void): void;
    afterFind(fn: (instancesOrInstance: sequelize.Model<any, any> | sequelize.Model<any, any>[] | null, options: sequelize.FindOptions<any>) => void): void;
    beforeDefine(name: string, fn: (attributes: sequelize.ModelAttributes<sequelize.Model<any, any>, any>, options: sequelize.ModelOptions<sequelize.Model<any, any>>) => void): void;
    beforeDefine(fn: (attributes: sequelize.ModelAttributes<sequelize.Model<any, any>, any>, options: sequelize.ModelOptions<sequelize.Model<any, any>>) => void): void;
    afterDefine(name: string, fn: (model: sequelize.ModelType) => void): void;
    afterDefine(fn: (model: sequelize.ModelType) => void): void;
    beforeInit(name: string, fn: (config: sequelize.Config, options: sequelize.Options) => void): void;
    beforeInit(fn: (config: sequelize.Config, options: sequelize.Options) => void): void;
    afterInit(name: string, fn: (sequelize: sequelize.Sequelize) => void): void;
    afterInit(fn: (sequelize: sequelize.Sequelize) => void): void;
    beforeBulkSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeBulkSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterBulkSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    beforeSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterSync(name: string, fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    afterSync(fn: (options: sequelize.SyncOptions) => import("sequelize/types/hooks").HookReturn): void;
    getDialect(): string;
    getDatabaseName(): string;
    getQueryInterface(): sequelize.QueryInterface;
    define<M extends sequelize.Model<any, any>, TAttributes = sequelize.Attributes<M>>(modelName: string, attributes: sequelize.ModelAttributes<M, TAttributes>, options?: sequelize.ModelOptions<M> | undefined): sequelize.ModelCtor<M>;
    model(modelName: string): sequelize.ModelCtor<sequelize.Model<any, any>>;
    isDefined(modelName: string): boolean;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPDATE>): Promise<[undefined, number]>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKUPDATE>): Promise<number>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.INSERT>): Promise<[number, number]>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.UPSERT>): Promise<number>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.DELETE>): Promise<void>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.BULKDELETE>): Promise<number>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SHOWTABLES>): Promise<string[]>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.DESCRIBE>): Promise<sequelize.ColumnsDescription>;
    query<M_1 extends sequelize.Model<any, any>>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithModel<M_1> & {
        plain: true;
    }): Promise<M_1 | null>;
    query<M_2 extends sequelize.Model<any, any>>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithModel<M_2>): Promise<M_2[]>;
    query<T extends object>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT> & {
        plain: true;
    }): Promise<T | null>;
    query<T_1 extends object>(sql: string | {
        query: string;
        values: unknown[];
    }, options: sequelize.QueryOptionsWithType<sequelize.QueryTypes.SELECT>): Promise<T_1[]>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options: (sequelize.QueryOptions | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW>) & {
        plain: true;
    }): Promise<{
        [key: string]: unknown;
    } | null>;
    query(sql: string | {
        query: string;
        values: unknown[];
    }, options?: sequelize.QueryOptions | sequelize.QueryOptionsWithType<sequelize.QueryTypes.RAW> | undefined): Promise<[unknown[], unknown]>;
    random(): sequelize.Utils.Fn;
    set(variables: object, options: sequelize.QueryOptionsTransactionRequired): Promise<unknown>;
    escape(value: string | number | Date): string;
    createSchema(schema: string, options: sequelize.Logging): Promise<unknown>;
    showAllSchemas(options: sequelize.Logging): Promise<object[]>;
    dropSchema(schema: string, options: sequelize.Logging): Promise<unknown[]>;
    dropAllSchemas(options: sequelize.Logging): Promise<unknown[]>;
    sync(options?: sequelize.SyncOptions | undefined): Promise<any>;
    truncate(options?: sequelize.DestroyOptions<any> | undefined): Promise<unknown[]>;
    drop(options?: sequelize.DropOptions | undefined): Promise<unknown[]>;
    authenticate(options?: sequelize.QueryOptions | undefined): Promise<void>;
    validate(options?: sequelize.QueryOptions | undefined): Promise<void>;
    transaction<T_2>(options: sequelize.TransactionOptions, autoCallback: (t: sequelize.Transaction) => PromiseLike<T_2>): Promise<T_2>;
    transaction<T_3>(autoCallback: (t: sequelize.Transaction) => PromiseLike<T_3>): Promise<T_3>;
    transaction(options?: sequelize.TransactionOptions | undefined): Promise<sequelize.Transaction>;
    close(): Promise<void>;
    databaseVersion(): Promise<string>;
    _model: sequelize.Model<any, any>;
    _attributes: any;
    _creationAttributes: any;
    addHook<K extends keyof import("sequelize/types/hooks").SequelizeHooks<M_3, TModelAttributes, TCreationAttributes>>(hookType: K, name: string, fn: import("sequelize/types/hooks").SequelizeHooks<sequelize.Model<any, any>, any, any>[K]): any;
    addHook<K_1 extends keyof import("sequelize/types/hooks").SequelizeHooks<M_3, TModelAttributes, TCreationAttributes>>(hookType: K_1, fn: import("sequelize/types/hooks").SequelizeHooks<sequelize.Model<any, any>, any, any>[K_1]): any;
    removeHook<K_2 extends keyof import("sequelize/types/hooks").SequelizeHooks<M_3, TModelAttributes, TCreationAttributes>>(hookType: K_2, name: string): any;
    hasHook<K_3 extends keyof import("sequelize/types/hooks").SequelizeHooks<M_3, TModelAttributes, TCreationAttributes>>(hookType: K_3): boolean;
    hasHooks<K_4 extends keyof import("sequelize/types/hooks").SequelizeHooks<M_3, TModelAttributes, TCreationAttributes>>(hookType: K_4): boolean;
};
export default _default;
