import fs from 'node:fs';
import {globSync} from 'glob';
import Model from '~/database/Model';

/**
 * Model initialization and association.
 * All models must be pre-loaded before associating models.So it loads and caches all defined models in advance.
 * This must be done before any method that may load other models is called.
 * @return {Promise<void>}
 */
export default async (): Promise<void> => {
  // Directory where model files are stored.
  const modelsDir = `${process.cwd()}/models`;

  // Exit if the model directory does not exist.
  if (!fs.existsSync(modelsDir))
    return;

  // Initialize all models.
  const models: typeof Model[] = <typeof Model[]>[];
  for (let modelPath of globSync(`${modelsDir}/**/*.js`, {nodir: false})) {
     const {default: model} = <{default: typeof Model}> await import(modelPath);
    await model.initialize();
    models.push(model);
  }

  // Model association.
  // The association is performed after all models have been initialized.
  // If you make an association before initializing all models, you will get a "Sequelize Association called with something that's not a subclass of Sequelize.Model" error.
  for (let model of models)
    model.association();
}