/**
 * Multiple faces in an image error.
 */
export default class extends Error {
  /**
   * @type {string}
   */
  name: string;

  /**
   * @param {string} message Error message.
   */
  constructor(message: string = 'Multiple faces were found in the image') {
    super(message);
    this.name = 'MultipleFacesInImageError';
  }
}