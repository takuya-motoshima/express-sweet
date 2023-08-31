/**
 * Determine whether or not two values are equal (===).
 *
 * @example
 * {{!-- results in: false --}}
 * {{eq '3' 3}}
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
 * {{!-- results in: true --}}
 * {{eqw '3' 3}}
 *
 * {{#if (eqw foo 'bar')}}
 *   Hello
 * {/if}}
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
 * {{!-- results in: true --}}
 * {{neq 4 3}}
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
 * {{!-- results in: false --}}
 * {{neqw '3' 3}}
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
 * {{!-- results in: true --}}
 * {{lt 2 3}}
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
 * {{!-- results in: true --}}
 * {{lte 2 3}}
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
 * {{!-- results in: false --}}
 * {{gt 2 3}}
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
 * {{!-- results in: true --}}
 * {{gte 3 3}}
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
 * {{!-- results in: false --}}
 * {{not true}}
 *
 * {{!-- results in: true --}}
 * {{not false}}
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
 * {{!-- results in: foo --}}
 * {{ifx true 'foo' 'bar'}}
 *
 * {{!-- results in: bar --}}
 * {{ifx false 'foo' 'bar'}}
 *
 * {{!-- results in: 6 --}}
 * {{ifx (eq value 1) 5 6}}
 *
 * {{!-- results in: 6 --}}
 * {{ifx (not (eq value 1)) 5 6}}
 *
 * {{!-- The third parameter is optional, and by default it will be blank string ('') --}}
 * {{!-- results in: active --}}
 * {{ifx true 'active'}}
 *
 * {{!-- results in: '' --}}
 * {{ifx false 'active'}}
 *
 * @param   {boolean} condition Satisfying condition for getting first value. Either true of false.
 * @param   {any}     value1    First value to be displayed as result..
 * @param   {any}     value2    Second value to be displayed as result. Defaults to an empty string.
 * @returns {any}               Returns the result of the ternary operator.
 */
export declare function ifx(condition: boolean, value1: any, value2: any): any;
/**
 * Check if it is empty.
 * If the value is an array, returns true if there are no elements.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 *
 * @example
 * {{!-- results in: false --}}
 * {{empty [5, 6]}}
 *
 * {{#if (empty 'foo')}}
 *   Hello
 * {{/if}}
 *
 * {{!-- results in: false --}}
 * {{empty 'Hello'}}
 *
 * {{!-- results in: true --}}
 * {{empty ''}}
 *
 * {{!-- results in: true --}}
 * {{empty ' '}}
 *
 * @param   {any}     value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean}       Returns true if the value is empty, false otherwise.
 */
export declare function empty(value: any): boolean;
/**
 * Check that it is not empty.
 * If the value is an array, returns true if there is an element.
 * If the value is a string, the leading and trailing spaces are trimmed and then checked.
 *
 * @example
 * {{!-- results in: true --}}
 * {{notEmpty [5, 6]}}
 *
 * {{#if (notEmpty 'foo')}}
 *   Hello
 * {{/if}}
 *
 * {{!-- results in: true --}}
 * {{notEmpty 'Hello'}}
 *
 * {{!-- results in: false --}}
 * {{notEmpty ''}}
 *
 * {{!-- results in: false --}}
 * {{notEmpty ' '}}
 *
 * @param   {any}     value Character strings, arrays, objects, etc. to be checked.
 * @returns {boolean}       Returns true if the value is not empty, false otherwise.
 */
export declare function notEmpty(value: any): boolean;
/**
 * Determine the length of an array.
 *
 * @example
 * {{!-- results in: 2 --}}
 * {{count [5, 6]}}
 *
 * @param   {any[]}        items Array whose elements to be counted.
 * @returns {number|false}       Returns the length of the array if the value is an array, false if the value is not an array.
 */
export declare function count(items: any[]): number | false;
/**
 * Returns the boolean AND of two or more parameters passed i.e it is true iff all the parameters are true.
 *
 * @example
 * {{!-- results in: true --}}
 * {{and true true}}
 *
 * {{!-- results in: false --}}
 * {{and false true}}
 *
 * {{#if (and value1 value2)}}
 *   {{!-- do something --}}
 * {{else}}
 *   {{!-- do something else --}}
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
 * {{!-- results in: true --}}
 * {{or true false}}
 *
 * {{!-- results in: false --}}
 * {{or false false}}
 *
 * {{#if (or value1 value2)}}
 *   {{!-- do something --}}
 * {{else}}
 *   {{!-- do something else --}}
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
 * {{!-- results in: foo bar --}}
 * {{coalesce 'foo bar' 'foob' 'unknown'}}
 *
 * {{!-- results in: foob --}}
 * {{coalesce '' 'foob' 'unknown'}}
 *
 * @param   {...any} params Any number of parameters.
 * @returns {any}           Returns the first non-false element of the parameter.
 */
export declare function coalesce(...params: any[]): any;
/**
 * Returns boolean if the array contains the element strictly or non-strictly.
 *
 * @example
 * {{!-- results in: true --}}
 * {{includes [1, 2, 3] 2}}
 *
 * {{!-- results in: false --}}
 * {{includes [1, 2, 3] '2'}}
 *
 * {{!-- results in: false --}}
 * {{includes [1, 2, 3] '2' true}}
 *
 * {{!-- results in: true --}}
 * {{includes [1, 2, 3] '2' false}}
 *
 * {{#if (includes [1, 2, 3] '2')}}
 *    {{!-- Do something --}}
 * {{/if}}
 *
 * {{ifx (includes [1, 2, 3] '2') 'yes' 'no'}}
 *
 * @param   {any[]}   items  The array.
 * @param   {any}     value  The value to be checked for existence in the array.
 * @param   {boolean} strict FALSE for non-strict checking. TRUE by default.
 * @returns {boolean}        Returns true if the array contains the specified value, false otherwise.
 */
export declare function includes(items: any[], value: any, strict?: boolean): boolean;
/**
 * Returns true if the given str matches the given regex.
 *
 * @example
 * {{!-- results in: true --}}
 * {{regexMatch 'foobar' 'foo'}}
 *
 * {{!-- results in: false --}}
 * {{regexMatch 'bar' 'foo'}}
 *
 * {{!-- results in: false --}}
 * {{regexMatch 'foobar' '^foo$'}}
 *
 * {{!-- results in: true --}}
 * {{regexMatch 'Visit Here' 'here' 'i'}}
 *
 * {{!-- results in: false --}}
 * {{regexMatch 'Visit Here' 'here'}}
 *
 * {{!-- results in: Match --}}
 * {{#if (regexMatch 'foobar' 'foo')}}
 *   Match
 * {{/if}}
 *
 * @param {string} val The string against which to match the regular expression.
 * @param {string} pattern The text of the regular expression.
 * @param {string} flags? Regular expression flags, such as global and case-insensitive searches. The default is none (undefined).
 * @returns {boolean} true if there is a match between the regular expression and the string str. Otherwise, false.
 */
export declare function regexMatch(val: string, pattern: string, flags?: string): boolean;
