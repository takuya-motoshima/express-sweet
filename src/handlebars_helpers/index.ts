/**
 * Handlebars template helpers for Express Sweet.
 * 
 * Provides a comprehensive set of custom Handlebars helpers for array manipulation,
 * string operations, date formatting, mathematical operations, comparisons, and more.
 * These helpers are automatically registered with the Handlebars engine.
 * 
 * @module handlebars_helpers
 * @see {@link https://handlebarsjs.com/guide/ | Handlebars Guide}
 * @example
 * ```handlebars
 * // Using comparison helpers in templates
 * {{#if (eq status 'active')}}
 *   <span class="badge-active">Active</span>
 * {{/if}}
 * ```
 * 
 * @example
 * ```handlebars
 * // Using string helpers in templates
 * {{replace title 'old' 'new'}}
 * {{formatBytes fileSize 2}}
 * ```
 * 
 * @example
 * ```handlebars
 * // Using date helpers in templates
 * {{formatDate 'YYYY/MM/DD' createdAt}}
 * ```
 * 
 * @example
 * ```handlebars
 * // Using math helpers in templates
 * {{add price tax}}
 * {{multiply quantity unitPrice}}
 * ```
 */

/**
 * Array manipulation helpers (findObjectInArray)
 */
export * as array from './array';

/**
 * HTML processing helpers (cacheBusting, stripTags)
 */
export * as html from './html';

/**
 * Object utilities helpers (jsonStringify, jsonParse)
 */
export * as object from './object';

/**
 * String manipulation helpers (replace, split, formatBytes)
 */
export * as string from './string';

/**
 * Comparison and logic helpers (eq, neq, gt, lt, and, or, etc.)
 */
export * as comparison from './comparison';

/**
 * Date formatting helpers (formatDate)
 */
export * as date from './date';

/**
 * Number formatting helpers (number2locale)
 */
export * as number from './number';

/**
 * Mathematical operation helpers (add, sub, multiply, divide, etc.)
 */
export * as math from './math';

/**
 * Layout and template helpers (contentFor blocks)
 */
export * as layouts from './layouts';