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
export declare const jsonStringify: (value: any, indent?: number | string) => string | undefined;
/**
 * Parses the given string using JSON.parse.
 * @param {any} value JSON string to parse.
 * @returns {any} JavaScript value or object described by the string.
 * @example
 * ```handlebars
 * {{jsonParse val}}
 * ```
 */
export declare const jsonParse: (value: any) => any;
