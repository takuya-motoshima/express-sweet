  /**
   * Returns true for asynchronous functions, false otherwise.
   * 
   * @example
   * utils.isAsyncFunction(async () => {});// true
   * utils.isAsyncFunction(() => {});// false
   * 
   * @param  {Function} value
   * @return {boolean}
   */
export default (value: Function): boolean => {
  return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
}