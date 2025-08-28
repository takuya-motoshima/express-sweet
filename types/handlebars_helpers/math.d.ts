/**
 * Calculates the sum of two numbers.
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 * @example
 * ```handlebars
 * {{add 1 2}}
 * ```
 */
export declare const add: (val1: number | string, val2: number | string) => number;
/**
 * Calculates the difference of the given values.
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 * @example
 * ```handlebars
 * {{sub 5 2}}
 * ```
 */
export declare const sub: (val1: number | string, val2: number | string) => number;
/**
 * Calculate the multiplication of the given values.
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 * @example
 * ```handlebars
 * {{multiply 5 2}}
 * ```
 */
export declare const multiply: (val1: number | string, val2: number | string) => number;
/**
 * Compute the division of the given values.
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 * @example
 * ```handlebars
 * {{divide 10 2}}
 * ```
 */
export declare const divide: (val1: number | string, val2: number | string) => number;
/**
 * Round up the value.
 * @param {number|string} val Number to be rounded to nearest greater integer.
 * @returns {number}
 * @example
 * ```handlebars
 * {{ceil 5.6}}
 * ```
 */
export declare const ceil: (val: number | string) => number;
/**
 * Rounds down a number.
 * @param {number|string} val Number to be rounded to nearest lower integer.
 * @returns {number}
 * @example
 * ```handlebars
 * {{floor 5.6}}
 * ```
 */
export declare const floor: (val: number | string) => number;
/**
 * Returns an absolute value.
 * @param {number} val Number to perform absolute value operation on.
 * @returns {number}
 * @example
 * ```handlebars
 * {{abs -5.6}}
 * ```
 */
export declare const abs: (val: number | string) => number;
