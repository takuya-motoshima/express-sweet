import fs from 'node:fs';
import {globSync} from 'glob';
import Model from '~/database/Model';

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
export default async (): Promise<void> => {
  // Locate models directory in application root
  const modelsDir = `${process.cwd()}/models`;

  // Skip if no models directory exists
  if (!fs.existsSync(modelsDir)) {
    return;
  }

  // Load and initialize all model files
  const models: typeof Model[] = <typeof Model[]>[];
  for (let modelPath of globSync(`${modelsDir}/**/*.js`, {nodir: false})) {
    const {default: model} = <{default: typeof Model}> await import(modelPath);
    await model.init();
    models.push(model);
  }

  // Set up associations between models (must be done after all models are initialized)
  // Prevents "Sequelize Association called with something that's not a subclass of Sequelize.Model" error
  for (let model of models) {
    model.association();
  }
}