/**
 * Stringify an object using JSON.stringify.
 * @param {any} value The value to convert to a JSON string.
 * @param {number} indent The number of space characters to use as whitespace.
 * @return {string} A JSON string representing the given value, or undefined.
 * @example
 * {{jsonStringify val}}
 */
export declare const jsonStringify: (value: any, indent?: number | string) => string | undefined;
/**
 * Parses the given string using JSON.parse.
 * @param {any} value Object to stringify.
 * @return {any} JavaScript value or object described by a string.
 * @example
 * {{jsonParse val}}
 */
export declare const jsonParse: (value: any) => any;
