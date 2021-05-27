/**
 * AWS Rekognition Client Optional Interface.
 */
export default interface  {
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
    /**
     * The region to send service requests to.
     * @type {string}
     */
    region: string;
    /**
     * Sets the socket to timeout after failing to establish a connection with the server after connectTimeout milliseconds.
     * The default is 5000 milliseconds.
     * @type {number}
     */
    timeout?: number;
}
