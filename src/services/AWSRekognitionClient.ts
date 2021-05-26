import fs from 'fs';
import AWS from 'aws-sdk';
import {File} from 'nodejs-shared';
import AWSRekognitionOptions from '~/interfaces/AWSRekognitionOptions';
import ApiError from '~/exceptions/ApiError';

/**
 * AWS Rekognition Client.
 */
export default class {
  /**
   * Rekognition client instance.
   * @type {AWS.Rekognition}
   */
  private client: AWS.Rekognition;

  /**
   * Constructs a rekognition client object.
   */
  constructor(options: AWSRekognitionOptions) {
    // Initialize options.
    options = Object.assign({
      timeout: 5000
    }, options);

    // Generate AWS Rekognition client instance.
    this.client = new AWS.Rekognition({
      ...options,
      httpOptions: {
        connectTimeout: options.timeout
      }
    });
  }

  /**
   * Detects faces within an image that is provided as input.
   * 
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   * 
   * // Face reliability threshold.
   * const minConfidence = 99;
   * 
   * // Detect faces from path.
   * await client.detectFaces('img.png', minConfidence);
   *
   * // Detect faces from data URL.
   * await client.detectFaces('data:image/png;base64,/9j/4AAQ...', minConfidence);
   *
   * // Detect faces from buffer.
   * await client.detectFaces(fs.readFileSync('img.png'), minConfidence);
   * 
   * @param  {string} img            Image path or Data Url or image buffer.
   * @param  {number} minConfidence  The minimum confidence of the detected face. Faces with a confidence lower than this value will not be returned as a result.
   * @return {Promise<{width: number, height: number, left: number, top: number}[]>}
   */
  public async detectFaces(img: string, minConfidence: number = 90): Promise<{width: number, height: number, left: number, top: number}[]> {
    // Face detection result.
    const boundingBoxes: {
      width: number,
      height: number,
      left: number,
      top: number
    }[] = [];
    try {
      // Detect faces.
      const data: AWS.Rekognition.Types.DetectFacesResponse = await new Promise((resolve, reject) => {
        this.client.detectFaces({
          Image: {Bytes: this.getImageBuffer(img)},
          Attributes: ['DEFAULT']
        }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DetectFacesResponse) => {
          err ? reject(err) : resolve(data);
        });
      });

      // If no face is found in the image, it returns an empty array.
      if (!data.FaceDetails)
        return [];

      // If a face is found in the image, the position information of each face on the image is returned.
      for (let detail of data.FaceDetails) {
        if (!detail.BoundingBox || !detail.Confidence || detail.Confidence < minConfidence)
          continue;
        const boundingBox = detail.BoundingBox as AWS.Rekognition.BoundingBox;
        boundingBoxes.push({
          width: boundingBox.Width as number,
          height: boundingBox.Height as number,
          left: boundingBox.Left as number,
          top: boundingBox.Top as number
        });
      }
    } catch(e) {
      console.error(e.message);
    }

    // Returns the face detection result.
    return boundingBoxes;
  }

  /**
   * Compare the similarity of two faces.
   * 
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   * 
   * // Compare faces from path.
   * await client.compareFaces(
   *   'img1.png',
   *   'img2.png');
   *
   * // Compare faces from data URL.
   * await client.compareFaces(
   *   'data:image/png;base64,/9j/4AAQ...',
   *   'data:image/png;base64,/9j/4AAQ...');
   *
   * // Compare faces from buffer.
   * await client.compareFaces(
   *   fs.readFileSync('img1.png'),
   *   fs.readFileSync('img1.png'));
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
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   *
   * try {
   *   // Creates a collection.
   *   await client.createCollection('MyCollection');
   * } catch (e) {
   *   // You can get the resulting HTTP status code from the exception.
   *   console.log(`name: ${e.name}`);
   *   console.log(`statusCode: ${e.statusCode}`);
   *   console.log(`message: ${e.message}`);
   * }
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

    // Debug the HTTP status code of the response.
    console.log(`The HTTP status code for the collection creation request is ${data.StatusCode}`);

    // Returns an error if the HTTP status code is other than 200.
    if (data.StatusCode !== 200)
      throw new ApiError('CreateCollectionUnknownError', data.StatusCode||500, 'An unknown error occurred while creating the collection');
  }

  /**
   * Returns list of collection IDs.
   *
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   *
   * // Find the collection IDs.
   * // Output: [
   * //           'MyCollection',
   * //           'AnotherCollection'
   * //         ]
   * await client.listCollections();
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
   * Detects faces in the input image and adds them to the specified collection.
   * This  method doesn't save the actual faces that are detected.
   * Instead, the underlying detection algorithm first detects the faces in the input image.
   * For each face, the algorithm extracts facial features into a feature vector, and stores it in the backend database.
   * 
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   * 
   * // Add face to collection from path.
   * // Output: df8adc94-e888-4442-a03d-42aacd4a6cee
   * const faceId = await client.addFaceToCollection('MyCollection', 'img.png', 'bailey.jpg');
   * console.log(faceId);
   * 
   * // Add face to collection from data URL.
   * // Output: df8adc94-e888-4442-a03d-42aacd4a6cee
   * const faceId = await client.addFaceToCollection('MyCollection', 'data:image/png;base64,/9j/4AAQ...', 'bailey.jpg');
   * console.log(faceId);
   * 
   * // Add face to collection from buffer.
   * // Output: df8adc94-e888-4442-a03d-42aacd4a6cee
   * const faceId = await client.addFaceToCollection('MyCollection', fs.readFileSync('img.png'), 'bailey.jpg');
   * console.log(faceId);
   * 
   * // If the face is not found in the image, throw an error.
   * // Output: name: AddFaceToCollectionFaceNotFound
   * //         statusCode: 400
   * //         message: Not found a face to add
   * try {
   *   await client.addFaceToCollection('MyCollection', 'img.png');
   * } catch (e) {
   *   // You can get the resulting HTTP status code from the exception.
   *   console.log(`name: ${e.name}`);
   *   console.log(`statusCode: ${e.statusCode}`);
   *   console.log(`message: ${e.message}`);
   * }
   * 
   * // If multiple faces are found in the image, throw an error.
   * // Output: name: AddFaceToCollectionMultipleFacesFound
   * //         statusCode: 400
   * //         message: Multiple additional faces were found
   * try {
   *   await client.addFaceToCollection('MyCollection', 'img.png');
   * } catch (e) {
   *   // You can get the resulting HTTP status code from the exception.
   *   console.log(`name: ${e.name}`);
   *   console.log(`statusCode: ${e.statusCode}`);
   *   console.log(`message: ${e.message}`);
   * }
   * 
   * @param  {string}          collectionId    The ID of an existing collection to which you want to add the faces that are detected in the input images.
   * @param  {string}          img             Image path or Data Url or image buffer.
   * @param  {string}          externalImageId The ID you want to assign to the faces detected in the image.
   *                                           When you call the "listFaces" operation, the response returns the external ID.
   *                                           You can use this external image ID to create a client-side index to associate the faces with each image.
   *                                           You can then use the index to find all faces in an image.
   *                                           The maximum length is 255, and the characters that can be used are "[a-zA-Z0-9_.\-:]+".
   * @return {Promise<string>}                 A unique identifier assigned to the face.
   */
  public async addFaceToCollection(collectionId: string, img: string, externalImageId?: string): Promise<string> {
    // Get the count of faces in the image.
    const facesCount = (await this.detectFaces(img)).length;
    console.log(`In the face addition process, ${facesCount} faces were found in the image`);
    
    // If no face is found or multiple faces are found, an error is returned.
    if (facesCount === 0)
      throw new ApiError('AddFaceToCollectionFaceNotFound', 400, 'Not found a face to add');
    else if (facesCount > 1)
      throw new ApiError('AddFaceToCollectionMultipleFacesFound', 400, 'Multiple additional faces were found');
      
    // Add a face to the collection.
    const data: AWS.Rekognition.Types.IndexFacesResponse = await new Promise((resolve, reject) => {
      this.client.indexFaces({
        CollectionId: collectionId,
        Image: {Bytes: this.getImageBuffer(img)},
        DetectionAttributes: ['ALL'],
        ExternalImageId: externalImageId,
        MaxFaces: 1,
        QualityFilter: 'HIGH'
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.IndexFacesResponse) => {
        err ? reject(err) : resolve(data);
      })
    });

    // Returns an error if the result of the added face is not found.
    if (data == null || !data.FaceRecords || !data.FaceRecords.length)
      throw new ApiError('AddFaceToCollectionNoResultsFound', 500, 'Face addition result not found');

    // Returns a unique identifier assigned to the face.
    // @ts-ignore
    return data.FaceRecords[0].Face.FaceId as string;
  }

  /**
   * Deletes the specified collection.
   * Note that this operation removes all faces in the collection.
   *
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * const fs = require('fs');
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   * 
   * // Delete collection.
   * await client.deleteCollection('MyCollection');
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

    // Debug the HTTP status code of the response.
    console.log(`The HTTP status code for the collection delete request is ${data.StatusCode}`);

    // Returns an error if the HTTP status code is other than 200.
    if (data.StatusCode !== 200)
      throw new ApiError('DeleteCollectionUnknownError', data.StatusCode||500, 'An unknown error occurred while deleting the collection');
  }

  /**
   * Returns a buffer of images..
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