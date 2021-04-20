/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
export default function (assetsPath: string, baseUrl: string): string;
