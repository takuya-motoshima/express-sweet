import fs from 'node:fs';
import path from 'node:path';
import striptags from 'striptags';

/**
 * Returns the Assets path containing the file update time parameter.
 * @param {string} filePath Paths of Assets files such as CSS and JS in public directories.
 * @param {string} baseUrl Application Origin URL. The default is none (undefined).
 * @return {string} Returns the Assets file path with the update date and time parameters.
 * @example
 * {{!-- results in: example.com/assets/style.css?1620526340463 --}}
 * {{cacheBusting '/assets/style.css' '//example.com'}}
 */
export const cacheBusting = (filePath: string, baseUrl?: string): string => {
  // Absolute path of file.
  const absolutePath = `${path.join(process.cwd(), 'public')}/${filePath.replace(/^\//, '')}`;

  // Exit if the file does not exist.
  if (!fs.existsSync(absolutePath))
    return filePath;

  // Returns the original file name with the file update time added.
  const mtime = (new Date(fs.statSync(absolutePath).mtime)).getTime();

  // Result URL.
  let url = '';

  // If there is a base URL, set it at the beginning of the result URL.
  if (baseUrl)
    url + baseUrl.replace(/\/$/, '');

  // Set the path of the desired file to the result URL.
  url += `/${filePath.replace(/^\//, '')}?${mtime}`;
  return url;
}

/**
 * Removes HTML tags from a string, optionally allowing specific tags.
 * @param {string} str The string to remove HTML tags from.
 * @param {string|string[]} allowedTags An array of allowed HTML tags. Default is an empty array.
 * @param {string} replacement The string to replace HTML tags with. Default is blank.
 * @return {string} The string with HTML tags removed.
 * @example
 * {{!-- results in: lorem ipsum dolor sit amet --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>'}}}
 * 
 * {{!-- results in: lorem ipsum <strong>dolor</strong> sit amet --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' '<strong>' ''}}}
 * 
 * {{!-- results in: 🍩lorem ipsum 🍩dolor🍩 🍩sit🍩 amet🍩 --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' [] '🍩'}}}
 */
export const stripTags = (str: string, allowedTags: string|string[] = [], replacement: string = ''): string => {
  return striptags(str, allowedTags, replacement);
}