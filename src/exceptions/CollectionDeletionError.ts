/**
 * Collection deletion error.
 */
export default class extends Error {
  /**
   * @type {string}
   */
  public name: string;

  /**
   * @param {string} message Error message.
   */
  constructor(message: string) {
    super(message);
    this.name = 'CollectionDeletionError';
  }
}