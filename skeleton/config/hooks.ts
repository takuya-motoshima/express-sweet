/**
 * Express Sweet’s Hooks feature provides a means to tap into and modify the inner workings of the framework without hacking the core files.
 */
export default {
  /**
   * Rewrite baseUrl set in app.locals, defaults to referrer origin (eg https://example.com).
   * The default for app.locals.baseUrl is referrer origin (eg https://example.com).
   * @type {(baseUrl: string): string}
   */
  rewrite_base_url: (baseUrl: string): string => baseUrl
}