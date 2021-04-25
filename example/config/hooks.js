/**
 * Express Sweet’s Hooks feature provides a means to tap into and modify the inner workings of the framework without hacking the core files.
 */
module.exports = {
  /**
   * Rewrite baseUrl set in app.locals, defaults to referrer origin (eg https://example.com).
   * @type {(baseUrl: string): string}
   */
  rewrite_base_url: (baseUrl) => baseUrl
}