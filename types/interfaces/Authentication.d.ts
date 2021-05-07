import Model from '~/database/Model';
/**
 * User authentication configuration interface.
 */
export default interface  {
    /**
     * Enable user authentication, defaults to disabled (false).
     * @type {boolean}
     */
    enabled?: boolean;
    /**
     * Authentication user ID field name, defaults to `username`.
     * @type {string}
     */
    username?: string;
    /**
     * Authentication password field name, defaults to `password`.
     * @type {string}
     */
    password?: string;
    /**
     * URL to redirect after successful authentication, defaults to `/`.
     * @type {string}
     */
    success_redirect?: string;
    /**
     * URL to redirect after log off, defaults to `/login`.
     * @type {string}
     */
    failure_redirect?: string;
    /**
     * Model class used for authentication, this is a required field.
     * @type {typeof Model}
     */
    model?: typeof Model;
    /**
     * URL without authentication. If the URL described in the access URL partially matches, authentication will not be performed, defaults to none.
     * @type {string}
     */
    allow_unauthenticated?: string[];
    /**
     * Authenticated user session expiration, defaults to 24 hours (24 * 3600000).
     * @type {number}
     */
    expiration?: number;
}
