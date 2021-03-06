/**
 * API error.
 */
export default class extends Error {
  /**
   * Error name.
   * @type {string}
   */
  public name: string;

  /**
   * HTTP status code.
   * @type {number}
   */
  public statusCode: number;

  /**
   * Constructs a API error.
   *
   * @example
   * const ApiError = require('express-sweet').exceptions.ApiError;
   *
   * // Throw an API error.
   * throw new ApiError('UserNotFount', 400, 'user not found');
   * 
   * @param {string} name       Error name.
   * @param {number} statusCode HTTP status code.
   * @param {string} message    Error message.
   */
  constructor(name: string, statusCode: number, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}