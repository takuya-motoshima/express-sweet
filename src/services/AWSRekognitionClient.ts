import fs from 'fs';
import AWS from 'aws-sdk';
import {File} from 'nodejs-shared';
import RekognitionOptions from '~/interfaces/RekognitionOptions';
import FaceMatch from '~/interfaces/FaceMatch';
import BoundingBox from '~/interfaces/BoundingBox';
import FaceDetails from '~/interfaces/FaceDetails';
import IndexFaceDetails from '~/interfaces/IndexFaceDetails';
import FaceDetailsEmotions from '~/interfaces/FaceDetailsEmotions';
import ApiError from '~/exceptions/ApiError';

/**
 * AWS Rekognition Client.
 */
export default class {
  /**
   * Rekognition Client.
   * @type {AWS.Rekognition}
   */
  private client: AWS.Rekognition;

  /**
   * Constructs a rekognition client object.
   */
  constructor(options: RekognitionOptions) {
    // Initialize options.
    options = Object.assign({
      timeout: 5000
    }, options);

    // Generate AWS Rekognition Client.
    this.client = new AWS.Rekognition({
      ...options,
      httpOptions: {
        connectTimeout: options.timeout
      }
    });
  }

  /**
   * Detects faces within an image that is provided as input.
   * For each face detected, the operation returns a bounding box of the face.
   *
   * @param  {string}                 img           Image path or Data Url or image buffer.
   * @param  {number}                 minConfidence The minimum confidence of the detected face.
   *                                                Faces with a confidence lower than this value will not be returned as a result.
   * @param  {boolean}                withDetails   If false, returns only the face bounding box.
   *                                                When true, returns the age group, gender, and emotion in addition to the face bounding box.
   *                                                
   * @return {Promise<BoundingBox[]|FaceDetails[]>}
   */
  public async detectFaces(img: string, minConfidence: number = 90, withDetails: boolean = false): Promise<BoundingBox[]|FaceDetails[]> {
    // Face detection result.
    const results: FaceDetails[]|BoundingBox[] = [];
    try {
      // Detect faces.
      const data: AWS.Rekognition.Types.DetectFacesResponse = await new Promise((resolve, reject) => {
        this.client.detectFaces({
          Image: {Bytes: this.getImageBuffer(img)},
          Attributes: [withDetails ? 'ALL' : 'DEFAULT']
        }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DetectFacesResponse) => {
          err ? reject(err) : resolve(data);
        });
      });

      // If no face is found in the image, it returns an empty array.
      if (!data.FaceDetails)
        return [];

      // If a face is found in the image, the position information of each face on the image is returned.
      for (let details of data.FaceDetails) {
        if (!details.BoundingBox || !details.Confidence || details.Confidence < minConfidence)
          continue;

        // Face Bounding Box.
        const box = details.BoundingBox as AWS.Rekognition.BoundingBox;
        const boundingBox = {width: box.Width as number, height: box.Height as number, left: box.Left as number, top: box.Top as number};

        // Set Results.
        if (!withDetails) {
          (results as BoundingBox[]).push(boundingBox);
        } else {
          const ageRange = details.AgeRange as AWS.Rekognition.Types.AgeRange;
          const gender = details.Gender as AWS.Rekognition.Types.Gender;
          const emotions = details.Emotions as AWS.Rekognition.Types.Emotions;
          (results as FaceDetails[]).push({
            boundingBox,
            ageRange: {high: ageRange.High, low: ageRange.Low},
            gender: gender.Value === 'Male' ? 'male' : 'female',
            emotions: emotions.reduce((acc: any, current: AWS.Rekognition.Types.Emotion) => {
              const type = current.Type as AWS.Rekognition.Types.EmotionName;
              acc[type.toLowerCase()] = current.Confidence as number;
              return acc;
            }, {}) as FaceDetailsEmotions
          });
        }
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    }

    // Returns the face detection result.
    return results;
  }

  /**
   * Compare the similarity of two faces.
   * 
   * @param  {string}          img1 Image path or Data Url or image buffer.
   * @param  {string}          img2 Image path or Data Url or image buffer.
   * @return {Promise<number>}      Level of confidence that the faces match.
   */
  public async compareFaces(img1: string, img2: string): Promise<number> {
    // Compare faces in two images.
    const data: AWS.Rekognition.Types.CompareFacesResponse = await new Promise((resolve, reject) => {
      this.client.compareFaces({
        SourceImage: {Bytes: this.getImageBuffer(img1)},
        TargetImage: {Bytes: this.getImageBuffer(img2)},
        SimilarityThreshold: 0
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.CompareFacesResponse) => {
        err ? reject(err) : resolve(data);
      });
    });

    // Get face similarity.
    let similarity = .0;
    if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Similarity)
      similarity = Math.round(data.FaceMatches[0].Similarity * 10) / 10;
    return similarity;
  }

  /**
   * Add faces to the collection using the IndexFaces operation.
   * For example, you might create collections, one for each of your application users.
   * A user can then index faces using the IndexFaces operation and persist results in a specific collection.
   * Then, a user can search the collection for faces in the user-specific container.
   * Note that Collection names are case-sensitive.
   *
   * @param {string} collectionId ID for the collection that you are creating.
   *                              The maximum length is 255, and the characters that can be used are "[a-zA-Z0-9_.\-]+".
   */
  public async createCollection(collectionId: string): Promise<void> {
    // Creates a collection.
    const data: AWS.Rekognition.Types.CreateCollectionResponse = await new Promise((resolve, reject) => {
      this.client.createCollection({
        CollectionId: collectionId
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.CreateCollectionResponse) => {
        err ? reject(err) : resolve(data);
      });
    });

    // Returns an error if the HTTP status code is other than 200.
    if (data.StatusCode !== 200)
      throw new ApiError('CreateCollectionUnknownError', data.StatusCode||500, 'An unknown error occurred while creating the collection');
  }

  /**
   * Returns list of collection IDs.
   *
   * @return {Promise<string[]>} An array of collection IDs.
   */
  public async listCollections(): Promise<string[]> {
    // Request collection IDs.
    const data: AWS.Rekognition.Types.ListCollectionsResponse = await new Promise((resolve, reject) => {
      this.client.listCollections({}, (err: AWS.AWSError, data: AWS.Rekognition.Types.ListCollectionsResponse) => {
        err ? reject(err) : resolve(data);
      })
    });

    // If the collection ID is not found, an empty array is returned.
    if (!data.CollectionIds || !data.CollectionIds.length)
      return [];

    // Returns the found collection IDs.
    return data.CollectionIds;
  }

  /**
   * Detects one face in the input image and adds it to the specified collection.
   * Note that this method is used to index one face.
   * Throws an exception if no face is found in the input image or multiple faces are found.
   * 
   * @param  {string}           collectionId            The ID of an existing collection to which you want to add the faces that are detected in the input images.
   * @param  {string}           img                     Image path or Data Url or image buffer.
   * @param  {string|undefined} options.externalImageId The ID you want to assign to the faces detected in the image.
   *                                                    When you call the "listFaces" operation, the response returns the external ID.
   *                                                    You can use this external image ID to create a client-side index to associate the faces with each image.
   *                                                    You can then use the index to find all faces in an image.
   *                                                    The maximum length is 255, and the characters that can be used are "[a-zA-Z0-9_.\-:]+".
   * @param  {boolean}          options.returnDetails   If false, only the face ID of the created face is returned.
   *                                                    If true, returns the face ID of the created face, plus age range, gender, and emotion.
   * @return {Promise<string|IndexFaceDetails>}         If options.returnDetails is false, the face identifier is returned.
   *                                                    If options.returnDetails is true, returns the gender, age group, and emotion in addition to the face identifier.
   */
  public async indexFace(collectionId: string, img: string, options?: {externalImageId? : string, returnDetails?: boolean}): Promise<string|IndexFaceDetails> {
    // Initialize options.
    options = Object.assign({
      externalImageId: undefined,
      returnDetails: false
    }, options);
  
    // Get the count of faces in the image.
    const numberOfFaces = (await this.detectFaces(img)).length;
    
    // If no face is found or multiple faces are found, an error is returned.
    if (numberOfFaces === 0)
      throw new ApiError('IndexFaceFaceNotFound', 400, 'No face was found in the image');
    else if (numberOfFaces > 1)
      throw new ApiError('IndexFaceMultipleFacesFound', 400, 'Multiple faces found in the image');
      
    // Add a face to the collection.
    const data: AWS.Rekognition.Types.IndexFacesResponse = await new Promise((resolve, reject) => {
      this.client.indexFaces({
        CollectionId: collectionId,
        Image: {Bytes: this.getImageBuffer(img)},
        DetectionAttributes: ['ALL'],
        ExternalImageId: options!.externalImageId,
        MaxFaces: 1,
        QualityFilter: 'HIGH'
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.IndexFacesResponse) => {
        err ? reject(err) : resolve(data);
      })
    });

    // Returns an error if the result of the added face is not found.
    if (data == null || !data.FaceRecords || !data.FaceRecords.length)
      throw new ApiError('IndexFaceNoResultsFound', 500, 'Face addition result not found');

    // Records of faces created in the collection.
    const faceRecord = data.FaceRecords[0] as AWS.Rekognition.Types.FaceRecord;

    // Return information about the face you created.
    if (!options.returnDetails)
      // Returns a unique identifier assigned to the face.
      return faceRecord.Face!.FaceId as string;
    else {
      const details = faceRecord.FaceDetail as AWS.Rekognition.Types.FaceDetail;
      const ageRange = details.AgeRange as AWS.Rekognition.Types.AgeRange;
      const gender = details.Gender as AWS.Rekognition.Types.Gender;
      const emotions = details.Emotions as AWS.Rekognition.Types.Emotions;
      return {
        faceId: faceRecord.Face!.FaceId as string,
        ageRange: {high: ageRange.High, low: ageRange.Low},
        gender: gender.Value === 'Male' ? 'male' : 'female',
        emotions: emotions.reduce((acc: any, current: AWS.Rekognition.Types.Emotion) => {
          const type = current.Type as AWS.Rekognition.Types.EmotionName;
          acc[type.toLowerCase()] = current.Confidence as number;
          return acc;
        }, {}) as FaceDetailsEmotions
      } as IndexFaceDetails;
    }
  }

  /**
   * For a given input image, first detects the largest face in the image, and then searches the specified collection for matching faces.
   * The operation compares the features of the input face with faces in the specified collection.
   * 
   * @param  {string}                              collectionId          ID of the collection to search.
   * @param  {string}                              img                   Image path or Data Url or image buffer.
   * @param  {object}                              options               option.
   * @param  {number}                              options.minConfidence Specifies the minimum confidence in the face match to return.
   *                                                                     The default value is 80%.
   * @param  {number}                              options.maxFaces      Maximum number of faces to return.
   *                                                                     The operation returns the maximum number of faces with the highest confidence in the match.
   *                                                                     The default value is 5.
   * @return {Promise<FaceMatch[]|FaceMatch|null>}                       If options.maxFaces is 1, the face information found is returned.
   *                                                                     If options.maxFaces is 2 or more, the list of face information found is returned.
   *                                                                     Returns null if no face is found.
   */
  public async searchFaces(collectionId: string, img: string, options?: {minConfidence? : number, maxFaces?: number}): Promise<FaceMatch[]|FaceMatch|null> {
    // Initialize options.
    options = Object.assign({
      minConfidence: 80,
      maxFaces: 5
    }, options);

    // Search for collection faces.
    const data: AWS.Rekognition.Types.SearchFacesByImageResponse = await new Promise((resolve, reject) => {
      this.client.searchFacesByImage({
        CollectionId: collectionId,
        Image: {Bytes: this.getImageBuffer(img)},
        FaceMatchThreshold: options!.minConfidence,
        MaxFaces: options!.maxFaces!,
        QualityFilter: 'AUTO'
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.SearchFacesByImageResponse) => {
        err ? reject(err) : resolve(data);
      })
    });

    // Returns an empty array if the collection does not have a face that matches the target face.
    const matches = <AWS.Rekognition.Types.FaceMatchList>data.FaceMatches || [];
    if (!matches.length)
      return null;

    // Put the search results of the faces of the collection in the array.
    const results: FaceMatch[] = [];
    for (let match of matches) {
      const face = match.Face as AWS.Rekognition.Types.Face;
      const box = face.BoundingBox as AWS.Rekognition.Types.BoundingBox;
      const result = {
        faceId: face.FaceId,
        boundingBox: {width: box.Width, height: box.Height, left: box.Left, top: box.Top},
        similarity: match.Similarity
      } as FaceMatch;
      if (face.ExternalImageId != null)
        result.externalImageId = face.ExternalImageId;
      results.push(result);
    }

    // If options.maxFaces is 1, one search result element is returned, and if options.maxFaces is 2 or more, a search result list is returned.
    return options.maxFaces === 1 ? results[0] : results;
  }

  /**
   * Returns metadata for faces in the specified collection.
   * This metadata includes information such as the bounding box coordinates, and face ID.
   * 
   * @param  {string}               collectionId ID of the collection from which to list the faces.
   * @param  {number}               maxResults   Maximum number of faces to return.
   *                                             The default value is 1000.
   * @return {Promise<FaceMatch[]>}              Returns all face metadata in the collection.
   */
  public async listFaces(collectionId: string, maxResults: number = 1000): Promise<FaceMatch[]> {
    // Get metadata for all faces in the collection.
    const data: AWS.Rekognition.Types.ListFacesResponse = await new Promise((resolve, reject) => {
      this.client.listFaces({
        CollectionId: collectionId,
        MaxResults: maxResults
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.ListFacesResponse) => {
        err ? reject(err) : resolve(data);
      })
    });

    // Put face metadata into an array.
    const results: FaceMatch[] = [];
    const faces = data.Faces as AWS.Rekognition.Types.FaceList;
    for (let face of faces) {
      const box = face.BoundingBox as AWS.Rekognition.Types.BoundingBox;
      const result = {
        faceId: face.FaceId,
        boundingBox: {width: box.Width, height: box.Height, left: box.Left, top: box.Top}
      } as FaceMatch;
      if (face.ExternalImageId != null)
        result.externalImageId = face.ExternalImageId;
      results.push(result);
    }

    // Returns a list of face metadata.
    return results;
  }

  /**
   * Deletes faces from a collection.
   * You specify a collection ID and an array of face IDs to remove from the collection.
   *
   * @param {string}   collectionId Collection from which to remove the specific faces.
   * @param {string[]} faceIds      An array of face IDs to delete.
   */
  public async deleteFaces(collectionId: string, faceIds: string[]): Promise<void> {
    // Delete collection faces.
    return new Promise((resolve, reject) => {
      this.client.deleteFaces({
        CollectionId: collectionId,
        FaceIds: faceIds
      }, (err: AWS.AWSError) => {
        err ? reject(err) : resolve();
      })
      // }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DeleteFacesResponse) => {
      //   err ? reject(err) : resolve(data);
      // })
    });
  }

  /**
   * Deletes the specified collection.
   * Note that this operation removes all faces in the collection.
   *
   * @param {string} collectionId ID of the collection to delete.
   */
  public async deleteCollection(collectionId: string): Promise<void> {
    // Delete collection.
    const data: AWS.Rekognition.Types.DeleteCollectionResponse = await new Promise((resolve, reject) => {
      this.client.deleteCollection({
        CollectionId: collectionId
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DeleteCollectionResponse) => {
        err ? reject(err) : resolve(data);
      });
    });

    // Returns an error if the HTTP status code is other than 200.
    if (data.StatusCode !== 200)
      throw new ApiError('DeleteCollectionUnknownError', data.StatusCode||500, 'An unknown error occurred while deleting the collection');
  }

  /**
   * Returns a buffer of images.
   *
   * @param  {string|Buffer} img Image path or Data Url or image buffer.
   * @return {Buffer}            Image buffer.
   */
  private getImageBuffer(img: string|Buffer): Buffer {
    if (typeof img === 'string' && /^data:image\//.test(img)) {
      // Convert Data URL to image buffer.
      const base64 = img.replace(/^data:image\/[A-Za-z]+;base64,/, '');
      return Buffer.from(base64, 'base64');
    } else if (File.isFile(img)) {
      // Pull buffer from image path.
      const base64 = fs.readFileSync(img, 'base64');
      return Buffer.from(base64, 'base64');
      // return new Buffer(base64, 'base64') as string;
    } else if (Buffer.isBuffer(img))
      // If the image is a buffer, return it as it is.
      return img;
    else
      // Returns an error if the parameters are not an image path, DataUrl, or image buffer.
      throw new Error('The parameter image is invalid');
  }
}