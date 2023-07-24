/**
 * Collection deletion error.
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
   * HTTP status code.
   * @type {number}
   */
  httpStatusCode: number;

  /**
   * @param {string} collectionId Collection ID.
   * @param {number} httpStatusCode HTTP status code.
   */
  constructor(collectionId: string, httpStatusCode: number) {
    super(`Deletion of face collection failed (Collection ID: ${collectionId}, HTTP status code: ${httpStatusCode})`);
    this.name = 'FaceCollectionDeletionFailed';
    this.collectionId = collectionId;
    this.httpStatusCode = httpStatusCode;
  }
}