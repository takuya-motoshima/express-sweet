/**
 * Declare block race holders in layout.
 * Imported from {@link https://github.com/TryGhost/express-hbs|express-hbs}
 * @example
 * {{{block "pageScripts"}}}
 * @param {string} name Block Name.
 * @param {Handlebars.HelperOptions} options Helper Options.
 * @return {string} String.
 */
export declare const block: (this: any, name: string, options: Handlebars.HelperOptions) => any;
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
export declare const contentFor: (this: any, name: string, options: any) => void;
