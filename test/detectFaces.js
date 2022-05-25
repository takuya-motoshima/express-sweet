/**
 * @example
 * node detectFaces.js
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

(async () => {
  // Detects bounding boxes on faces.
  // Output:  [
  //            {
  //              width: 0.3099822998046875,
  //              height: 0.661512017250061,
  //              left: 0.5449195504188538,
  //              top: 0.11531734466552734
  //            }
  //          ]
  let res = await client.detectFaces('img/face2.jpg');
  console.log(res);

  // Detect facial details.
  // Output:  [
  //            {
  //              boundingBox: {
  //                width: 0.3099822998046875,
  //                height: 0.661512017250061,
  //                left: 0.5449195504188538,
  //                top: 0.11531734466552734
  //              },
  //              ageRange: { high: 14, low: 6 },
  //              gender: 'female',
  //              emotions: {
  //                happy: 99.78905487060547,
  //                surprised: 6.306276321411133,
  //                fear: 5.880091190338135,
  //                sad: 2.152125835418701,
  //                confused: 0.023256277665495872,
  //                angry: 0.018351631239056587,
  //                calm: 0.015775982290506363,
  //                disgusted: 0.013914424926042557
  //              }
  //            }
  //          ]
  const minConfidence = 90;
  const withDetails = true;
  res = await client.detectFaces('img/face2.jpg', minConfidence, withDetails);
  console.log(res);
  
  process.exit(0);
})();