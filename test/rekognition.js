const AWSRekognitionClient = require('express-sweet').services.AWSRekognitionClient;
const Environment = require('express-sweet').middlewares.Environment;

(async () => {
  // Read environment variables.
  Environment.mount();

  // Rekognition client instance.
  const client = new AWSRekognitionClient({
    accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
    region: process.env.AWS_REKOGNITION_REGION
  });

  let res;

  // Face detection from images without faces.
  // Output: Face detection result: []
  console.log('Start face detection');
  res = await client.detectFaces('img/building.jpg');
  console.log('Face detection result:', res);

  // Face detection from images with three faces.
  // Output: Face detection result: [
  //                {
  //                  width: 0.30317309498786926,
  //                  height: 0.6674619913101196,
  //                  left: 0.3702312111854553,
  //                  top: 0.059011779725551605
  //                },
  //                {
  //                  width: 0.16308656334877014,
  //                  height: 0.30602365732192993,
  //                  left: 0.7395021319389343,
  //                  top: 0.16512738168239594
  //                },
  //                {
  //                  width: 0.13294188678264618,
  //                  height: 0.22816380858421326,
  //                  left: 0.16820426285266876,
  //                  top: 0.12334728240966797
  //                }
  //              ]
  console.log('Start face detection');
  res = await client.detectFaces('img/face.jpg');
  console.log('Face detection result:', res);
})();