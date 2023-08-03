const path = require('path');
const {services: {AWSRekognitionClient}} = require('../dist/build.common');

// AWS Rekognition Client.
let client;

// Test Collection ID.
const collectionId1 = 'xpunkydxcr';
const collectionId2 = 'jdyluopsaj';
const collectionId3 = 'ouijucgfjl';
const collectionId4 = 'jxsjfkndlx';
const collectionId5 = 'sykcoadhld';

// Test Face ID.
let faceId;

beforeAll(() => {
  return new Promise(async resolve => {
    // Load AWS Rekognition access keys, etc. into environment variables.
    require('dotenv').config({path: path.join(__dirname, '.env')});

    // AWS Rekognition Client.
    client =  new AWSRekognitionClient({
      accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
      region: process.env.AWS_REKOGNITION_REGION,
    });

    // Test collection.
    try {
      await client.deleteCollection(collectionId1);
    } catch {};
    try {
      await client.createCollection(collectionId2);
    } catch {};
    try {
      await client.createCollection(collectionId3);
    } catch {};
    try {
      await client.createCollection(collectionId4);
      await client.indexFace(collectionId4, `${__dirname}/input/girl-a-1.jpg`);
    } catch {};
    try {
      await client.createCollection(collectionId5);
      faceId = await client.indexFace(collectionId5, `${__dirname}/input/girl-a-1.jpg`);
    } catch {};
    resolve();
  });
});

afterAll(() => {
  return new Promise(async resolve => {
    // Test collection.
    try {
      await client.deleteCollection(collectionId2);
    } catch {};
    try {
      await client.deleteCollection(collectionId4);
    } catch {};
    try {
      await client.deleteCollection(collectionId5);
    } catch {};
    resolve();
  });
});

test('Should detect one person from the image', async () => {
  const result = await client.detectFaces(`${__dirname}/input/one-person.jpg`);
  expect(result.length).toBe(1);
});

test('Should be able to get facial details', async () => {
  const minConfidence = 90;
  const withDetails = true;
  const result = await client.detectFaces(`${__dirname}/input/one-person.jpg`, minConfidence, withDetails);
  const detail = result[0];
  expect(detail).toHaveProperty('boundingBox.width');
  expect(detail).toHaveProperty('boundingBox.height');
  expect(detail).toHaveProperty('boundingBox.left');
  expect(detail).toHaveProperty('boundingBox.top');
  expect(detail).toHaveProperty('ageRange.high');
  expect(detail).toHaveProperty('ageRange.low');
  expect(detail).toHaveProperty('gender');
  expect(detail).toHaveProperty('emotions.happy');
  expect(detail).toHaveProperty('emotions.surprised');
  expect(detail).toHaveProperty('emotions.fear');
  expect(detail).toHaveProperty('emotions.angry');
  expect(detail).toHaveProperty('emotions.calm');
  expect(detail).toHaveProperty('emotions.confused');
  expect(detail).toHaveProperty('emotions.disgusted');
  expect(detail).toHaveProperty('emotions.sad');
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

test('Should be able to create collections', async () => {
  await client.createCollection(collectionId1);
  const list = await client.listCollections();
  expect(list.indexOf(collectionId1) !== -1).toBe(true);
});

test('Should index faces in the collection', async () => {
  const result = await client.indexFace(collectionId2, `${__dirname}/input/girl-a-1.jpg`);
  expect(!!result).toBe(true);
});

test('Should return the details of the indexed face', async () => {
  const returnDetails = true;
  const result = await client.indexFace(collectionId2, `${__dirname}/input/girl-a-1.jpg`, {returnDetails});
  expect(result).toHaveProperty('faceId');
  expect(result).toHaveProperty('ageRange.high');
  expect(result).toHaveProperty('ageRange.low');
  expect(result).toHaveProperty('gender');
  expect(result).toHaveProperty('emotions.happy');
  expect(result).toHaveProperty('emotions.surprised');
  expect(result).toHaveProperty('emotions.fear');
  expect(result).toHaveProperty('emotions.angry');
  expect(result).toHaveProperty('emotions.calm');
  expect(result).toHaveProperty('emotions.confused');
  expect(result).toHaveProperty('emotions.disgusted');
  expect(result).toHaveProperty('emotions.sad');
});

test('Should be able to find faces from the collection', async () => {
  const maxFaces = 1;
  const result = await client.searchFaces(collectionId4, `${__dirname}/input/girl-a-2.jpg`, {maxFaces});
  expect(result).toHaveProperty('faceId');
  expect(result).toHaveProperty('boundingBox.width');
  expect(result).toHaveProperty('boundingBox.height');
  expect(result).toHaveProperty('boundingBox.left');
  expect(result).toHaveProperty('boundingBox.top');
  expect(result).toHaveProperty('similarity');
});

test('Should be able to find faces from the collection', async () => {
  const maxFaces = 1;
  const result = await client.searchFaces(collectionId4, `${__dirname}/input/girl-a-2.jpg`, {maxFaces});
  expect(result).toHaveProperty('faceId');
  expect(result).toHaveProperty('boundingBox.width');
  expect(result).toHaveProperty('boundingBox.height');
  expect(result).toHaveProperty('boundingBox.left');
  expect(result).toHaveProperty('boundingBox.top');
  expect(result).toHaveProperty('similarity');
});

test('Should return null if collection is searched using faceless images', async () => {
  const result = await client.searchFaces(collectionId4, `${__dirname}/input/no-face.jpg`);
  expect(result).toBe(null);
});

test('Should list indexed faces', async () => {
  const result = await client.listFaces(collectionId4);
  for (let match of result) {
    expect(match).toHaveProperty('faceId');
    expect(match).toHaveProperty('boundingBox.width');
    expect(match).toHaveProperty('boundingBox.height');
    expect(match).toHaveProperty('boundingBox.left');
    expect(match).toHaveProperty('boundingBox.top');
  }
});

test('Should delete the face from the collection', async () => {
  const res = await client.deleteFaces(collectionId5, [faceId]);
  expect(res).toBe(true);
});

test('Collection should be deleted', async () => {
  const res = await client.deleteCollection(collectionId3);
  expect(res).toBe(true);
});
