/**
 * Use moment to format the date.
 *
 * @example
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}}
 *
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}}
 *
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}}
 *
 * @param {string}          format A format string based on moment.
 * @param {string}          date Date string to format.
 * @param {string|string[]} locale Language or language-country locale string (or array of strings) available in https://github.com/moment/moment/tree/develop/locale .
 * @returns {string}        Returns formatted date.
 */
export declare function formatDate(format: string, date: string, locale: string | string[]): string;
