import AWS from 'aws-sdk';
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
     * Create a Rekognition client instance.
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
     * // Detect face from image path.
     * await client.detectFaces('/upload/image.png');
     *
     * // Detect faces from base64 format images.
     * await client.detectFaces('data:image/png;base64,/9j/4AAQ...');
     *
     * // Detect faces from image binaries.
     * await client.detectFaces(fs.readFileSync('/upload/image.png'));
     *
     * @param  {string} img Image file path, base 64 character string, or BLOB
     * @param  {number} threshold
     * @return {Promise<AWS.Rekognition.BoundingBox[]>}
     */
    detectFaces(img: string, threshold?: number): Promise<AWS.Rekognition.BoundingBox[]>;
    /**
     * Compare faces.
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
     * await client.compareFaces('/upload/image1.png', '/upload/image2.png');
     * await client.compareFaces('data:image/png;base64,/9j/4AAQ...'. 'data:image/png;base64,/9j/4AAQ...');
     * await client.compareFaces(fs.readFileSync('/upload/image1.png'), fs.readFileSync('/upload/image1.png'));
     *
     * @param  {string} img1 Image file path, base 64 character string, or BLOB
     * @param  {string} img2 Image file path, base 64 character string, or BLOB
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
     * Converts a base64 string to a Blob string and returns it.
     */
    base64ToBlob(base64: string): string;
}
