/**
 * Type judgment processing.
 */
export default class {
    /**
     * Returns true for asynchronous functions, false otherwise.
     *
     * @example
     * Types.isAsyncFunction(async () => {});// true
     * Types.isAsyncFunction(() => {});// false
     *
     * @param  {Function} value
     * @return {boolean}
     */
    static isAsyncFunction(value: Function): boolean;
}
