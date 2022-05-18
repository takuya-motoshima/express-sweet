const UserModel = require('../models/UserModel');


/**
 * User authentication configuration interface.
 */
module.exports = {
  /**
   * Enable user authentication, defaults to disabled (false).
   * @type {boolean}
   */
  enabled: true,

  /**
   * The session store instance, defaults to a new MemoryStore(memory) instance.
   * @type {'memory|redis'}
   */
  session_store: 'memory',

  /**
   * Authentication user ID field name, defaults to `username`.
   * @type {string}
   */
  username: 'email',

  /**
   * Authentication password field name, defaults to `password`.
   * @type {string}
   */
  password: 'password',

  /**
   * URL to redirect after successful authentication, defaults to `/`.
   * @type {string}
   */
  success_redirect: '/',

  /**
   * URL to redirect after log off, defaults to `/login`.
   * @type {string}
   */
  failure_redirect: '/login',

  /**
   * This hook is called when authenticating a user.
   * Please find the user information that owns the credentials based on the user name and password you received and return it.
   * If the user who owns the credentials cannot be found, return null.
   *
   * Note that the user information must include an ID value that can identify the user.
   * 
   * @type {(username: string, password: string) => Promise<{[key: string]: any}|null>}
   */
  authenticate_user: async (username, password) => {
    return UserModel.findOne({
      where: {
        email: username,
        password: password
      },
      raw: true
    });
  },

  /**
   * This hook is called when user authentication is successful.
   * Please search and return the authenticated user information to be set in the session based on the user ID of the parameter.
   * The returned data will be set in the req.user property and the view's session variable.
   * 
   * @type {(id: number|string) => Promise<{[key: string]: any}>}
   */
  subscribe_user: async (id) => {
    return UserModel.findOne({
      where: {id},
      raw: true
    });
  },

  /**
   * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
   * @type {(string|RegExp)[]}
   */
  allow_unauthenticated: ['/api'],

  /**
   * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
   * @type {number}
   */
  expiration: 24 * 3600000
}