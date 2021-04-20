import AWS from 'aws-sdk';
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
    constructor();
    /**
     * Detect face.
     *
     * @example
     * import RekognitionClient from '~/shared/RekognitionClient';
     * import fs from 'fs';
     *
     * const client = new RekognitionClient();
     * await client.detectFaces('/upload/image.png');
     * await client.detectFaces('data:image/png;base64,/9j/4AAQ...');
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
     * import RekognitionClient from '~/shared/RekognitionClient';
     * import fs from 'fs';
     *
     * const client = new RekognitionClient();
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
