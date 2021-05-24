import fs from 'fs';
import AWS from 'aws-sdk';
import {File, Media} from 'nodejs-shared';
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
   * Create a Rekognition client instance.
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
  public async detectFaces(img: string, threshold: number = 90): Promise<AWS.Rekognition.BoundingBox[]> {
    // Load image.
    if (/^data:image\//.test(img))
      img = this.base64ToBlob(img);
    else if (File.isFile(img))
      img = fs.readFileSync(img).toString();

    // Detect faces.
    const data = await new Promise((resolve, reject) => 
      this.client.detectFaces({
        Image: {Bytes: img},
        Attributes: ['ALL']
      }, (error: AWS.AWSError, data: AWS.Rekognition.Types.DetectFacesResponse) => error ? reject(error) : resolve(data))
    ) as AWS.Rekognition.Types.DetectFacesResponse;

    // If no face is found in the image, it returns an empty array.
    if (!data.FaceDetails)
      return [];

    // If a face is found in the image, the position information of each face on the image is returned.
    const boundingBoxes: AWS.Rekognition.BoundingBox[] = [];
    for (let faceDetail of data.FaceDetails)
      if (faceDetail.BoundingBox && faceDetail.Confidence && faceDetail.Confidence >= threshold)
        boundingBoxes.push(faceDetail.BoundingBox);
    return boundingBoxes;
  }

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
  public async compareFaces(img1: string, img2: string): Promise<number> {
    if (/^data:image\//.test(img1))
      img1 = this.base64ToBlob(img1);
    else if (File.isFile(img1))
      img1 = fs.readFileSync(img1).toString();
    if (/^data:image\//.test(img2))
      img2 = this.base64ToBlob(img2);
    else if (File.isFile(img2))
      img2 = fs.readFileSync(img2).toString();
    const data = await new Promise((resolve, reject) => 
      this.client.compareFaces({
        SourceImage: {Bytes: img1},
        TargetImage: {Bytes: img2},
        SimilarityThreshold: 0
      }, (error: AWS.AWSError, data: AWS.Rekognition.Types.CompareFacesResponse) => error ? reject(error) : resolve(data))
    ) as AWS.Rekognition.Types.CompareFacesResponse;
    let similarity = .0;
    if (data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Similarity)
      similarity = Math.round(data.FaceMatches[0].Similarity * 10) / 10;
    return similarity;
  }

  /**
   * Add a collection.
   */
  public async addCollection(collectionId: string): Promise<string> {
    const data = await new Promise((resolve, reject) => 
      this.client.createCollection({CollectionId: collectionId}, (error: AWS.AWSError, data: AWS.Rekognition.Types.CreateCollectionResponse) => error ? reject(error) : resolve(data))
    ) as AWS.Rekognition.Types.CreateCollectionResponse;
    if (data.StatusCode !== 200)
      throw new Error('Collection could not be created');
    return collectionId;
  }

  /**
   * Returns a list of collections.
   */
  public async getCollections(): Promise<string[]> {
    const data = await new Promise((resolve, reject) => 
      this.client.listCollections({}, (error: AWS.AWSError, data: AWS.Rekognition.Types.ListCollectionsResponse) => error ? reject(error) : resolve(data))
    ) as AWS.Rekognition.Types.ListCollectionsResponse;
    if (!data.CollectionIds || !data.CollectionIds.length)
      return [];
    return data.CollectionIds;
  }

  /**
   * Delete collection.
   */
  public async deleteCollection(collectionId: string): Promise<void> {
    const data = await new Promise((resolve, reject) => 
      this.client.deleteCollection({CollectionId: collectionId}, (error: AWS.AWSError, data: AWS.Rekognition.Types.DeleteCollectionResponse) => error ? reject(error) : resolve(data))
    ) as AWS.Rekognition.Types.DeleteCollectionResponse;
    if (data.StatusCode !== 200)
      throw new Error('Collection could not be delete');
  }

  /**
   * Converts a base64 string to a Blob string and returns it.
   */
  public base64ToBlob(base64: string): string {
    const tmpPath = File.getTmpPath('.png');
    Media.writeBase64Image(tmpPath, base64);
    return fs.readFileSync(tmpPath).toString();
  }
}