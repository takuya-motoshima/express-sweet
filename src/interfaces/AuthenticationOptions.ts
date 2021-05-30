import Model from '~/database/Model';

/**
 * User authentication configuration interface.
 */
export default interface {
  /**
   * Enable user authentication, defaults to disabled (false).
   * @type {boolean}
   */
  enabled: boolean,

  /**
   * Authentication user ID field name, defaults to `username`.
   * @type {string}
   */
  username: string,

  /**
   * Authentication password field name, defaults to `password`.
   * @type {string}
   */
  password: string,

  /**
   * URL to redirect after successful authentication, defaults to `/`.
   * @type {string}
   */
  success_redirect: string,

  /**
   * URL to redirect after log off, defaults to `/login`.
   * @type {string}
   */
  failure_redirect: string,

  /**
   * This hook is called when authenticating a user.
   * Please find the user information that owns the credentials based on the user name and password you received and return it.
   * If the user who owns the credentials cannot be found, return null.
   *
   * Note that the user information must include an ID value that can identify the user.
   * 
   * @example
   * 
   * @type {(username: string, password: string) => Promise<{[key: string]: any}|null>}
   */
  authentication_hook: (username: string, password: string) => Promise<{[key: string]: any}|null>,

  /**
   * This hook is called when user authentication is successful.
   * Find and return the authenticated user information to be set in the session based on the received user ID.
   * 
   * @type {(id: number|string) => Promise<{[key: string]: any}>}
   */
  subscribe_hook: (id: number|string) => Promise<{[key: string]: any}>,

  // /**
  //  * Model class used for authentication, this is a required field.
  //  * @type {typeof Model}
  //  */
  // model: typeof Model,

  /**
   * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
   * @type {string}
   */
  allow_unauthenticated: string[],

  /**
   * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
   * @type {number}
   */
  expiration: number
}