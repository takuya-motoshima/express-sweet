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
  static isAsyncFunction(value: Function): boolean {
    return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
  }

  /**
    * Return true if `val` is a non-empty string.
    * @param {any} `val` The value to check
    * @returns {Boolean}
    * @api public
    */
  static isString(value: any): boolean {
    return typeof value === 'string' && value !== '';
  }
}