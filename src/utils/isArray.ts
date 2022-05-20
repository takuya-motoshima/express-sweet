/**
 * Check if param is an array.
 *
 * @param {any} value
 * @returns {boolean}
 */
export default (value: any): boolean => {
  return Object.prototype.toString.call(value) === '[object Array]';
}
