const path = require('path');
const {services: {AWSSesClient}} = require('../dist/build.common');

// AWS SES Client.
let client;

beforeAll(() => {
  // Load AWS SES access keys, etc. into environment variables.
  require('dotenv').config({path: path.join(__dirname, '.env')});

  // AWS SES Client.
  client =  new AWSSesClient({
    apiVersion: process.env.SES_API_VERSION,
    region: process.env.SES_REGION,
    accessKeyId: process.env.SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
  });
});

test('Should send email to a valid address', async () => {
  const messageId = await client
    .from(process.env.TEST_EMAIL_FROM, 'Sender Name')
    .to(process.env.TEST_EMAIL_TO)
    .subject('Test email')
    .body('Hi, this is a test email')
    .send();
  expect(messageId !== '').toBe(true);
});