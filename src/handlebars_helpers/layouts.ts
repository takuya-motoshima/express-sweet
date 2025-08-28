// /**
//  * Cache the contents of the named block declared in layout.
//  * @type {{[key: string]: any}}
//  */
// const blockCache: {[key: string]: any} = {};

/**
 * Defines content for a named block declared in layout.
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @param {any} context Context.
 * @example
 * ```handlebars
 * {{#contentFor "pageStylesheets"}}
 * <link rel="stylesheet" href='{{{URL "css/style.css"}}}' />
 * {{/contentFor}}
 * ```
 */
const content = (name: string, options: Handlebars.HelperOptions, context: any): void => {
  if (!context.blockCache)
    context.blockCache = {};
  const block = context.blockCache[name] || (context.blockCache[name] = []);
  // const block = blockCache[name] || (blockCache[name] = []);
  block.push(options.fn(context));
}

/**
 * Declare block race holders in layout.
 * Imported from {@link https://github.com/TryGhost/express-hbs|express-hbs}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @returns {string} String.
 * @example
 * ```handlebars
 * {{{block "pageScripts"}}}
 * ```
 */
export const block = function(this: any, name: string, options: Handlebars.HelperOptions) {
  let val = this.blockCache[name];
  // let val = blockCache[name];
  if (val === undefined && typeof options.fn === 'function')
    val = options.fn(this);
  if (Array.isArray(val))
    val = val.join('\n'); 
  return val;
}

/**
 * Define block content within a page.
 * Imported from {@link https://github.com/TryGhost/express-hbs|express-hbs}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @example
 * ```handlebars
 * {{#contentFor "pageScripts"}}
 *   CONTENT HERE
 * {{/contentFor}}
 * ```
 */
export const contentFor = function(this: any, name: string, options: any): void {
  content(name, options, this);
}