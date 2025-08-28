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
export declare const eq: (value1: any, value2: any) => boolean;
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
export declare const eqw: (value1: any, value2: any) => boolean;
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
export declare const neq: (value1: any, value2: any) => boolean;
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
export declare const neqw: (value1: any, value2: any) => boolean;
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
export declare const lt: (value1: any, value2: any) => boolean;
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
export declare const lte: (value1: any, value2: any) => boolean;
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
export declare const gt: (value1: any, value2: any) => boolean;
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
export declare const gte: (value1: any, value2: any) => boolean;
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
export declare const not: (expression: any) => boolean;
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
export declare const ifx: (condition: boolean, value1: any, value2: any) => any;
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
export declare const empty: (value: any) => boolean;
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
export declare const notEmpty: (value: any) => boolean;
/**
 * Determine the length of an array.
 * @param {any[]} items Array whose elements to be counted.
 * @returns {number|false} Returns the length of the array if the value is an array, false if the value is not an array.
 * @example
 * ```handlebars
 * {{count val}}
 * ```
 */
export declare const count: (items: any[]) => number | false;
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
export declare const and: (...params: any[]) => boolean;
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
export declare const or: (...params: any[]) => boolean;
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
export declare const coalesce: (...params: any[]) => any;
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
export declare const includes: (items: any[], value: any, strict?: boolean) => boolean;
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
export declare const regexMatch: (val: string, pattern: string, flags?: string) => boolean;
