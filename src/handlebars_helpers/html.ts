import fs from 'fs';
import path from 'path';

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
export function cache_busting(filePath: string, baseUrl: string): string {
  // Absolute path of file.
  const absolutePath = `${path.join(process.cwd(), 'public')}/${filePath.replace(/^\//, '')}`;

  // Exit if the file does not exist.
  if (!fs.existsSync(absolutePath))
    return filePath;

  // Returns the original file name with the file update time added.
  const mtime = (new Date(fs.statSync(absolutePath).mtime)).getTime();
  return `${baseUrl}/${filePath.replace(/^\//, '')}?${mtime}`;
}