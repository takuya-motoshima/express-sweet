/**
  * Returns true for functions, false otherwise.
  * 
  * @example
  * utils.isFunction(() => {});// true
  * utils.isFunction(async () => {});// true
  * utils.isFunction('');// false
  * 
  * @param  {any} value
  * @return {boolean}
  */
export default (value: any): boolean => {
  return value
    && value.constructor
    && (value.constructor === Object.getPrototypeOf(function(){}).constructor || value.constructor === Object.getPrototypeOf(async function(){}).constructor);
}