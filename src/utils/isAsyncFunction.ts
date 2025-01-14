/**
 * Returns true for asynchronous functions, false otherwise.
 * @param {any} value.
 * @return {boolean}
 * @example
 * utils.isAsyncFunction(async () => {});// true
 * utils.isAsyncFunction(() => {});// false
 */
export default (value: any): boolean => {
  return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
}