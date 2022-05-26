/**
 * @example
 * node indexFace.js
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
  // Create a face and get the ID of the created face.
  // Output: e65d66cb-e7bc-4bbf-966c-b1b49ddf29f8
  const faceId = await client.indexFace(collectionId, 'img/face4.jpg');
  console.log(faceId);

  // Create a face and get the details of the created face.
  // Output:  {
  //            faceId: '7f2dd321-f047-44ff-8856-864637e1d286',
  //            ageRange: { high: 29, low: 21 },
  //            gender: 'female',
  //            emotions: {
  //              angry: 77.1907958984375,
  //              surprised: 9.944050788879395,
  //              fear: 7.514361381530762,
  //              confused: 4.780297756195068,
  //              sad: 2.91914963722229,
  //              happy: 2.5718722343444824,
  //              disgusted: 1.933768391609192,
  //              calm: 1.5354809761047363
  //            }
  //          }
  const faceDetails = await client.indexFace(collectionId, 'img/face5.jpg', {returnDetails: true});
  console.log(faceDetails);
})();