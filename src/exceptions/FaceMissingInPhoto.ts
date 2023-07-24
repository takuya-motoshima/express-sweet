/**
 * Missing face in photo.
 */
export default class extends Error {
  /**
   * Error Name.
   * @type {string}
   */
  name: string;

  constructor() {
    super('Missing face in photo');
    this.name = 'FaceMissingInPhoto';
  }
}