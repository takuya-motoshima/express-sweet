import express from 'express';
import {File} from 'nodejs-shared';
import path from 'path';
import Config from '~/interfaces/Config';

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
  public static mount(app: express.Express, config: Config) {
    // Get config.
    config = Object.assign({
      router_dir: path.join(process.cwd(), 'routes'),
      default_router: undefined
    }, config);

    console.log(`Router directory is "${config.router_dir}"`);
    console.log(`Default router is "${config.default_router}"`);

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filePath of File.find(`${config.router_dir}/**/*.js`)) {
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
      console.log(`Set "${url}" to the routing URL`);
      app.use(url === config.default_router ? '/' : url, router);
    }
  }
}