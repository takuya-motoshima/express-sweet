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
    // Load the config.
    const config = <Config>Object.assign({
      env_path: undefined
    }, fs.existsSync(`${process.cwd()}/config/config.js`) ? require(`${process.cwd()}/config/config`) : {});

    // Exit if there is no .env path.
    if (!config.env_path)
      return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(config.env_path!));
    for (let key in env) {
      console.log(`Set ${key} in process.env`);
      process.env[key] = env[key]
    }
  }
}