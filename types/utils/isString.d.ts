/**
 * Check if a value is a non-empty string.
 * Returns true only for strings with content, false for empty strings or other types.
 * @param {any} value The value to check
 * @returns {boolean} Returns true if value is a non-empty string, false otherwise
 * @example
 * ```js
 * import isString from '~/utils/isString';
 *
 * isString('hello');     // true
 * isString('');          // false (empty string)
 * isString(' ');         // true (space is content)
 * isString(123);         // false
 * isString(null);        // false
 * ```
 */
declare const _default: (value: any) => boolean;
export default _default;
