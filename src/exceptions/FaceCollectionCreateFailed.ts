/**
 * Face collection creation failed.
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
    super(`Creation of face collection failed (Collection ID: ${collectionId}, HTTP status code: ${httpStatusCode})`);
    this.name = 'FaceCollectionCreateFailed';
    this.collectionId = collectionId;
    this.httpStatusCode = httpStatusCode;
  }
}