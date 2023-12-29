/**
 * Calculates the sum of two numbers.
 * @example
 * {{!-- results in: 3 --}}
 * {{add 1 2}}
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @return {number}
 */
export function add(val1: number|string, val2: number|string): number {
  return Number(val1) + Number(val2);
}

/**
 * Calculates the difference of the given values.
 * @example
 * {{!-- results in: 3 --}}
 * {{sub 5 2}}
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @return {number}
 */
export function sub(val1: number|string, val2: number|string): number {
  return Number(val1) - Number(val2);
}

/**
 * Calculate the multiplication of the given values.
 * @example
 * {{!-- results in: 10 --}}
 * {{multiply 5 2}}
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @return {number}
 */
export function multiply(val1: number|string, val2: number|string): number {
  return Number(val1) * Number(val2);
}

/**
 * Compute the division of the given values.
 * @example
 * {{!-- results in: 5 --}}
 * {{divide 10 2}}
 * @param {number|string} val1 The first number.
 * @param {number|string} val2 The second number.
 * @return {number}
 */
export function divide(val1: number|string, val2: number|string): number {
  return Number(val1) / Number(val2);
}

/**
 * Round up the value.
 * @example
 * {{!-- results in: 6 --}}
 * {{ceil 5.6}}
 * @param {number|string} val Number to be rounded to nearest greater integer.
 * @return {number}
 */
export function ceil(val: number|string): number {
  return Math.ceil(Number(val));
}

/**
 * Rounds down a number.
 * @example
 * {{!-- results in: 5 --}}
 * {{floor 5.6}}
 * @param {number|string} val Number to be rounded to nearest lower integer.
 * @return {number}
 */
export function floor(val: number|string): number {
  return Math.floor(Number(val));
}

/**
 * Returns an absolute value.
 * @example
 * {{!-- results in: 5.6 --}}
 * {{abs -5.6}}
 * @param {number} val Number to perform absolute value operation on.
 * @return {number}
 */
export function abs(val: number|string): number {
  return Math.abs(Number(val));
}