import RekognitionOptions from '~/interfaces/RekognitionOptions';
import FaceMatch from '~/interfaces/FaceMatch';
import BoundingBox from '~/interfaces/BoundingBox';
/**
 * AWS Rekognition Client.
 */
export default class {
    /**
     * Rekognition client instance.
     * @type {AWS.Rekognition}
     */
    private client;
    /**
     * Constructs a rekognition client object.
     */
    constructor(opts: RekognitionOptions);
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
    detectFaces(img: string, minConfidence?: number): Promise<BoundingBox[]>;
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
    compareFaces(img1: string, img2: string): Promise<number>;
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
    createCollection(collectionId: string): Promise<void>;
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
    listCollections(): Promise<string[]>;
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
    indexFace(collectionId: string, img: string, externalImageId?: string): Promise<string>;
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
    searchFaces(collectionId: string, img: string, opts?: {
        minConfidence?: number;
        maxFaces?: number;
    }): Promise<FaceMatch[] | FaceMatch | null>;
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
    listFaces(collectionId: string, maxResults?: number): Promise<FaceMatch[]>;
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
    deleteFaces(collectionId: string, faceIds: string[]): Promise<void>;
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
    deleteCollection(collectionId: string): Promise<void>;
    /**
     * Returns a buffer of images..
     * @param  {string|Buffer} img Image path or Data Url or image buffer.
     * @return {Buffer}            Image buffer.
     */
    private getImageBuffer;
}
