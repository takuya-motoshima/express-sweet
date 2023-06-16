/**
 * Missing face in image error.
 */
export default class extends Error {
    /**
     * @type {string}
     */
    name: string;
    /**
     * @param {string} message Error message.
     */
    constructor(message?: string);
}
