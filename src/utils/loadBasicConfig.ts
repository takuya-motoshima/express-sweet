import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import express from 'express';
import BasicConfig from '~/interfaces/BasicConfig';
const require = createRequire(import.meta.url);

/**
  * Get basic configuration (config/config).
  * @return {BasicConfig} Loaded configuration.
  */
export default (): BasicConfig => {
  // Options with default values set.
  const defaultOptions: BasicConfig = {
    env_path: undefined,
    cors_enabled: false,
    max_body_size: '100kb',
    router_dir: path.join(process.cwd(), 'routes'),
    default_router: undefined,
    rewrite_base_url: (baseUrl: string): string => baseUrl,
    is_ajax: (req: express.Request): boolean => {
      return !!req.xhr;
    },
    hook_handle_error: undefined,
  };

  // If the options file is not found, the default options are returned.
  const filePath = `${process.cwd()}/config/config`;
  if (!fs.existsSync(`${filePath}.js`))
    return defaultOptions;

  // If an options file is found, it returns options that override the default options.
  return Object.assign(defaultOptions, require(filePath).default||require(filePath));
}
