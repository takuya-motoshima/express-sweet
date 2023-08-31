import express from 'express';
import {File} from 'nodejs-shared';
import * as utils from '~/utils';

/**
 * Set up URL routing.
 *
 * Define URL routing based on the path of the file in the routes directory.
 * For example, if you have "routes/api/users.js", you can request the method in "user.js (ts)" with the base URL as "https:////api/users".
 */
export default class {
  /**
   * Mount on application.
   */
  static mount(app: express.Express) {
    // Load configuration.
    const basicConfig = utils.loadBasicConfig();

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filePath of File.find(`${basicConfig.router_dir}/**/*.js`)) {
      // Import router module.
      let router = require(filePath);

      // If the router module was exporting by default, there is a module in the default property.
      if (router.default)
        router = router.default;

      // Get the router directory name and file name respectively.
      const matches = filePath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches) continue;
      const [_, dir, filename] = matches;

      // Generate a URL from the directory and filename and map the module to the URL.
      const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
      if (process.env.EXPRESS_DEBUG)
        console.log(`URL mapping ${url}`);
      app.use(url, router);

      // Set the default router to run when accessed with "/".
      if (url === basicConfig.default_router)
        app.use('/', router);
    }
  }
}