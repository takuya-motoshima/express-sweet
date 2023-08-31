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
 * {{!-- results in: ['a', 'b', 'c'] --}}
 * {{split "a,b,c" ","}}
 *
 * {{!-- results in: <div>a</div><div>b</div><div>c</div> --}}
 * {{#each (split list ',')}}
 *   <div>{{this}}</div>
 * {{/each}}
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
 * {{!-- results in: 1 KB --}}
 * {{formatBytes 1024}}
 *
 * {{!-- results in: 1.21 KB --}}
 * {{formatBytes 1234 2}}
 *
 * {{!-- results in: 1.205 KB --}}
 * {{formatBytes 1234 3}}
 *
 * {{!-- results in: 0 Bytes --}}
 * {{formatBytes 0}}
 *
 * @param   {number}  bytes     Bytes.
 * @param   {number}  decimals  Number of decimal places to display. Default is 0.
 * @returns {string}            Returns a value with units.
 */
export declare function formatBytes(bytes: number, decimals?: number): string;
