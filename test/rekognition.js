const sweet = require('../dist/build.common');

(async () => {
  // Read environment variables.
  sweet.middlewares.Environment.mount();

  // Rekognition client instance.
  const client = new sweet.services.AWSRekognitionClient({
    accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
    region: process.env.AWS_REKOGNITION_REGION
  });

  // Face detection from images without faces.
  // Output: Face detection result: []
  {
    const res = await client.detectFaces('img/building.jpg');
    console.log('Detection result of img/building.jpg:', res);
  }

  // Face detection from images with three faces.
  // Output: Face detection result: [
  //           {
  //             width: 0.30317309498786926,
  //             height: 0.6674619913101196,
  //             left: 0.3702312111854553,
  //             top: 0.059011779725551605
  //           },
  //           {
  //             width: 0.16308656334877014,
  //             height: 0.30602365732192993,
  //             left: 0.7395021319389343,
  //             top: 0.16512738168239594
  //           },
  //           {
  //             width: 0.13294188678264618,
  //             height: 0.22816380858421326,
  //             left: 0.16820426285266876,
  //             top: 0.12334728240966797
  //           }
  //         ]
  {
    const res = await client.detectFaces('img/faces.jpg');
    console.log('Detection result of img/faces.jpg:', res);
  }

  // Test collection ID.
  const collectionId = 'MyCollection';

  // Create a collection.
  {
    const collections = await client.listCollections();
    if (!collections.includes(collectionId))
      await client.createCollection();
  }
  
  // Add face to collection.
  {
    const imgPath = 'img/man_1.jpg';
    // const imgPath = 'img/face.jpg';
    const faceId = await client.indexFace(collectionId, imgPath);
    console.log(`Added ${imgPath} face, faceId=${faceId}`);
  }

  // Find a face from the collection.
  // Output: Face search results: [
  //           {
  //             faceId: '385e1b00-4ede-4219-a7b0-0b9cbe4953e5',
  //             boundingBox: {
  //               width: 0.3204210102558136,
  //               height: 1.0046900510787964,
  //               left: 0.39145898818969727,
  //               top: 0.07936319708824158
  //             },
  //             similarity: 99.98941802978516
  //           }
  //         ]
  {
    const res = await client.searchFaces(collectionId, 'img/man_2.jpg');
    console.log('Face search results:', res);
  }
})();