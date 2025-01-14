/**
 * Type judgment processing.
 */
export default class {
    /**
     * Returns true for asynchronous functions, false otherwise.
     * @param {Function} value.
     * @return {boolean}
     * @example
     * Types.isAsyncFunction(async () => {});// true
     * Types.isAsyncFunction(() => {});// false
     */
    static isAsyncFunction(value: Function): boolean;
    /**
      * Return true if `val` is a non-empty string.
      * @param {any} `val` The value to check
      * @return {Boolean}
      * @api public
      */
    static isString(value: any): boolean;
}
