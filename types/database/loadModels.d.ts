/**
 * Model initialization and association for Sequelize models.
 * Loads all model files from the models/ directory, initializes them, then sets up associations.
 * All models must be pre-loaded before associating to prevent circular dependency issues.
 * @returns {Promise<void>}
 * @example
 * ```js
 * // This function is called automatically by express-sweet.mount()
 * import loadModels from '~/database/loadModels';
 * await loadModels();
 * ```
 *
 * @example
 * ```bash
 * // Model file structure
 * models/
 * ├── UserModel.js
 * ├── ProfileModel.js
 * └── BookModel.js
 * ```
 */
declare const _default: () => Promise<void>;
export default _default;
