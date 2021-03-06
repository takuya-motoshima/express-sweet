import utils from '~/utils';

/**
 * Determine whether or not two values are equal (===).
 *
 * @example
 * {{eq '3' 3}} => false
 * 
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param   {any}     value1 First value to be compared with second.
 * @param   {any}     value2 Second value to be compared with first.
 * @returns {boolean}        Returns true if the value and type are the same, false if they are different.
 */
export function eq(value1: any, value2: any): boolean {
  return value1 === value2;
}

/**
 * Determine whether or not two values are equal (==) i.e weak checking.
 *
 * @example
 * {{eqw '3' 3}} => true
 * 
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 *
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the values are the same, false if they are different.
 */
export function eqw(value1: any, value2: any): boolean {
  return value1 == value2;
}

/**
 * Determine whether or not two values are not equal (!==).
 *
 * @example
 * {{neq 4 3}} => true
 *
 * {{#if (neq foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the value and type are different, false if they are the same.
 */
export function neq(value1: any, value2: any): boolean {
  return value1 !== value2;
}

/**
 * Determine whether or not two values are not equal (!=) weak checking.
 *
 * @example
 * {{neqw '3' 3}} => false
 *
 * {{#if (neqw foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the values are different, false if they are the same.
 */
export function neqw(value1: any, value2: any): boolean {
  return value1 != value2;
}

/**
 * Check for less than condition (a < b).
 *
 * @example
 * {{lt 2 3}} => true
 *
 * {{#if (lt 2 5)}}
 *   Hello
 * {{/if}}
 * 
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the first value is less than the second value, false otherwise.
 */
export function lt(value1: any, value2: any): boolean {
  return value1 < value2;
}

/**
 * Check for less than or equals condition (a <= b).
 *
 * @example
 * {{lte 2 3}} => true
 * 
 * {{#if (lte 2 5)}}
 *   Hello
 * {{/if}}
 *
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the first value is less than or equal to the second value, false otherwise.
 */
export function lte(value1: any, value2: any): boolean {
  return value1 <= value2;
}

/**
 * Check for greater than condition (a > b).
 *
 * @example
 * {{gt 2 3}} => false
 * 
 * {{#if (gt 5 6)}}
 *   Hello
 * {{/if}}
 *
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the first value exceeds the second value, false otherwise.
 */
export function gt(value1: any, value2: any): boolean {
  return value1 > value2;
}

/**
 * Check for greater than or equals condition (a >= b).
 *
 * @example
 * {{gte 3 3}} => true
 *
 * {{#if (gte 10 2)}}
 *   Hello
 * {{/if}}
 * 
 * @param   {any}       value1 First value to be compared with second.
 * @param   {any}       value2 Second value to be compared with first.
 * @returns {boolean}          Returns true if the first value is greater than or equal to the second value, false otherwise.
 */
export function gte(value1: any, value2: any): boolean {
  return value1 >= value2;
}
/**
 * Logical NOT of any expression.
 *
 * @example
 * {{not true}} => false
 * {{not false}} => true
 * 
 * {{#if (not (eq foo 'bar'))}}
 *   Hello
 * {{/if}}
 *
 * @param   {any}     expression Any expression.
 * @returns {boolean}            Returns the logical negation of the value.
 */
export function not(expression: any): boolean {
  return !expression;
}

/**
 * Helper to imitate the ternary '?:' conditional operator.
 *
 * @example
 * {{ifx true 'Foo' 'Bar'}} => Foo
 * {{ifx false 'Foo' 'Bar'}} => Foo
 * {{ifx (eq value 1) 5 6}} => 6    // return (value === 1) ? 5 : 6
 * {{ifx (not (eq value 1)) 5 6}} => 6    // return (value !== 1) ? 5 : 6
 * 
 * <!-- The third parameter is optional, and by default it will be blank string ('') -->
 * {{ifx true 'active'}} => 'active'
 * {{ifx false 'active'}} => ''
 * 
 * @param   {boolean} condition Satisfying condition for getting first value. Either true of false.
 * @param   {any}     value1    First value to be displayed as result..
 * @param   {any}     value2    Second value to be displayed as result. Defaults to an empty string.
 * @returns {any}               Returns the result of the ternary operator.
 */
export function ifx(condition: boolean, value1: any, value2: any): any {
  // Check if user has omitted the last parameter
  // if that's the case, it would be the Handlebars options object
  // which it sends always as the last parameter.
  if (utils.isObject(value2) && value2.name === 'ifx' && value2.hasOwnProperty('hash'))
    // This means the user has skipped the last parameter,
    // so we should return an empty string ('') in the else case instead.
    value2 = '';
  return condition ? value1 : value2;
}

/**
 * Check if it is empty.
 * If the value is an array, returns true if there are no elements.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 *
 * @example
 * // If the value is an array.
 * let value = [5, 6];
 * {{empty value}} => false
 * 
 * {{#if (empty value)}}
 *   Hello
 * {{/if}}
 * 
 * // If the value is a string.
 * let value = 'Hello';
 * {{empty value}} => false
 *
 * let value = '';
 * {{empty value}} => true
 *
 * let value = ' ';
 * {{empty value}} => true
 * 
 * @param   {any}     value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean}       Returns true if the value is empty, false otherwise.
 */
export function empty(value: any): boolean {
  if (typeof value === 'string')
    // Trim if it's a string.
    value = value.replace(/^[\s???]+|[\s???]+$/g, ''); 
  else if (Array.isArray(value) && value.length === 0)
    // Replace value with null if it is an array and has no elements.
    value = null;
  return !!!value;
}

/**
 * Check that it is not empty.
 * If the value is an array, returns true if there is an element.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 *
 * @example
 * // If the value is an array.
 * let value = [5, 6];
 * {{not_empty value}} => true
 * 
 * {{#if (not_empty value)}}
 *   Hello
 * {{/if}}
 * 
 * // If the value is a string.
 * let value = 'Hello';
 * {{not_empty value}} => true
 *
 * let value = '';
 * {{not_empty value}} => false
 *
 * let value = ' ';
 * {{not_empty value}} => false
 * 
 * @param   {any}     value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean}       Returns true if the value is not empty, false otherwise.
 */
export function not_empty(value: any): boolean {
  if (typeof value === 'string')
    // Trim if it's a string.
    value = value.replace(/^[\s???]+|[\s???]+$/g, ''); 
  else if (Array.isArray(value) && value.length === 0)
    // Replace value with null if it is an array and has no elements.
    value = null;
  return !!value;
}

// /**
//  * Check if an array is empty.
//  *
//  * @example
//  * let items = [5, 6];
//  * {{empty items}} => false
//  * 
//  * {{#if (empty items)}}
//  *   Hello
//  * {{/if}}
//  * 
//  * @param   {any[]}   items Array/object to be checked.
//  * @returns {boolean}       Returns true if the array is empty, false otherwise.
//  */
// export function empty(items: any[]): boolean {
//   if (!Array.isArray(items))
//     return true;
//   return items.length === 0;
// }

/**
 * Determine the length of an array.
 *
 * @example
 * let items = [5, 6];
 * {{count items}} =>  2
 *
 * @param   {any[]}        items Array whose elements to be counted.
 * @returns {number|false}       Returns the length of the array if the value is an array, false if the value is not an array.
 */
export function count(items: any[]): number|false {
  if (!Array.isArray(items))
    return false;
  return items.length;
}

/**
 * Returns the boolean AND of two or more parameters passed i.e it is true iff all the parameters are true.
 *
 * @example
 * let value1 = value2 = true;
 * {{and value1 value2}} => true
 * 
 * let value1 = false, value2 = true;
 * {{and value1 value2}} => false
 * 
 * {{#if (and value1 value2)}}
 *   // do something
 * {{else}}
 *   // do something else
 * {{/if}}
 * 
 * @param   {...any}    params Any number of boolean parameters.
 * @returns {boolean}          Returns the result of the logical product.
 */
export function and(...params: any[]): boolean {
  // Ignore the object appended by handlebars.
  if (utils.isObject(params[params.length-1]))
    params.pop();
  for (let param of params)
    if (!param) return false;
  return true;
}

/**
 * Returns the boolean OR of two or more parameters passed i.e it is true if any of the parameters is true.
 *
 * @example
 * let value1 = true, value2 = false;
 * {{or value1 value2}} => true
 * 
 * let value = value2 = false;
 * {{or value1 value2}} => false
 * 
 * {{#if (or value1 value2)}}
 *   // do something
 * {{else}}
 *   // do something else
 * {{/if}}
 *
 * @param   {...any}  params Any number of boolean parameters.
 * @returns {boolean}        Returns the result of the OR.
 */
export function or(...params: any[]): boolean {
  // Ignore the object appended by handlebars.
  if (utils.isObject(params[params.length-1]))
    params.pop();
  for (let param of params)
    if (param) return true;
  return false;
}

/**
 * Returns the first non-falsy value from the parameter list.
 * Works quite similar to the SQL's "COALESCE()" function, but unlike this checks for the first non-false parameter.
 *
 * @example
 * let fullName = 'Foo Bar', nickName = 'foob';
 * {{coalesce fullName nickName 'Unknown'}} => 'Foo Bar'
 *
 * let fullName = '', nickName = 'foob';
 * {{coalesce fullName nickName 'Unknown'}} => 'foob'
 *
 * @param   {...any} params Any number of parameters.
 * @returns {any}           Returns the first non-false element of the parameter.
 */
export function coalesce(...params: any[]): any {
  // Ignore the object appended by handlebars.
  if (utils.isObject(params[params.length-1])) params.pop();
  for (let param of params)
    if (param)
      return param;
  return params.pop();
}

/**
 * Returns boolean if the array contains the element strictly or non-strictly.
 *
 * @example
 * let items = [1, 2, 3];
 * let value = 2;
 * 
 * {{includes items value}} => true
 * 
 * let value = '2'
 * {{includes items value}} => false
 * {{includes items value true}} => false
 * {{includes items value false}} => true
 * 
 * {{#if (includes items value)}}
 *    <!-- Do something -->
 * {{/if}}
 * 
 * {{ifx (includes items value) 'Yes' 'No'}}
 *
 * @param   {any[]}   items  The array.
 * @param   {any}     value  The value to be checked for existence in the array.
 * @param   {boolean} strict FALSE for non-strict checking. TRUE by default.
 * @returns {boolean}        Returns true if the array contains the specified value, false otherwise.
 */
export function includes(items: any[], value: any, strict: boolean = true): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  for (let item of items)
    if (strict && item === value || !strict && item == value)
      return true;
  return false;
}