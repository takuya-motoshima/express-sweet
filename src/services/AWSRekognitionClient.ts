import fs from 'fs';
import AWS from 'aws-sdk';
import {File} from 'nodejs-shared';
import RekognitionOptions from '~/interfaces/RekognitionOptions';
import FaceMatch from '~/interfaces/FaceMatch';
import BoundingBox from '~/interfaces/BoundingBox';
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
  constructor(options: RekognitionOptions) {
    // Initialize options.
    options = Object.assign({timeout: 5000}, options);

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
   * For each face detected, the operation returns a bounding box of the face.
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
   * // Detect faces from path.
   * // Output: [
   * //           {
   * //             width: 0.5004957914352417,
   * //             height: 0.6926820874214172,
   * //             left: 0.2928674817085266,
   * //             top: 0.09095800668001175
   * //           }
   * //         ]
   * await client.detectFaces('img.jpg');
   *
   * // Detect faces from data URL.
   * await client.detectFaces('data:image/png;base64,/9j/4...');
   *
   * // Detect faces from buffer.
   * await client.detectFaces(fs.readFileSync('img.jpg'));
   * 
   * @param  {string}                 img           Image path or Data Url or image buffer.
   * @param  {number}                 minConfidence The minimum confidence of the detected face.
   *                                                Faces with a confidence lower than this value will not be returned as a result.
   * @return {Promise<BoundingBox[]>}               Returns the bounding box of the detected face.
   */
  public async detectFaces(img: string, minConfidence: number = 90): Promise<BoundingBox[]> {
    // Face detection result.
    const boundingBoxes: BoundingBox[] = [];
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
   * await client.compareFaces('img1.jpg', 'img2.jpg');
   *
   * // Compare faces from data URL.
   * await client.compareFaces('data:image/png;base64,/9j/4...', 'data:image/png;base64,/9j/4...');
   *
   * // Compare faces from buffer.
   * await client.compareFaces(fs.readFileSync('img1.jpg'), fs.readFileSync('img1.jpg'));
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
   * Detects one face in the input image and adds it to the specified collection.
   * This method doesn't save the actual faces that are detected.
   * Instead, the underlying detection algorithm first detects the faces in the input image.
   * The algorithm extracts facial features into a feature vector, and stores it in the backend database.
   *
   * Note that this method is used to index one face.
   * Throws an exception if no face is found in the input image or multiple faces are found.
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
   * const faceId = await client.indexFace('MyCollection', 'img.jpg', 'img.jpg');
   * console.log(faceId);
   * 
   * // Add face to collection from data URL.
   * // Output: df8adc94-e888-4442-a03d-42aacd4a6cee
   * const faceId = await client.indexFace('MyCollection', 'data:image/png;base64,/9j/4...', 'img.jpg');
   * console.log(faceId);
   * 
   * // Add face to collection from buffer.
   * // Output: df8adc94-e888-4442-a03d-42aacd4a6cee
   * const faceId = await client.indexFace('MyCollection', fs.readFileSync('img.jpg'), 'img.jpg');
   * console.log(faceId);
   * 
   * // If the face is not found in the image, throw an error.
   * // Output: name: IndexFaceFaceNotFound
   * //         statusCode: 400
   * //         message: No face was found in the image
   * try {
   *   await client.indexFace('MyCollection', 'img.jpg');
   * } catch (e) {
   *   // You can get the resulting HTTP status code from the exception.
   *   console.log(`name: ${e.name}`);
   *   console.log(`statusCode: ${e.statusCode}`);
   *   console.log(`message: ${e.message}`);
   * }
   * 
   * // If multiple faces are found in the image, throw an error.
   * // Output: name: IndexFaceMultipleFacesFound
   * //         statusCode: 400
   * //         message: Multiple faces found in the image
   * try {
   *   await client.indexFace('MyCollection', 'img.jpg');
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
  public async indexFace(collectionId: string, img: string, externalImageId?: string): Promise<string> {
    // Get the count of faces in the image.
    const facesCount = (await this.detectFaces(img)).length;
    console.log(`Face indexing process found ${facesCount} faces in the image`);
    
    // If no face is found or multiple faces are found, an error is returned.
    if (facesCount === 0)
      throw new ApiError('IndexFaceFaceNotFound', 400, 'No face was found in the image');
    else if (facesCount > 1)
      throw new ApiError('IndexFaceMultipleFacesFound', 400, 'Multiple faces found in the image');
      
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
      throw new ApiError('IndexFaceNoResultsFound', 500, 'Face addition result not found');

    // Returns a unique identifier assigned to the face.
    // @ts-ignore
    return data.FaceRecords[0].Face.FaceId as string;
  }

  /**
   * For a given input image, first detects the largest face in the image, and then searches the specified collection for matching faces.
   * The operation compares the features of the input face with faces in the specified collection.
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
   * // If you want to search for one face, specify 1 for the maxFaces option.
   * // In that case, the search result will return the face data for one person.
   * // Output: {
   * //           faceId: '2ce7f471-9c4b-4f27-b5a4-bbd02a5e134d',
   * //           boundingBox: {
   * //             width: 0.500495970249176,
   * //             height: 0.6926820278167725,
   * //             left: 0.2928670048713684,
   * //             top: 0.09095799922943115
   * //           },
   * //           externalImageId: 'img.jpg'
   * //         }
   * const match = await client.searchFaces('MyCollection', 'img.jpg', {minConfidence: 99, maxFaces: 1});
   * console.log(match);
   * 
   * // If you want to search for multiple faces, specify 2 or more for the maxFaces option.
   * // In that case, the search results will return a list of the face data of multiple people found.
   * // Output: [
   * //           {
   * //             faceId: '2ce7f471-9c4b-4f27-b5a4-bbd02a5e134d',
   * //             boundingBox: {
   * //               width: 0.500495970249176,
   * //               height: 0.6926820278167725,
   * //               left: 0.2928670048713684,
   * //               top: 0.09095799922943115
   * //             },
   * //             externalImageId: 'img.jpg'
   * //           }
   * //         ]
   * const matches = await client.searchFaces('MyCollection', 'img.jpg', {minConfidence: 99, maxFaces: 5});
   * console.log(matches);
   *
   * // The input image can specify a buffer or DataURL in addition to the image path.
   * await client.searchFaces('MyCollection', 'data:image/png;base64,/9j/4...');
   * await client.searchFaces('MyCollection', fs.readFileSync('img.jpg'));
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
    options = Object.assign({minConfidence: 80, maxFaces: 5}, options);

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
      const bbox = face.BoundingBox as AWS.Rekognition.Types.BoundingBox;
      const result = {
        faceId: face.FaceId,
        boundingBox: {
          width: bbox.Width,
          height: bbox.Height,
          left: bbox.Left,
          top: bbox.Top
        }
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
   * // Find all face metadata in the collection.
   * // Output: [
   * //           {
   * //             faceId: '2ce7f471-9c4b-4f27-b5a4-bbd02a5e134d',
   * //             boundingBox: {
   * //               width: 0.500495970249176,
   * //               height: 0.6926820278167725,
   * //               left: 0.2928670048713684,
   * //               top: 0.09095799922943115
   * //             },
   * //             externalImageId: 'img.jpg'
   * //           }
   * //         ]
   * const result = await client.listFaces('MyCollection');
   * console.log(result);
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
      const bbox = face.BoundingBox as AWS.Rekognition.Types.BoundingBox;
      const result = {
        faceId: face.FaceId,
        boundingBox: {
          width: bbox.Width,
          height: bbox.Height,
          left: bbox.Left,
          top: bbox.Top
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
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
   * 
   * // Instantiate Rekognition client.
   * const client = new AWSRekognitionClient({
   *   accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
   *   secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
   *   region: process.env.AWS_REKOGNITION_REGION
   * });
   *
   * // Delete a face from the collection.
   * await client.deleteFaces('MyCollection', ['f7befa24-3b83-43cc-b21f-7fac4b91f51d']);
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
   * @example
   * const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
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