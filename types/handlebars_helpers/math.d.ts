/**
 * Calculates the sum of two numbers.
 *
 * @example
 * {{!-- results in: 3 --}}
 * {{add 1 2}}
 *
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 */
export declare function add(val1: number | string, val2: number | string): number;
/**
 * Calculates the difference of the given values.
 *
 * @example
 * {{!-- results in: 3 --}}
 * {{sub 5 2}}
 *
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 */
export declare function sub(val1: number | string, val2: number | string): number;
/**
 * Calculate the multiplication of the given values.
 *
 * @example
 * {{!-- results in: 10 --}}
 * {{multiply 5 2}}
 *
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 */
export declare function multiply(val1: number | string, val2: number | string): number;
/**
 * Compute the division of the given values.
 *
 * @example
 * {{!-- results in: 5 --}}
 * {{divide 10 2}}
 *
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @returns {number}
 */
export declare function divide(val1: number | string, val2: number | string): number;
/**
 * Round up the value.
 *
 * @example
 * {{!-- results in: 6 --}}
 * {{ceil 5.6}}
 *
 * @param {number|string} val Number to be rounded to nearest greater integer.
 * @returns {number}
 */
export declare function ceil(val: number | string): number;
/**
 * Rounds down a number.
 *
 * @example
 * {{!-- results in: 5 --}}
 * {{floor 5.6}}
 *
 * @param {number|string} val Number to be rounded to nearest lower integer.
 * @returns {number}
 */
export declare function floor(val: number | string): number;
/**
 * Returns an absolute value.
 *
 * @example
 * {{!-- results in: 5.6 --}}
 * {{abs -5.6}}
 *
 * @param {number} val Number to perform absolute value operation on.
 * @returns {number}
 */
export declare function abs(val: number | string): number;
