/**
 * Use moment to format the date.
 * @param {string} format A format string based on moment.
 * @param {string} date Date string to format.
 * @param {string|string[]} locale Language or language-country locale string (or array of strings) available in https://github.com/moment/moment/tree/develop/locale .
 * @return {string} Returns formatted date.
 * @example
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}}
 *
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}}
 *
 * {{!-- results in: 2021/10/24 --}}
 * {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}}
 */
export declare const formatDate: (format: string, date: string, locale: string | string[]) => string;
