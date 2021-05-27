/**
 * Collection face search results interface.
 */
export default interface {
  /**
   * A unique identifier assigned to the face.
   * @type {string}
   */
  faceId: string,

  /**
   * Bounding box of the face.
   * width  : Width of the bounding box as a ratio of the overall image width.
   * height : Height of the bounding box as a ratio of the overall image height.
   * left   : Left coordinate of the bounding box as a ratio of overall image width.
   * top    : Top coordinate of the bounding box as a ratio of overall image height.
   * @type {{width: number, height: number, left: number, top: number}}
   */
  boundingBox: {
    width: number,
    height: number,
    left: number,
    top: number
  },

  /**
   * Identifier that you assign to all the faces in the input image.
   * @type {string}
   */
  externalImageId?: string
}