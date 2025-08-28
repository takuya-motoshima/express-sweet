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
declare const _default: (value: any) => boolean;
export default _default;
