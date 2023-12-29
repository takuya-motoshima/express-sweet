/**
 * Check if param is an object.
 * @param {any} value Character strings, arrays, objects, etc. to be checked.
 * @return {boolean} Returns true if it is an object.
 */
export default (value: any): boolean => {
  return value != null && typeof value === 'object' && Array.isArray(value) === false;
}