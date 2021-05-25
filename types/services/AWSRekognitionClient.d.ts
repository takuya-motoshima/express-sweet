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
     * await client.compareFaces('img1.png', 'img2.png');
     *
     * // Compare faces from data URL.
     * await client.compareFaces('data:image/png;base64,/9j/4AAQ...'. 'data:image/png;base64,/9j/4AAQ...');
     *
     * // Compare faces from buffer.
     * await client.compareFaces(fs.readFileSync('img1.png'), fs.readFileSync('img1.png'));
     *
     * @param  {string} img1 Image path or Data Url or image buffer.
     * @param  {string} img2 Image path or Data Url or image buffer.
     * @return {Promise<number>}
     */
    compareFaces(img1: string, img2: string): Promise<number>;
    /**
     * Add a collection.
     */
    addCollection(collectionId: string): Promise<string>;
    /**
     * Returns a list of collections.
     */
    getCollections(): Promise<string[]>;
    /**
     * Delete collection.
     */
    deleteCollection(collectionId: string): Promise<void>;
    /**
     * Returns a buffer of images..
     * @param  {string|Buffer} img Image path or Data Url or image buffer.
     * @return {Buffer}            Image buffer.
     */
    private getImageBuffer;
}
