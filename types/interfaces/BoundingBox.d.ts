/**
 * Bounding box interface for faces, labels, borders, etc.
 */
export default interface  {
    /**
     * The width of the bounding box.
     * @type {number}
     */
    width: number;
    /**
     * The height of the bounding box.
     * @type {number}
     */
    height: number;
    /**
     * The x coordinate of the bounding box with the origin (0,0) in the upper left corner.
     * @type {number}
     */
    left: number;
    /**
     * The y coordinate of the bounding box with the origin (0,0) in the upper left corner.
     * @type {number}
     */
    top: number;
}
