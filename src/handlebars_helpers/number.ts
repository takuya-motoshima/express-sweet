import * as utils from '~/utils';

/**
 * Returns the language-sensitive representation of a number as a string.
 * @param {number|string} val Target number or numeric string.
 * @param {string|undefined} locales A string with a BCP 47 language tag, or an array of such strings.
 *                                   Corresponds to the <a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#locales">locales</a> parameter of the Intl.NumberFormat() constructor.
 *                                   In implementations without Intl.NumberFormat support, this parameter is ignored and the host's locale is usually used.
 * @returns {string} A string with a language-sensitive representation of the given number.
 * @example
 * ```handlebars
 * {{!-- results in: 123,456.789 --}}
 * {{number2locale 123456.789}}
 * 
 * {{!-- German uses comma as decimal separator and period for thousands. --}}
 * {{!-- results in: 123.456,789 --}}
 * {{number2locale 123456.789 'de-DE'}}
 * ```
 */
export const number2locale = (val: number|string, locales?: string): string => {
  // Convert string to number if needed
  if (utils.isString(val))
    val = Number(val);
  // Format number according to locale
  return val.toLocaleString(locales);
}