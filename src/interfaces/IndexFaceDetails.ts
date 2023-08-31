import FaceDetailsEmotions from '~/interfaces/FaceDetailsEmotions';

/**
 * Detail of indexed face.
 */
export default interface IndexFaceDetails {
  /**
   * A unique identifier assigned to the face.
   * @type {string}
   */
  faceId: string,

  /**
   * The estimated age range, in years, for the face. Low represents the lowest estimated age and High represents the highest estimated age.
   * @type {{high: number, low: number}}
   */
  ageRange: {
    high: number,
    low: number
  },

  /**
   * The predicted gender of a detected face. 
   * @type {'male'|'female'}
   */
  gender: 'male'|'female',

  /**
   * The emotions that appear to be expressed on the face, and the confidence level in the determination. 
   * @type {FaceDetailsEmotions}
   */
  emotions: FaceDetailsEmotions
}