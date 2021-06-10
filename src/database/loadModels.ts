import fs from 'fs';
import {File} from 'nodejs-shared';
import Model from '~/database/Model';

/**
 * Model initialization and association.
 * All models must be pre-loaded before associating models.So it loads and caches all defined models in advance.
 * This must be done before any method that may load other models is called.
 */
export default function(): void {
  // Directory where model files are stored.
  const modelsDir = `${process.cwd()}/models`;

  // Exit if the model directory does not exist.
  if (!fs.existsSync(modelsDir))
    return void console.log(`There is no model directory (${modelsDir})`)

  // Initialize all models.
  // const models: typeof Model[] = new Array<typeof Model>();
  const models: typeof Model[] = <typeof Model[]>[];

  // const models:{[key: string]: typeof Model} = {};
  for (let modelPath of File.find(`${modelsDir}/**/*.js`)) {
    // console.log(`Load ${modelPath}`);
    const model = <typeof Model>(require(modelPath).prototype instanceof Model ? require(modelPath) : require(modelPath).default);
    model.initialize();
    models.push(model);
  }

  // Model association.
  // The association is performed after all models have been initialized.
  // If you make an association before initializing all models, you will get a "Sequelize Association called with something that's not a subclass of Sequelize.Model" error.
  for (let model of models)
    model.association();
}
