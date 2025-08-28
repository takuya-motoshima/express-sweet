/**
 * Returns the Assets path containing the file update time parameter.
 * @param {string} filePath Paths of Assets files such as CSS and JS in public directories.
 * @param {string} baseUrl Application Origin URL. The default is none (undefined).
 * @returns {string} Returns the Assets file path with the update date and time parameters.
 * @example
 * ```handlebars
 * {{!-- results in: example.com/assets/style.css?1620526340463 --}}
 * {{cacheBusting '/assets/style.css' '//example.com'}}
 * ```
 */
export declare const cacheBusting: (filePath: string, baseUrl?: string) => string;
/**
 * Removes HTML tags from a string, optionally allowing specific tags.
 * @param {string} str The string to remove HTML tags from.
 * @param {string|string[]} allowedTags An array of allowed HTML tags. Default is an empty array.
 * @param {string} replacement The string to replace HTML tags with. Default is blank.
 * @returns {string} The string with HTML tags removed.
 * @example
 * ```handlebars
 * {{!-- results in: lorem ipsum dolor sit amet --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>'}}}
 *
 * {{!-- results in: lorem ipsum <strong>dolor</strong> sit amet --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' '<strong>' ''}}}
 *
 * {{!-- results in: 🍩lorem ipsum 🍩dolor🍩 🍩sit🍩 amet🍩 --}}
 * {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' [] '🍩'}}}
 * ```
 */
export declare const stripTags: (str: string, allowedTags?: string | string[], replacement?: string) => string;
