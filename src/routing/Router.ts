import express from 'express';
import createError from 'http-errors';
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
  static mount(app: express.Express) {
    // Get config.
    const config = Object.assign({
      router_dir: path.join(process.cwd(), 'routes'),
      default_router: undefined
    }, require(`${global.APP_DIR}/config/config`)) as Config;

    console.log(`Router directory: ${config.router_dir}`);
    console.log(`Default router: ${config.default_router}`);

    // Set the URL to route based on the path of the file in the routes directory.
    for (let filepath of File.find(`${config.router_dir}/**/*.js`)) {
      // Import router module.
      let router = require(filepath);

      // If the router module was exporting by default, there is a module in the default property.
      if (router.default) router = router.default;

      // Get the router directory name and file name respectively.
      const matches = filepath.match(/\/routes(?:(\/..*))?\/(..*)\.js/);
      if (!matches) continue;
      const [_, dir, filename] = matches;

      // Generate a URL from the directory and filename and map the module to the URL.
      const url = dir ? `${dir}/${filename.toLowerCase()}` : `/${filename.toLowerCase()}`;
      console.log(`Route ${url}`);
      app.use(url === config.default_router ? '/' : url, router);
    }

    // Catch 404 and forward to error handler.
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      next(createError(404));
    });

    // Error handler.
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // Set locals, only providing error in development.
      if (req.xhr) {
        res.status(err.status||500);
        res.json({error: err.message});
      } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // Render the error page.
        res.status(err.status||500);
        res.render('error');
      }
    });
  }
}