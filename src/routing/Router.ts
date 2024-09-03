import express from 'express';
import {globSync} from 'glob';
import * as utils from '~/utils';

/**
 * Set up URL routing.
 * Define URL routing based on the path of the file in the routes directory.
 * For example, if you have "routes/api/users.js", you can request the method in "user.js (ts)" with the base URL as "https:////api/users".
 */
export default class {
  /**
   * Mount on application.
   * @param {express.Express} app Express application instance.
   * @return {Promise<void>}
   */
  static async mount(app: express.Express): Promise<void> {
    // Load configuration.
    const basicConfig = await utils.loadBasicConfig();

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filePath of globSync(`${basicConfig.router_dir}/**/*.js`, {nodir: false})) {
      // Import router module.
      const {default: router} = await import(filePath);

      // Get the router directory name and file name respectively.
      const matches = filePath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches)
        continue;
      const [_, dir, filename] = matches;

      // Generate a URL from the directory and filename and map the module to the URL.
      const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
      if (process.env.EXPRESS_DEBUG)
        console.log(`URL mapping ${url}`);
      app.use(url, router);
      if (url === basicConfig.default_router)
        // Set the default router to run when accessed with "/".
        app.use('/', router);
    }
  }
}