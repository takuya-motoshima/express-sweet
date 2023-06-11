/**
 * Returns a new string with some or all matches of a pattern replaced by a replacement.
 *
 * @example
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 *
 * @param  {string} value   String.
 * @param  {string} find    The string to be replaced.
 * @param  {string} replace The string to replace.
 * @return {string}         Character string after replacement.
 */
export declare function replace(value: string, find: string, replace: string): string;
/**
 * Split `string` by the given `character`.
 *
 * @example
 * <!-- Basic usage. -->
 * {{split "a,b,c" ","}} => ['a', 'b', 'c']
 *
 * <!-- Use with EACH. -->
 * {{#each (split list ',')}}
 *   {{this}}<br>
 * {{/each}}
 * => a<br>
 *    b<br>
 *    c<br>
 *
 * @param  {string} value     String.
 * @param  {string} separator A character that delimits the substrings in this string. Default is a comma.
 * @return {string[]}         An Array of strings, split at each point where the separator occurs in the given string. The default is a comma.
 */
export declare function split(value: string, separator: string): string[];
/**
 * Convert bytes to just the right units(KB, MB, GB, TB, PB, EB, ZB, YB).
 *
 * @example
 * {{format_bytes 1024}} => 1 KB
 * {{format_bytes 1234 2}} => 1.21 KB
 * {{format_bytes 1234 3}} => 1.205 KB
 * {{format_bytes 0}} => 0 Bytes
 *
 * @param   {number}  bytes     Bytes.
 * @param   {number}  decimals  Number of decimal places to display. Default is 0.
 * @returns {string}            Returns a value with units.
 */
export declare function format_bytes(bytes: number, decimals?: number): string;
