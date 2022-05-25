/**
 * @example
 * node findFaceInCollection.js
 */
const sweet = require('../dist/build.common');

// Load environment variables.
sweet.middlewares.Environment.mount();

// Rekognition Client.
const client = new sweet.services.AWSRekognitionClient({
  accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
  region: process.env.AWS_REKOGNITION_REGION
});

// Collection ID for testing.
const collectionId = 'MyCollection';

(async () => {
  // Create a collection.
  const collections = await client.listCollections();
  if (!collections.includes(collectionId))
    await client.createCollection();
  console.log(`The ${collectionId} collection was created`);
  
  // Add a face to the collection.
  const faceId = await client.indexFace(collectionId, 'img/face2.jpg');
  console.log(`Added collection to face. Face ID is ${faceId}`);

  // Find a face in the collection.
  const res = await client.searchFaces(collectionId, 'img/face3.jpg', {maxFaces: 1});
  if (res)
    console.log(`Found ${res.faceId} face in collection`);
  else
    console.log('No face found');
})();