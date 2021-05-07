/**
 * Returns the object as a JSON character.
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
 * Returns a JSON string as an object.
 *
 * @example
 * {{json_parse value}}
 *
  * @param  {any} value Object to stringify.
  * @return {any}       JavaScript value or object described by a string.
 */
export declare function json_parse(value: any): any;
