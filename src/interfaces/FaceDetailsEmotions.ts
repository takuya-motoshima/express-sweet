/**
 * The emotions that appear to be expressed on the face, and the confidence level in the determination. 
 */
export default interface FaceDetailsEmotions {
  /**
   * Confidence level of "disgusted" predicted from the face.
   * @type {number}
   */
  disgusted: number,

  /**
   * Confidence level of "happy" predicted from the face.
   * @type {number}
   */
  happy: number,

  /**
   * Confidence level of "surprised" predicted from the face.
   * @type {number}
   */
  surprised: number,

  /**
   * Confidence level of "angry" predicted from the face.
   * @type {number}
   */
  angry: number,

  /**
   * Confidence level of "confused" predicted from the face.
   * @type {number}
   */
  confused: number,

  /**
   * Confidence level of "calm" predicted from the face.
   * @type {number}
   */
  calm: number,

  /**
   * Confidence level of "sad" predicted from the face.
   * @type {number}
   */
  sad: number
}