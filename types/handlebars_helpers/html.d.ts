/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}} => example.com/assets/style.css?1620526340463
 *
 * @param  {string} filePath Paths of Assets files such as CSS and JS in public directories.
 * @param  {string} baseUrl  Application Origin URL.
 * @return {string}          Returns the Assets file path with the update date and time parameters.
 */
export declare function cache_busting(filePath: string, baseUrl: string): string;
