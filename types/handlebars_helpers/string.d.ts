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
 * @return {string}
 */
export declare function split(value: string, separator: string): string[];
