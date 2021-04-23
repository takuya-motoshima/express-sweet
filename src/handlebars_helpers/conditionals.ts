/**
 * Check if param is an object.
 *
 * @param {any} thing
 * @returns {boolean}
 */
function isObject(value: any): boolean {
  return value != null && typeof value === 'object' && Array.isArray(value) === false;
}

/**
 * Determine whether or not two values are equal (===).
 *
 * @example
 * {{eq '3' 3}}    => false
 * 
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export function eq(value1: any, value2: any): boolean {
  return value1 === value2;
}

/**
 * Determine whether or not two values are equal (==) i.e weak checking.
 *
 * @example
 * {{eqw '3' 3}}   => true
 * 
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {{/if}}
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
export function eqw(value1: any, value2: any): boolean {
  return value1 == value2;
}


/**
 * Determine whether or not two values are not equal (!==).
 *
 * @example
 * {{neq 4 3}}    => true
 *
 * {{#if (neq foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function neq(value1: any, value2: any): boolean {
  return value1 !== value2;
}

/**
 * Determine whether or not two values are not equal (!=) weak checking.
 *
 * @example
 * {{neqw '3' 3}}    => false
 *
 * {{#if (neqw foo 'bar')}}
 *   Hello
 * {{/if}}
 * 
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function neqw(value1: any, value2: any): boolean {
  return value1 != value2;
}

/**
 * Check for less than condition (a < b).
 *
 * @example
 * {{lt 2 3}}   => true
 *
 * {{#if (lt 2 5)}}
 *   Hello
 * {{/if}}
 * 
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function lt(value1: any, value2: any): boolean {
  return value1 < value2;
}

/**
 * Check for less than or equals condition (a <= b).
 *
 * @example
 * {{lte 2 3}}   => true
 * 
 * {{#if (lte 2 5)}}
 *   Hello
 * {{/if}}
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function lte(value1: any, value2: any): boolean {
  return value1 <= value2;
}

/**
 * Check for greater than condition (a > b).
 *
 * @example
 * {{gt 2 3}}   => false
 * 
 * {{#if (gt 5 6)}}
 *   Hello
 * {{/if}}
 *
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function gt(value1: any, value2: any): boolean {
  return value1 > value2;
}

/**
 * Check for greater than or equals condition (a >= b).
 *
 * @example
 * {{gte 3 3}}   => true
 *
 * {{#if (gte 10 2)}}
 *   Hello
 * {{/if}}
 * 
 * @param {any} value1
 * @param {any} value2
 * @returns {boolean}
 */
function gte(value1: any, value2: any): boolean {
  return value1 >= value2;
}
/**
 * Logical NOT of any expression.
 *
 * @example
 * {{not true}}    => false
 * {{not false}}   => true
 * 
 * {{#if (not (eq foo 'bar'))}}
 *   Hello
 * {{/if}}
 *
 * @param {any} expression
 * @returns {boolean}
 */
function not(expression: any): boolean {
  return !expression;
}

/**
 * Helper to imitate the ternary '?:' conditional operator.
 *
 * @example
 * {{ifx true 'Foo' 'Bar'}}    => Foo
 * {{ifx false 'Foo' 'Bar'}}   => Foo
 * {{ifx (eq value 1) 5 6}}        => 6    // return (value === 1) ? 5 : 6
 * {{ifx (not (eq value 1)) 5 6}}  => 6    // return (value !== 1) ? 5 : 6
 * 
 * <!-- The third parameter is optional, and by default it will be blank string ('') -->
 * {{ifx true 'active'}}  => 'active'
 * {{ifx false 'active'}}  => ''
 * 
 * @param {boolean} condition
 * @param {any} value1    Value to return when the condition holds true.
 * @param {any} value2    Value to return when the condition is false (Optional).
 * @returns {any}
 */
function ifx(condition: boolean, value1: any, value2: any): any {
  // Check if user has omitted the last parameter
  // if that's the case, it would be the Handlebars options object
  // which it sends always as the last parameter.
  if (isObject(value2) && value2.name === 'ifx' && value2.hasOwnProperty('hash'))
    // This means the user has skipped the last parameter,
    // so we should return an empty string ('') in the else case instead.
    value2 = '';
  return condition ? value1 : value2;
}

/**
 * Check if an array is empty.
 *
 * @example
 * let items = [5, 6];
 * {{empty items}} => false
 * 
 * {{#if (empty items)}}
 *   Hello
 * {{/if}}
 * 
 * @param {any[]} items
 * @returns {boolean}
 */
function empty(items: any[]): boolean {
  if (!Array.isArray(items)) return true;
  return items.length === 0;
}

/**
 * Determine the length of an array.
 *
 * @example
 * let items = [5, 6];
 * {{count items}} =>  2
 *
 * @param {any[]} items
 * @returns {boolean|number}
 */
function count(items: any[]): boolean|number {
  if (!Array.isArray(items)) return false;
  return items.length;
}

/**
 * Returns the boolean AND of two or more parameters passed i.e
 * it is true iff all the parameters are true.
 *
 * @example
 * let value1 = value2 = true;
 * {{and value1 value2}}    => true
 * 
 * let value1 = false, value2 = true;
 * {{and value1 value2}}    => false
 * 
 * {{#if (and value1 value2)}}
 *   // do something
 * {{else}}
 *   // do something else
 * {{/if}}
 * 
 * @param {...any} params
 * @returns {boolean}
 */
function and(...params: any[]): boolean {
  // Ignore the object appended by handlebars.
  if (isObject(params[params.length-1]))
    params.pop();
  for (let param of params)
    if (!param) return false;
  return true;
}

/**
 * Returns the boolean OR of two or more parameters passed i.e
 * it is true if any of the parameters is true.
 *
 * @example
 * let value1 = true, value2 = false;
 * {{or value1 value2}}    => true
 * 
 * let value = value2 = false;
 * {{or value1 value2}}    => false
 * 
 * {{#if (or value1 value2)}}
 *   // do something
 * {{else}}
 *   // do something else
 * {{/if}}
 *
 * @param {...any} params
 * @returns {boolean}
 */
function or(...params: any[]): boolean {
  // Ignore the object appended by handlebars.
  if (isObject(params[params.length-1]))
    params.pop();
  for (let param of params)
    if (param) return true;
  return false;
}

/**
 * Returns the first non-falsy value from the parameter list.
 * Works quite similar to the SQL's COALESCE() function, but unlike this
 * checks for the first non-false parameter.
 *
 * @example
 * let fullName = 'Foo Bar', nickName = 'foob';
 * {{coalesce fullName nickName 'Unknown'}}    => 'Foo Bar'
 *
 * let fullName = '', nickName = 'foob';
 * {{coalesce fullName nickName 'Unknown'}}    => 'foob'
 *
 * @param {...any} params
 * @returns {any}
 */
function coalesce(...params: any[]): any {
  // Ignore the object appended by handlebars.
  if (isObject(params[params.length-1]))
    params.pop();
  for (let param of params)
    if (param) return param;
  return params.pop();
}

/**
 * Returns boolean if the array contains the element strictly or non-strictly.
 *
 * @example
 * let items = [1, 2, 3];
 * let value = 2;
 * 
 * {{includes items value}}        => true
 * 
 * let value = '2'
 * {{includes items value}}        => false
 * {{includes items value true}}   => false
 * {{includes items value false}}  => true
 * 
 * {{#if (includes items value)}}
 *    <!-- Do something -->
 * {{/if}}
 * 
 * {{ifx (includes items value) 'Yes' 'No'}}
 *
 * @param {any[]} items
 * @param {any} value
 * @param {boolean} strict
 * @returns {boolean}
 */
function includes(items: any[], value: any, strict: boolean = true): boolean {
  if (!Array.isArray(items) || items.length === 0)
    return false;
  for (let item of items)
    if (strict && item === value || !strict && item == value) return true;
  return false;
}