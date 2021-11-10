import express from 'express';
import {File} from 'nodejs-shared';
import path from 'path';
import Config from '~/interfaces/Config';
import fs from 'fs';

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
  public static mount(app: express.Express) {
    // Load options.
    const opts = this.loadOptions();

    // Debug routing options.
    console.log(`Router directory is ${opts.router_dir}`);
    console.log(`Default router is ${opts.default_router||'nothing'}`);

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filePath of File.find(`${opts.router_dir}/**/*.js`)) {
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
      console.log(`URL mapping ${url}`);
      app.use(url, router);

      // Set the default router to run when accessed with "/".
      if (url === opts.default_router)
        app.use('/', router);
    }
  }

  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  private static loadOptions(): Config {
    // Options with default values set.
    const defOpts: Config = {
      router_dir: path.join(process.cwd(), 'routes'),
      default_router: undefined
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defOpts, require(filePath).default||require(filePath));
  }
}