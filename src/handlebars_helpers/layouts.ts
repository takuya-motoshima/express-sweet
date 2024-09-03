/**
 * Cache the contents of the named block declared in layout.
 * @type {{[key: string]: any}}
 */
const blockCache: {[key: string]: any} = {};

/**
 * Defines content for a named block declared in layout.
 * @example
 * {{#contentFor "pageStylesheets"}}
 * <link rel="stylesheet" href='{{{URL "css/style.css"}}}' />
 * {{/contentFor}}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @param {any} context Context.
 */
const content = (name: string, options: Handlebars.HelperOptions, context: any): void => {
  const block = blockCache[name] || (blockCache[name] = []);
  block.push(options.fn(context));
}

/**
 * Declare block race holders in layout.
 * Imported from {@link https://github.com/TryGhost/express-hbs|express-hbs}
 * @example
 * {{{block "pageScripts"}}}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @return {string} String.
 */
export const block = (name: string, options: Handlebars.HelperOptions) => {
  let val = blockCache[name];
  if (val === undefined && typeof options.fn === 'function')
    val = options.fn(this);
  if (Array.isArray(val))
    val = val.join('\n'); 
  return val;
}

/**
 * Define block content within a page.
 * Imported from {@link https://github.com/TryGhost/express-hbs|express-hbs}
 * @example
 * {{#contentFor "pageScripts"}}
 *   CONTENT HERE
 * {{/contentFor}}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 */
export const contentFor = (name: string, options: any): void => {
  content(name, options, this);
}