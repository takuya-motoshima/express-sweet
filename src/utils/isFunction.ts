/**
 * Check if a value is a function (including async functions).
 * Returns true for both regular and async functions, false otherwise.
 * @param {any} value The value to check
 * @returns {boolean} Returns true if value is a function, false otherwise
 * @example
 * ```js
 * import isFunction from '~/utils/isFunction';
 * 
 * isFunction(() => {});           // true
 * isFunction(async () => {});     // true
 * isFunction(function() {});      // true
 * isFunction('');                 // false
 * isFunction({});                 // false
 * ```
 */
export default (value: any): boolean => {
  return value
    && value.constructor
    && (value.constructor === Object.getPrototypeOf(function(){}).constructor || value.constructor === Object.getPrototypeOf(async function(){}).constructor);
}