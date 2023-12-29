import fs from 'fs';
import path from 'path';
import express from 'express';
import ViewConfig from '~/interfaces/ViewConfig';

/**
  * Get view configuration (config/view).
  * @return {ViewConfig} Loaded configuration.
  */
export default (): ViewConfig => {
  // Options with default values set.
  const defaultOptions: ViewConfig = {
    views_dir: path.join(process.cwd(), 'views'),
    partials_dir: path.join(process.cwd(), 'views/partials'),
    layouts_dir: path.join(process.cwd(), 'views/layout'),
    default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
    extension: '.hbs',
    beforeRender: (req: express.Request, res: express.Response) => {}
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/view`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // If an options file is found, it returns options that override the default options.
  return Object.assign(defaultOptions, require(filePath).default||require(filePath));
}