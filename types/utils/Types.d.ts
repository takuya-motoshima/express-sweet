/**
 * Type judgment processing.
 */
export default class {
    /**
     * Returns true for asynchronous functions, false otherwise.
     *
     * @example
     * Types.isAsyncFunction(async () => {});// true
     * Types.isAsyncFunction(() => {});// false
     *
     * @param  {Function} value
     * @return {boolean}
     */
    static isAsyncFunction(value: Function): boolean;
    /**
      * Return true if `val` is a non-empty string.
      *
      * @param  {any} `val` The value to check
      * @return {Boolean}
      * @api public
      */
    static isString(value: any): boolean;
}
