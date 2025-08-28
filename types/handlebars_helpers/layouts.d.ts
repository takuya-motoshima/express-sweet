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
export declare const block: (this: any, name: string, options: Handlebars.HelperOptions) => any;
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
export declare const contentFor: (this: any, name: string, options: any) => void;
