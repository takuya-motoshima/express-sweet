import fs from 'fs';
import path from 'path';

/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
export default function(assetsPath: string, baseUrl: string): string {
  const publicPath = path.join(process.cwd(), 'public');
  const realPath = `${publicPath}/${assetsPath.replace(/^\//, '')}`;
  if (!fs.existsSync(realPath))
    return assetsPath;
  const mtime = (new Date(fs.statSync(realPath).mtime)).getTime();
  return `${baseUrl}/${assetsPath.replace(/^\//, '')}?${mtime}`;
}