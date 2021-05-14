/**
 * Stringify an object using JSON.stringify.
 *
 * @example
 * {{json_stringify value}}
 *
  * @param  {any}     value  The value to convert to a JSON string.
  * @param  {number}  indent The number of space characters to use as whitespace.
  * @return {string}         A JSON string representing the given value, or undefined.
 */
export declare function json_stringify(value: any, indent?: number | string): string | undefined;
/**
 * Parses the given string using JSON.parse.
 *
 * @example
 * {{json_parse value}}
 *
  * @param  {any} value Object to stringify.
  * @return {any}       JavaScript value or object described by a string.
 */
export declare function json_parse(value: any): any;
