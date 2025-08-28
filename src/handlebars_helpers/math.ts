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
export const add = (val1: number|string, val2: number|string): number => {
  return Number(val1) + Number(val2);
}

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
export const sub = (val1: number|string, val2: number|string): number => {
  return Number(val1) - Number(val2);
}

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
export const multiply = (val1: number|string, val2: number|string): number => {
  return Number(val1) * Number(val2);
}

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
export const divide = (val1: number|string, val2: number|string): number => {
  return Number(val1) / Number(val2);
}

/**
 * Round up the value.
 * @param {number|string} val Number to be rounded to nearest greater integer.
 * @returns {number}
 * @example
 * ```handlebars
 * {{ceil 5.6}}
 * ```
 */
export const ceil = (val: number|string): number => {
  return Math.ceil(Number(val));
}

/**
 * Rounds down a number.
 * @param {number|string} val Number to be rounded to nearest lower integer.
 * @returns {number}
 * @example
 * ```handlebars
 * {{floor 5.6}}
 * ```
 */
export const floor = (val: number|string): number => {
  return Math.floor(Number(val));
}

/**
 * Returns an absolute value.
 * @param {number} val Number to perform absolute value operation on.
 * @returns {number}
 * @example
 * ```handlebars
 * {{abs -5.6}}
 * ```
 */
export const abs = (val: number|string): number => {
  return Math.abs(Number(val));
}