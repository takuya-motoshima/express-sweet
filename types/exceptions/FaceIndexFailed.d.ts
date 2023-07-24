/**
 * Face indexing failed.
 */
export default class extends Error {
    /**
     * Error Name.
     * @type {string}
     */
    name: string;
    /**
     * Collection ID.
     * @type {string}
     */
    collectionId: string;
    /**
     * @param {string} collectionId Collection ID.
     * @param {number} httpStatusCode HTTP status code.
     */
    constructor(collectionId: string);
}
