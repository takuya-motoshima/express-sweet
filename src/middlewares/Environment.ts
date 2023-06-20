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
  static mount() {
    // If you have already loaded env, do nothing.
    if (global.loadedEnv)
      return;

    // Load options.
    const options = this.#loadOptions();

    // Exit if there is no .env path.
    if (!options.env_path)
      return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(options.env_path!));
    for (let key in env) {
      // console.log(`Read environment variable ${key}`);
      process.env[key] = env[key]
    }

    // Set read completion flag to prevent multiple reading of env.
    global.loadedEnv = true;
  }

  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  static #loadOptions(): Config {
    // Options with default values set.
    const defaultOptions: Config = {
      env_path: undefined
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defaultOptions;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defaultOptions, require(filePath).default||require(filePath));
  }
}