import * as utils from '~/utils';

/**
 * Determine whether or not two values are equal (===).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the value and type are the same, false if they are different.
 * @example
 * ```handlebars
 * {{eq val1 val2}}
 * {{#if (eqw val1 val2)}}...{{/if}}
 * ```
 */
export const eq = (value1: any, value2: any): boolean => {
  return value1 === value2;
}

/**
 * Determine whether or not two values are equal (==) i.e weak checking.
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the values are the same, false if they are different.
 * @example
 * ```handlebars
 * {{eqw val1 val2}}
 * {{#if (eqw val1 val2)}}...{{/if}}
 * ```
 */
export const eqw = (value1: any, value2: any): boolean => {
  return value1 == value2;
}

/**
 * Determine whether or not two values are not equal (!==).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the value and type are different, false if they are the same.
 * @example
 * ```handlebars
 * {{neq val1 val2}}
 * {{#if (neq val1 val2)}}...{{/if}}
 * ```
 */
export const neq = (value1: any, value2: any): boolean => {
  return value1 !== value2;
}

/**
 * Determine whether or not two values are not equal (!=) weak checking.
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the values are different, false if they are the same.
 * @example
 * ```handlebars
 * {{neqw val1 val2}}
 * {{#if (neqw val1 val2)}}...{{/if}}
 * ```
 */
export const neqw = (value1: any, value2: any): boolean => {
  return value1 != value2;
}

/**
 * Check for less than condition (a < b).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the first value is less than the second value, false otherwise.
 * @example
 * ```handlebars
 * {{lt val1 val2}}
 * {{#if (lt val1 val2)}}...{{/if}}
 * ```
 */
export const lt = (value1: any, value2: any): boolean => {
  return value1 < value2;
}

/**
 * Check for less than or equals condition (a <= b).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the first value is less than or equal to the second value, false otherwise.
 * @example
 * ```handlebars
 * {{lte val1 val2}}
 * {{#if (lte val1 val2)}}...{{/if}}
 * ```
 */
export const lte = (value1: any, value2: any): boolean => {
  return value1 <= value2;
}

/**
 * Check for greater than condition (a > b).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the first value exceeds the second value, false otherwise.
 * @example
 * ```handlebars
 * {{gt val1 val2}}
 * {{#if (gt val1 val2)}}...{{/if}}
 * ```
 */
export const gt = (value1: any, value2: any): boolean => {
  return value1 > value2;
}

/**
 * Check for greater than or equals condition (a >= b).
 * @param {any} value1 First value to be compared with second.
 * @param {any} value2 Second value to be compared with first.
 * @returns {boolean} Returns true if the first value is greater than or equal to the second value, false otherwise.
 * @example
 * ```handlebars
 * {{gte val1 val2}}
 * {{#if (gte val1 val2)}}...{{/if}}
 * ```
 */
export const gte = (value1: any, value2: any): boolean => {
  return value1 >= value2;
}
/**
 * Logical NOT of any expression.
 * @param {any} expression Any expression.
 * @returns {boolean} Returns the logical negation of the value.
 * @example
 * ```handlebars
 * {{not val}}
 * {{#if (not (eq val1 val2))}}...{{/if}}
 * ```
 */
export const not = (expression: any): boolean => {
  return !expression;
}

/**
 * Helper to imitate the ternary '?:' conditional operator.
 * @param {boolean} condition Satisfying condition for getting first value. Either true of false.
 * @param {any} value1 First value to be displayed as result..
 * @param {any} value2 Second value to be displayed as result. Defaults to an empty string.
 * @returns {any} Returns the result of the ternary operator.
 * @example
 * ```handlebars
 * {{ifx true val1 val2}}
 * {{ifx false val1 val2}}
 * {{ifx (eq val1 val2) val3 val4}}
 * {{ifx (not (eq val1 val2)) val3 val4}}
 * {{ifx true val}}
 * {{ifx false val}}
 * ```
 */
export const ifx = (condition: boolean, value1: any, value2: any): any => {
  // Check if second parameter was omitted (Handlebars passes options object as last param)
  if (utils.isObject(value2) && value2.name === 'ifx' && value2.hasOwnProperty('hash'))
    // Use empty string as default for omitted else value
    value2 = '';
  return condition ? value1 : value2;
}

/**
 * Check if it is empty.
 * If the value is an array, returns true if there are no elements.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 * @param {any} value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean} Returns true if the value is empty, false otherwise.
 * @example
 * ```handlebars
 * {{empty val}}
 * {{#if (empty val)}}...{{/if}}
 * ```
 */
export const empty = (value: any): boolean => {
  if (typeof value === 'string')
    // Trim whitespace from strings before checking
    value = value.replace(/^[\s　]+|[\s　]+$/g, '');
  else if (Array.isArray(value) && value.length === 0)
    // Treat empty arrays as null
    value = null;
  return !!!value;
}

/**
 * Check that it is not empty.
 * If the value is an array, returns true if there is an element.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 * @param {any} value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean} Returns true if the value is not empty, false otherwise.
 * @example
 * ```handlebars
 * {{notEmpty val}}
 * {{#if (notEmpty val)}}...{{/if}}
 * ```
 */
export const notEmpty = (value: any): boolean => {
  if (typeof value === 'string')
    // Trim whitespace from strings before checking
    value = value.replace(/^[\s　]+|[\s　]+$/g, '');
  else if (Array.isArray(value) && value.length === 0)
    // Treat empty arrays as null
    value = null;
  return !!value;
}

/**
 * Determine the length of an array.
 * @param {any[]} items Array whose elements to be counted.
 * @returns {number|false} Returns the length of the array if the value is an array, false if the value is not an array.
 * @example
 * ```handlebars
 * {{count val}}
 * ```
 */
export const count = (items: any[]): number|false => {
  if (!Array.isArray(items))
    return false;
  return items.length;
}

/**
 * Returns the boolean AND of two or more parameters passed i.e it is true iff all the parameters are true.
 * @param {...any} params Any number of boolean parameters.
 * @returns {boolean} Returns the result of the logical product.
 * @example
 * ```handlebars
 * {{and val1 val2}}
 * {{#if (and val1 val2)}}...{{/if}}
 * ```
 */
export const and = (...params: any[]): boolean => {
  // Remove Handlebars options object from parameters
  if (utils.isObject(params[params.length-1]))
    params.pop();
  // Return false if any parameter is falsy
  for (let param of params)
    if (!param) return false;
  return true;
}

/**
 * Returns the boolean OR of two or more parameters passed i.e it is true if any of the parameters is true.
 * @param {...any}  params Any number of boolean parameters.
 * @returns {boolean} Returns the result of the OR.
 * @example
 * ```handlebars
 * {{or val1 val2}}
 * {{#if (or val1 val2)}}...{{/if}}
 * ```
 */
export const or = (...params: any[]): boolean => {
  // Remove Handlebars options object from parameters
  if (utils.isObject(params[params.length-1]))
    params.pop();
  // Return true if any parameter is truthy
  for (let param of params)
    if (param) return true;
  return false;
}

/**
 * Returns the first non-falsy value from the parameter list.
 * Works quite similar to the SQL's "COALESCE()" function, but unlike this checks for the first non-false parameter.
 * @param {...any} params Any number of parameters.
 * @returns {any} Returns the first non-false element of the parameter.
 * @example
 * ```handlebars
 * {{coalesce val1 val2}}
 * ```
 */
export const coalesce = (...params: any[]): any => {
  // Remove Handlebars options object from parameters
  if (utils.isObject(params[params.length-1])) params.pop();
  // Return first truthy value
  for (let param of params)
    if (param)
      return param;
  return params.pop();
}

/**
 * Returns boolean if the array contains the element strictly or non-strictly.
 * @param {any[]} items The array.
 * @param {any} value The value to be checked for existence in the array.
 * @param {boolean} strict FALSE for non-strict checking. TRUE by default.
 * @returns {boolean} Returns true if the array contains the specified value, false otherwise.
 * @example
 * ```handlebars
 * {{includes [1, 2, 3] 2}}
 * {{includes [1, 2, 3] 2 true}}
 * {{#if (includes [1, 2, 3] 2)}}...{{/if}}
 * {{ifx (includes [1, 2, 3] 2) true false}}
 * ```
 */
export const includes = (items: any[], value: any, strict: boolean = true): boolean => {
  if (!Array.isArray(items) || items.length === 0) return false;
  for (let item of items)
    if (strict && item === value || !strict && item == value)
      return true;
  return false;
}

/**
 * Returns true if the given str matches the given regex.
 * @param {string} val The string against which to match the regular expression.
 * @param {string} pattern The text of the regular expression.
 * @param {string} flags Regular expression flags, such as global and case-insensitive searches. The default is none (undefined).
 * @returns {boolean} true if there is a match between the regular expression and the string str. Otherwise, false.
 * @example
 * ```handlebars
 * {{regexMatch 'Hello, world!' 'Hello'}}
 * {{regexMatch 'Hello, world!' 'Hello' 'i'}}
 * {{#if (regexMatch 'Hello, world!' 'Hello')}}...{{/if}}
 * ```
 */
export const regexMatch = (val: string, pattern: string, flags?: string): boolean => {
  // Convert non-string values to string
  if (!utils.isString(val))
    val = val.toString();

  // Handle optional flags parameter (Handlebars may pass options object)
  if (utils.isObject(flags))
    flags = undefined;
  const regex = new RegExp(pattern, flags);
  return regex.test(val);
}