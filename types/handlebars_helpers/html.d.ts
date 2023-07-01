/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{!-- results in: example.com/assets/style.css?1620526340463 --}}
 * {{cacheBusting '/assets/style.css' '//example.com'}}
 *
 * @param  {string} filePath Paths of Assets files such as CSS and JS in public directories.
 * @param  {string} baseUrl  Application Origin URL. The default is none (undefined).
 * @return {string}          Returns the Assets file path with the update date and time parameters.
 */
export declare function cacheBusting(filePath: string, baseUrl?: string): string;
