import BoundingBox from '~/interfaces/BoundingBox';
import FaceDetailsEmotions from '~/interfaces/FaceDetailsEmotions';

/**
 * Details of each face found in the image. 
 */
export default interface {
  /**
   * Bounding box of the face.
   * @type {BoundingBox}
   */
  boundingBox: BoundingBox,

  /**
   * The estimated age range, in years, for the face. Low represents the lowest estimated age and High represents the highest estimated age.
   * @type {{high: UInteger, low: UInteger}}
   */
  ageRange?: {
    high: UInteger,
    low: UInteger
  },

  /**
   * The predicted gender of a detected face. 
   * @type {'male'|'female'}
   */
  gender?: 'male'|'female',

  /**
   * The emotions that appear to be expressed on the face, and the confidence level in the determination. 
   * @type {FaceDetailsEmotions}
   */
  emotions?: FaceDetailsEmotions
}