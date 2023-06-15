const fs = require('fs');
const path = require('path');
const {services: {AWSRekognitionClient}} = require('../dist/build.common');

// AWS Rekognition Client.
let client;

// Test Collection ID.
const collectionId = 'xpunkydxcr';
beforeAll(() => {
  // Load AWS Rekognition access keys, etc. into environment variables.
  require('dotenv').config({path: path.join(__dirname, '.env')});

  // AWS Rekognition Client.
  client =  new AWSRekognitionClient({
    accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
    region: process.env.AWS_REKOGNITION_REGION,
  });
});

test('Should detect one person from the image', async () => {
  const result = await client.detectFaces(`${__dirname}/input/one-person.jpg`);
  expect(result.length).toBe(1);
});

test('Should detect three persons from the image', async () => {
  const result = await client.detectFaces(`${__dirname}/input/three-persons.jpg`);
  expect(result.length).toBe(3);
});

test('The two faces should be the same person', async () => {
  const result = await client.compareFaces(
    `${__dirname}/input/girl-a-1.jpg`,
    `${__dirname}/input/girl-a-2.jpg`
  );
  expect(result >= 90.0).toBe(true);
});

test('The two faces should be different people', async () => {
  const result = await client.compareFaces(
    `${__dirname}/input/girl-b.jpg`,
    `${__dirname}/input/girl-c.jpg`
  );
  expect(result < 90.0).toBe(true);
});

// test('Should be able to create collections', async () => {
//   await client.createCollection(collectionId);
//   const list = await client.listCollections();
//   expect(list.indexOf(collectionId) !== -1).toBe(true);
// });

// test('Collection should be deleted', async () => {
//   await client.deleteCollection(collectionId);
//   const list = await client.listCollections();
//   expect(list.indexOf(collectionId) === -1).toBe(true);
// });
