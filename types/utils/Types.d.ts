/**
 * Type judgment processing.
 */
export default class Types {
    /**
     * Returns true for asynchronous functions, false otherwise.
     * @param {Function} value.
     * @returns {boolean}
     * @example
     * ```js
     * Types.isAsyncFunction(async () => {});// true
     * Types.isAsyncFunction(() => {});// false
     * ```
     */
    static isAsyncFunction(value: Function): boolean;
    /**
      * Return true if `val` is a non-empty string.
      * @param {any} `val` The value to check
      * @returns {Boolean}
      * @api public
      */
    static isString(value: any): boolean;
}
