import dotenv from 'dotenv';
import fs from 'fs';
import Config from '~/interfaces/Config';

/**
 * Set environment variables.
 * 
 * Read the environment variable file in options.path and set it in "process.env".
 */
export default class {
  /**
   * Mount on application.
   */
  public static mount() {
    // Get config.
    const config = require(`${process.cwd()}/config/config`) as Config;

    // Exit if there is no .env path.
    if (!config.env_path) return;

    console.log(`Load "${config.env_path}"`);

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(config.env_path));
    for (let key in env)
      process.env[key] = env[key]
  }
}