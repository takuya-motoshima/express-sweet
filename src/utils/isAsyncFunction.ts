/**
  * Returns true for asynchronous functions, false otherwise.
  * 
  * @example
  * utils.isAsyncFunction(async () => {});// true
  * utils.isAsyncFunction(() => {});// false
  * 
  * @param  {any} value
  * @return {boolean}
  */
export default (value: any): boolean => {
  return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor;
}