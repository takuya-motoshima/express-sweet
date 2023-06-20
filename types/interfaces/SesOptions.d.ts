/**
 * AWS SES Client Optional Interface.
 */
export default interface  {
    /**
     * API version in YYYYY-MM-DD format (or date).
     * Specify 'latest' to use the latest possible version.
     * The default is 'latest'.
     * @type {string}
     */
    apiVersion: string;
    /**
     * The region to send service requests to.
     * @type {string}
     */
    region: string;
    /**
     * Your AWS access key ID.
     * @type {string}
     */
    accessKeyId: string;
    /**
     * Your AWS secret access key.
     * @type {string}
     */
    secretAccessKey: string;
}
