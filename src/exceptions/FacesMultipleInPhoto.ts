/**
 * Faces are multiple in the photo.
 */
export default class extends Error {
  /**
   * Error Name.
   * @type {string}
   */
  name: string;

  constructor() {
    super('Faces are multiple in the picture');
    this.name = 'FacesMultipleInPhoto';
  }
}