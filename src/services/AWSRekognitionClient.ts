import fs from 'fs';
import {Agent} from 'https';
// import {Agent as HttpAgnet} from 'http';
import {
  RekognitionClient,
  DetectFacesCommand,
  DetectFacesResponse,
  Emotion,
  CompareFacesCommand,
  CompareFacesResponse,
  CreateCollectionCommand,
  CreateCollectionResponse,
  ListCollectionsCommand,
  ListCollectionsResponse,
  IndexFacesCommand,
  IndexFacesResponse,
  FaceRecord,
  // EmotionName,
  FaceDetail,
  SearchFacesByImageCommand,
  SearchFacesByImageResponse,
  Face,
  ListFacesCommand,
  ListFacesResponse,
  DeleteFacesCommand,
  // DeleteFacesResponse,
  DeleteCollectionCommand,
  DeleteCollectionResponse,
} from '@aws-sdk/client-rekognition';
import {NodeHttpHandler} from '@aws-sdk/node-http-handler';
import {File} from 'nodejs-shared';
import RekognitionOptions from '~/interfaces/RekognitionOptions';
import FaceMatch from '~/interfaces/FaceMatch';
import BoundingBox from '~/interfaces/BoundingBox';
import FaceDetails from '~/interfaces/FaceDetails';
import IndexFaceDetails from '~/interfaces/IndexFaceDetails';
import FaceDetailsEmotions from '~/interfaces/FaceDetailsEmotions';
import CollectionCreationError from '~/exceptions/CollectionCreationError';
import MissingFaceInImageError from '~/exceptions/MissingFaceInImageError';
import MultipleFacesInImageError from '~/exceptions/MultipleFacesInImageError';
import FaceIndexError from '~/exceptions/FaceIndexError';
import CollectionDeletionError from '~/exceptions/CollectionDeletionError';

/**
 * AWS Rekognition Client.
 */
export default class {
  /**
   * Rekognition Client.
   * @type {RekognitionClient}
   */
  private client: RekognitionClient;

  /**
   * Constructs a rekognition client object.
   */
  constructor(options: RekognitionOptions) {
    // Initialize options.
    options = Object.assign({
      timeout: 5000
    }, options);

    // Generate AWS Rekognition Client.
    this.client = new RekognitionClient({
      ...options,
      requestHandler: new NodeHttpHandler({
        httpsAgent: new Agent({
          /*params*/
        }),
        connectionTimeout: options.timeout, /*number in milliseconds*/
        // socketTimeout: /*number in milliseconds*/
      }),
      // httpOptions: {
      //   connectTimeout: options.timeout
      // }
    });
  }

  /**
   * Detects faces within an image that is provided as input.
   * For each face detected, the operation returns a bounding box of the face.
   *
   * @param  {string}                 img           Image path or Data Url or image buffer.
   * @param  {number}                 minConfidence The minimum confidence of the detected face. Faces with a confidence lower than this value will not be returned as a result.
   * @param  {boolean}                withDetails   If false, returns only the face bounding box.When true, returns the age group, gender, and emotion in addition to the face bounding box.
   * @return {Promise<BoundingBox[]|FaceDetails[]>}
   */
  public async detectFaces(img: string, minConfidence: number = 90, withDetails: boolean = false): Promise<BoundingBox[]|FaceDetails[]> {
    // Face detection result.
    const results: FaceDetails[]|BoundingBox[] = [];
    try {
      // Send request.
      const res: DetectFacesResponse = await this.client.send(new DetectFacesCommand({
        Image: {Bytes: this.image2buffer(img)},
        Attributes: [withDetails ? 'ALL' : 'DEFAULT']
      }));

      // If no face is found in the image, it returns an empty array.
      if (!res.FaceDetails)
        return [];

      // If a face is found in the image, the position information of each face on the image is returned.
      for (let detail of res.FaceDetails) {
        if (!detail.BoundingBox
          || !detail.Confidence
          || detail.Confidence < minConfidence
        )
          continue;

        // Face Bounding Box.
        const boundingBox = {
          width: detail.BoundingBox.Width as number,
          height: detail.BoundingBox.Height as number,
          left: detail.BoundingBox.Left as number,
          top: detail.BoundingBox.Top as number
        };

        // Set Results.
        if (!withDetails) {
          (results as BoundingBox[]).push(boundingBox);
          continue;
        }

        // If the detail option is enabled, set the emotion and other information.
        (results as FaceDetails[]).push({
          boundingBox,
          ageRange: detail.AgeRange ?
            {
              high: detail.AgeRange.High,
              low: detail.AgeRange.Low
            } :
            undefined,
          gender: detail.Gender ?
            (detail.Gender.Value === 'Male' ? 'male' : 'female') :
            undefined,
          emotions: detail.Emotions ?
            detail.Emotions.reduce((acc: any, current: Emotion) => {
              acc[current.Type!.toLowerCase()] = current.Confidence as number;
              return acc;
            }, {}) as FaceDetailsEmotions :
            undefined,
          });
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
    // Send request.
    const res: CompareFacesResponse = await this.client.send(new CompareFacesCommand({
      SourceImage: {
        Bytes: this.image2buffer(img1)
      },
      TargetImage: {
        Bytes: this.image2buffer(img2)
      },
      SimilarityThreshold: 0
    }));

    // Get face similarity.
    let similarity = .0;
    if (res.FaceMatches
      && res.FaceMatches.length > 0
      && res.FaceMatches[0].Similarity
    )
      similarity = Math.round(res.FaceMatches[0].Similarity * 10) / 10;
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
    // Send request.
    const res: CreateCollectionResponse = await this.client.send(new CreateCollectionCommand({
      CollectionId: collectionId
    }));

    // Returns an error if the HTTP status code is other than 200.
    if (res.StatusCode !== 200)
      throw new CollectionCreationError(`Error creating collection ${collectionId} (HTTP status code: ${res.StatusCode})`);
  }

  /**
   * Returns list of collection IDs.
   *
   * @return {Promise<string[]>} An array of collection IDs.
   */
  public async listCollections(): Promise<string[]> {
    // Send request.
    const res: ListCollectionsResponse = await this.client.send(new ListCollectionsCommand({}));

    // If the collection ID is not found, an empty array is returned.
    if (!res.CollectionIds || !res.CollectionIds.length)
      return [];

    // Returns the found collection IDs.
    return res.CollectionIds;
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
    if (numberOfFaces === 0)
      // If no face is found in the image, an error is returned.
      throw new MissingFaceInImageError();
    else if (numberOfFaces > 1)
      // If more than one face is found in the image, an error is returned.
      throw new MultipleFacesInImageError();

    // Send request.
    const res: IndexFacesResponse = await this.client.send(new IndexFacesCommand({
      CollectionId: collectionId,
      Image: {
        Bytes: this.image2buffer(img)
      },
      DetectionAttributes: ['ALL'],
      ExternalImageId: options!.externalImageId,
      MaxFaces: 1,
      QualityFilter: 'HIGH'
    }));

    // Returns an error if the result of the added face is not found.
    if (res == null || !res.FaceRecords || !res.FaceRecords.length)
      throw new FaceIndexError(`Error in indexing face to collection ID ${collectionId}`);

    // Records of faces created in the collection.
    const faceRecord = res.FaceRecords[0] as FaceRecord;

    // Detail of detected faces.
    const detail = faceRecord.FaceDetail as FaceDetail;

    // Return information about the face you created.
    if (!options.returnDetails)
      // Returns a unique identifier assigned to the face.
      return faceRecord.Face!.FaceId as string;
    else {
      return {
        faceId: faceRecord.Face!.FaceId as string,
        ageRange: detail.AgeRange ?
          {
            high: detail.AgeRange.High,
            low: detail.AgeRange.Low,
          } :
          undefined,
        gender: detail.Gender ?
          (detail.Gender.Value === 'Male' ? 'male' : 'female') :
          undefined,
        emotions: detail.Emotions ?
          detail.Emotions.reduce((acc: any, current: Emotion) => {
            acc[current.Type!.toLowerCase()] = current.Confidence as number;
            return acc;
          }, {}) as FaceDetailsEmotions : 
          undefined
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

    // Send request.
    const res: SearchFacesByImageResponse = await this.client.send(new SearchFacesByImageCommand({
      CollectionId: collectionId,
      Image: {Bytes: this.image2buffer(img)},
      FaceMatchThreshold: options!.minConfidence,
      MaxFaces: options!.maxFaces!,
      QualityFilter: 'AUTO'
    }));

    // Returns an empty array if the collection does not have a face that matches the target face.
    if (!res.FaceMatches || !res.FaceMatches.length)
      return null;

    // Put the search results of the faces of the collection in the array.
    const results: FaceMatch[] = [];
    for (let match of res.FaceMatches) {
      const face = match.Face as Face;
      const result = {
        faceId: face.FaceId,
        boundingBox: {
          width: face.BoundingBox!.Width,
          height: face.BoundingBox!.Height,
          left: face.BoundingBox!.Left,
          top: face.BoundingBox!.Top,
        },
        similarity: match.Similarity,
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
    // Send request.
    const res: ListFacesResponse = await this.client.send(new ListFacesCommand({
      CollectionId: collectionId,
      MaxResults: maxResults
    }));

    // If there is no data, an empty array is returned.
    if (!res.Faces)
      return [];

    // Put face metadata into an array.
    const results: FaceMatch[] = [];
    for (let face of res.Faces) {
      const result = {
        faceId: face.FaceId,
        boundingBox: {
          width: face.BoundingBox!.Width,
          height: face.BoundingBox!.Height,
          left: face.BoundingBox!.Left,
          top: face.BoundingBox!.Top,
        }
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
   * @return {Promise<boolean>}     True on success.
   */
  public async deleteFaces(collectionId: string, faceIds: string[]): Promise<boolean> {
    // Send request.
    await this.client.send(new DeleteFacesCommand({
      CollectionId: collectionId,
      FaceIds: faceIds
    }));
    return true;
  }

  /**
   * Deletes the specified collection.
   * Note that this operation removes all faces in the collection.
   *
   * @param {string} collectionId ID of the collection to delete.
   * @return {Promise<boolean>}   True on success.
   */
  public async deleteCollection(collectionId: string): Promise<boolean> {
    // Send request.
    const res: DeleteCollectionResponse = await this.client.send(new DeleteCollectionCommand({CollectionId: collectionId}));

    // Returns an error if the HTTP status code is other than 200.
    if (res.StatusCode !== 200)
      throw new CollectionDeletionError(`Error in deleting collection ID ${collectionId}`);
    return true;
  }

  /**
   * Returns a buffer of images.
   *
   * @param  {string|Buffer} img Image path or Data Url or image buffer.
   * @return {Buffer}            Image buffer.
   */
  private image2buffer(img: string|Buffer): Buffer {
    if (typeof img === 'string' && /^data:image\//.test(img))
      // Convert Data URL to image buffer.
      return Buffer.from(img.replace(/^data:image\/[A-Za-z]+;base64,/, ''), 'base64');
    else if (File.isFile(img))
      // Pull buffer from image path.
      return Buffer.from(fs.readFileSync(img, 'base64'), 'base64');
    else if (Buffer.isBuffer(img))
      // If the image is a buffer, return it as it is.
      return img;
    else
      // Returns an error if the parameters are not an image path, DataUrl, or image buffer.
      throw new Error('The parameter image is invalid');
  }
}