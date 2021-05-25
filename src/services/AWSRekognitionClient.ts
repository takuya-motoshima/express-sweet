import fs from 'fs';
import AWS from 'aws-sdk';
import {File} from 'nodejs-shared';
import AWSRekognitionOptions from '~/interfaces/AWSRekognitionOptions';

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
    // Detect faces.
    const data: AWS.Rekognition.Types.DetectFacesResponse = await new Promise((resolve, reject) => {
      this.client.detectFaces({
        Image: {
          Bytes: this.getImageBuffer(img)
        },
        Attributes: ['ALL']
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DetectFacesResponse) => {
        err ? reject(err) : resolve(data);
      });
    });

    // If no face is found in the image, it returns an empty array.
    if (!data.FaceDetails)
      return [];

    // If a face is found in the image, the position information of each face on the image is returned.
    const boundingBoxes: {width: number, height: number, left: number, top: number}[] = [];
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
        SourceImage: {
          Bytes: this.getImageBuffer(img1)
        },
        TargetImage: {
          Bytes: this.getImageBuffer(img2)
        },
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
   * Add a collection.
   */
  public async addCollection(collectionId: string): Promise<string> {
    const data: AWS.Rekognition.Types.CreateCollectionResponse = await new Promise((resolve, reject) => {
      this.client.createCollection({
        CollectionId: collectionId
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.CreateCollectionResponse) => {
        err ? reject(err) : resolve(data);
      });
    });
    if (data.StatusCode !== 200)
      throw new Error('Collection could not be created');
    return collectionId;
  }

  /**
   * Returns a list of collections.
   */
  public async getCollections(): Promise<string[]> {
    const data: AWS.Rekognition.Types.ListCollectionsResponse = await new Promise((resolve, reject) => {
      this.client.listCollections({}, (err: AWS.AWSError, data: AWS.Rekognition.Types.ListCollectionsResponse) => {
        err ? reject(err) : resolve(data);
      })
    });
    if (!data.CollectionIds || !data.CollectionIds.length)
      return [];
    return data.CollectionIds;
  }

  /**
   * Delete collection.
   */
  public async deleteCollection(collectionId: string): Promise<void> {
    const data: AWS.Rekognition.Types.DeleteCollectionResponse = await new Promise((resolve, reject) => {
      this.client.deleteCollection({
        CollectionId: collectionId
      }, (err: AWS.AWSError, data: AWS.Rekognition.Types.DeleteCollectionResponse) => {
        err ? reject(err) : resolve(data);
      });
    });
    if (data.StatusCode !== 200)
      throw new Error('Collection could not be delete');
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