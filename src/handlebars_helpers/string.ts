import * as utils from '~/utils';

/**
 * Returns a new string with some or all matches of a pattern replaced by a replacement.
 * @param {string} value String.
 * @param {string} find The string to be replaced.
 * @param {string} replace The string to replace.
 * @returns {string} Character string after replacement.
 * @example
 * ```handlebars
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 * ```
 */
export const replace = (value: string, find: string, replace: string): string => {
  return value.replace(find, replace);
}

/**
 * Split `string` by the given `character`.
 * @param {string} value String.
 * @param {string} separator A character that delimits the substrings in this string. Default is a comma.
 * @returns {string[]} An Array of strings, split at each point where the separator occurs in the given string. The default is a comma.
 * @example
 * ```handlebars
 * {{split "a,b,c" ","}}
 * {{#each (split list ',')}}<div>{{this}}</div>{{/each}}
 * ```
 */
export const split = (value: string, separator: string): string[] => {
  if (!utils.isString(value))
    return [];
  if (!utils.isString(separator))
    separator = ',';
  return value.split(separator);
}

/**
 * Convert bytes to just the right units(KB, MB, GB, TB, PB, EB, ZB, YB).
 * @param {number} bytes Bytes.
 * @param {number} decimals Number of decimal places to display. Default is 0.
 * @returns {string} Returns a value with units.
 * @example
 * ```handlebars
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
 * ```
 */
export const formatBytes = (bytes: number, decimals: number = 0): string => {
  let result = 0;
  let unit = 'Bytes';
  if (bytes && bytes > 0) {
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];
    result = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }
  return `${result}${unit}`;
}