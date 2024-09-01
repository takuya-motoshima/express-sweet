import fs from 'node:fs';
import dotenv from 'dotenv';
import * as utils from '~/utils';

/**
 * Set environment variables.
 * Read the environment variable file in options.path and set it in "process.env".
 */
export default class {
  /**
   * Mount on application.
   */
  static mount() {
    // If you have already loaded env, do nothing.
    if (global.loadedEnv)
      return;

    // Load configuration.
    const basicConfig = utils.loadBasicConfig();

    // Exit if there is no .env path.
    if (!basicConfig.env_path)
      return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(basicConfig.env_path!));
    for (let key in env) {
      // console.log(`Read environment variable ${key}`);
      process.env[key] = env[key];
    }

    // Set read completion flag to prevent multiple reading of env.
    global.loadedEnv = true;
  }
}