/**
 * Check if a value is specifically an async function.
 * Returns true only for async functions, false for regular functions and other values.
 * @param {any} value The value to check
 * @returns {boolean} Returns true if value is an async function, false otherwise
 * @example
 * ```js
 * import isAsyncFunction from '~/utils/isAsyncFunction';
 * 
 * isAsyncFunction(async () => {});     // true
 * isAsyncFunction(() => {});           // false
 * isAsyncFunction(function() {});      // false
 * isAsyncFunction('');                 // false
 * ```
 */
export default (value: any): boolean => {
  return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
}