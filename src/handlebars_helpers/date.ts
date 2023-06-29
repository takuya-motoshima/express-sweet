import utils from '~/utils';
import moment from 'moment';

/**
 * Use moment to format the date.
 *
 * @example
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}} => 2021/10/24
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}} => 2021/10/24
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}} => 2021/10/24
 *
 * @param {string}          format A format string based on moment.
 * @param {string}          date Date string to format.
 * @param {string|string[]} locale Language or language-country locale string (or array of strings) available in https://github.com/moment/moment/tree/develop/locale .
 * @returns {string}        Returns formatted date.
 */
export function formatDate(format: string, date: string, locale: string|string[]): string {
  format = utils.isString(format) ? format : '';
  if (utils.isString(locale) || utils.isArray(locale)) {
    const localeMoment = moment(date || new Date());
    localeMoment.locale(locale);
    return localeMoment.format(format);
  }
  // Use global moment and format with default locale.
  return moment(date || new Date()).format(format);
}