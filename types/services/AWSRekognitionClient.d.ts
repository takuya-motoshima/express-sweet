import AWSRekognitionOptions from '~/interfaces/AWSRekognitionOptions';
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
    constructor(options: AWSRekognitionOptions);
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
    detectFaces(img: string, minConfidence?: number): Promise<{
        width: number;
        height: number;
        left: number;
        top: number;
    }[]>;
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
    createCollection(collectionId: string): Promise<void>;
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
    listCollections(): Promise<string[]>;
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
    deleteCollection(collectionId: string): Promise<void>;
    /**
     * Returns a buffer of images..
     * @param  {string|Buffer} img Image path or Data Url or image buffer.
     * @return {Buffer}            Image buffer.
     */
    private getImageBuffer;
}
