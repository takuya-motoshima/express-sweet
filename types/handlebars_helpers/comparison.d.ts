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
export declare function eq(value1: any, value2: any): boolean;
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
export declare function eqw(value1: any, value2: any): boolean;
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
export declare function neq(value1: any, value2: any): boolean;
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
export declare function neqw(value1: any, value2: any): boolean;
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
export declare function lt(value1: any, value2: any): boolean;
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
export declare function lte(value1: any, value2: any): boolean;
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
export declare function gt(value1: any, value2: any): boolean;
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
export declare function gte(value1: any, value2: any): boolean;
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
export declare function not(expression: any): boolean;
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
export declare function ifx(condition: boolean, value1: any, value2: any): any;
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
 * @param   {any[]}   items Array/object to be checked.
 * @returns {boolean}       Returns true if the array is empty, false otherwise.
 */
export declare function empty(items: any[]): boolean;
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
export declare function count(items: any[]): number | false;
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
export declare function and(...params: any[]): boolean;
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
export declare function or(...params: any[]): boolean;
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
export declare function coalesce(...params: any[]): any;
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
export declare function includes(items: any[], value: any, strict?: boolean): boolean;
