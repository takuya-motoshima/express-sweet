/**
 * Stringify an object using JSON.stringify.
 * @param {any} value The value to convert to a JSON string.
 * @param {number} indent The number of space characters to use as whitespace.
 * @returns {string} A JSON string representing the given value, or undefined.
 * @example
 * ```handlebars
 * {{jsonStringify val}}
 * ```
 */
export const jsonStringify = (value: any, indent: number|string = 0): string|undefined => {
  return JSON.stringify(value, null, indent);
}

/**
 * Parses the given string using JSON.parse.
 * @param {any} value Object to stringify.
 * @returns {any} JavaScript value or object described by a string.
 * @example
 * ```handlebars
 * {{jsonParse val}}
 * ```
 */
export const jsonParse = (value: any): any => {
  return JSON.parse(value);
}

