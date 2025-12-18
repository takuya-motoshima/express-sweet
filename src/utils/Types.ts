/**
 * Type checking utility class.
 * Provides static methods for runtime type validation.
 */
export default class Types {
  /**
   * Check if a function is async (returns a Promise).
   * @param {Function} value The function to check
   * @returns {boolean} True if async function, false otherwise
   * @example
   * ```js
   * Types.isAsyncFunction(async () => {}); // true
   * Types.isAsyncFunction(() => {}); // false
   * ```
   */
  static isAsyncFunction(value: Function): boolean {
    return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
  }

  /**
   * Check if a value is a non-empty string.
   * @param {any} value The value to check
   * @returns {boolean} True if non-empty string, false otherwise
   * @example
   * ```js
   * Types.isString('hello'); // true
   * Types.isString(''); // false
   * Types.isString(123); // false
   * ```
   */
  static isString(value: any): boolean {
    return typeof value === 'string' && value !== '';
  }
}