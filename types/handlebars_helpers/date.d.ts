/**
 * Use moment to format the date.
 *
 * @example
 * {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}} => 2021/10/24
 * {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}} => 2021/10/24
 * {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}} => 2021/10/24
 *
 * @param {string}          format A format string based on moment.
 * @param {string}          date Date string to format.
 * @param {string|string[]} locale Language or language-country locale string (or array of strings) available in https://github.com/moment/moment/tree/develop/locale .
 * @returns {string}        Returns formatted date.
 */
export declare function format_date(format: string, date: string, locale: string | string[]): string;
