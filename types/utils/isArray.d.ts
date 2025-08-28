/**
 * Check if a value is an array using Object.prototype.toString.
 * More reliable than instanceof Array for cross-frame scenarios.
 * @param {any} value The value to check
 * @returns {boolean} Returns true if value is an array, false otherwise
 * @example
 * ```js
 * import isArray from '~/utils/isArray';
 *
 * isArray([1, 2, 3]);     // true
 * isArray('hello');       // false
 * isArray({0: 'a', 1: 'b', length: 2}); // false (array-like object)
 * ```
 */
declare const _default: (value: any) => boolean;
export default _default;
