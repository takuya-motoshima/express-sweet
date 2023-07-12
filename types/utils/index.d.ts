declare const _default: {
    isArray: (value: any) => boolean;
    isAsyncFunction: (value: any) => boolean;
    isFunction: (value: any) => boolean;
    isObject: (value: any) => boolean;
    isString: (value: any) => boolean;
    loadAuthenticationConfig: () => import("../interfaces").AuthenticationConfig;
    loadBasicConfig: () => import("../interfaces").BasicConfig;
    loadDatabaseConfig: () => import("sequelize").Options;
    loadViewConfig: () => import("../interfaces").ViewConfig;
};
export default _default;
