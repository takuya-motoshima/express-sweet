/**
 * Check if a value is a plain object (excludes arrays and null).
 * Returns true only for plain objects, false for arrays, null, or other types.
 * @param {any} value The value to check
 * @returns {boolean} Returns true if value is a plain object, false otherwise
 * @example
 * ```js
 * import isObject from '~/utils/isObject';
 *
 * isObject({});          // true
 * isObject({a: 1});      // true
 * isObject([]);          // false (array)
 * isObject(null);        // false
 * isObject('string');    // false
 * ```
 */
declare const _default: (value: any) => boolean;
export default _default;
