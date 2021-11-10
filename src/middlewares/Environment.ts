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
    // If you have already loaded env, do nothing.
    if (global.loadedEnv)
      return void console.log('env is already loaded, so do nothing');

    // Load options.
    const opts = this.loadOptions();
    // console.log(`env file path: ${opts.env_path||'undefined'}`);

    // Exit if there is no .env path.
    if (!opts.env_path)
      return;

    // Set environment variables in process.env.
    const env = dotenv.parse(fs.readFileSync(opts.env_path!));
    for (let key in env) {
      console.log(`Set ${key} in process.env`);
      process.env[key] = env[key]
    }

    console.log(`Environment name: ${process.env.NODE_ENV||'undefined'}`);

    // Set read completion flag to prevent multiple reading of env.
    global.loadedEnv = true;
  }

  /**
   * Returns the option.
   * 
   * @return {Config} option.
   */
  private static loadOptions(): Config {
    // Options with default values set.
    const defOpts: Config = {
      env_path: undefined
    };

    // If the options file is not found, the default options are returned.
    const filePath = `${process.cwd()}/config/config`;
    if (!fs.existsSync(`${filePath}.js`))
      return defOpts;

    // If an options file is found, it returns options that override the default options.
    return Object.assign(defOpts, require(filePath).default||require(filePath));
  }
}