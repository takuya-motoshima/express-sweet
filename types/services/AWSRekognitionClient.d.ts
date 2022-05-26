import RekognitionOptions from '~/interfaces/RekognitionOptions';
import FaceMatch from '~/interfaces/FaceMatch';
import BoundingBox from '~/interfaces/BoundingBox';
import FaceDetails from '~/interfaces/FaceDetails';
import IndexFaceDetails from '~/interfaces/IndexFaceDetails';
/**
 * AWS Rekognition Client.
 */
export default class {
    /**
     * Rekognition Client.
     * @type {AWS.Rekognition}
     */
    private client;
    /**
     * Constructs a rekognition client object.
     */
    constructor(options: RekognitionOptions);
    /**
     * Detects faces within an image that is provided as input.
     * For each face detected, the operation returns a bounding box of the face.
     *
     * @param  {string}                 img           Image path or Data Url or image buffer.
     * @param  {number}                 minConfidence The minimum confidence of the detected face.
     *                                                Faces with a confidence lower than this value will not be returned as a result.
     * @param  {boolean}                withDetails   If false, returns only the face bounding box.
     *                                                When true, returns the age group, gender, and emotion in addition to the face bounding box.
     *
     * @return {Promise<BoundingBox[]|FaceDetails[]>}
     */
    detectFaces(img: string, minConfidence?: number, withDetails?: boolean): Promise<BoundingBox[] | FaceDetails[]>;
    /**
     * Compare the similarity of two faces.
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
     * @param {string} collectionId ID for the collection that you are creating.
     *                              The maximum length is 255, and the characters that can be used are "[a-zA-Z0-9_.\-]+".
     */
    createCollection(collectionId: string): Promise<void>;
    /**
     * Returns list of collection IDs.
     *
     * @return {Promise<string[]>} An array of collection IDs.
     */
    listCollections(): Promise<string[]>;
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
    indexFace(collectionId: string, img: string, options?: {
        externalImageId?: string;
        returnDetails?: boolean;
    }): Promise<string | IndexFaceDetails>;
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
    searchFaces(collectionId: string, img: string, options?: {
        minConfidence?: number;
        maxFaces?: number;
    }): Promise<FaceMatch[] | FaceMatch | null>;
    /**
     * Returns metadata for faces in the specified collection.
     * This metadata includes information such as the bounding box coordinates, and face ID.
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
     * @param {string}   collectionId Collection from which to remove the specific faces.
     * @param {string[]} faceIds      An array of face IDs to delete.
     */
    deleteFaces(collectionId: string, faceIds: string[]): Promise<void>;
    /**
     * Deletes the specified collection.
     * Note that this operation removes all faces in the collection.
     *
     * @param {string} collectionId ID of the collection to delete.
     */
    deleteCollection(collectionId: string): Promise<void>;
    /**
     * Returns a buffer of images.
     *
     * @param  {string|Buffer} img Image path or Data Url or image buffer.
     * @return {Buffer}            Image buffer.
     */
    private getImageBuffer;
}
