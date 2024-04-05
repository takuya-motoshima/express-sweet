# Changelog
All notable changes to this project will be documented in this file.

## [2.0.1] - 2024/4/5
### Changed
- Removed [nodejs-shared](https://www.npmjs.com/package/nodejs-shared) package dependency.

## [2.0.0] - 2024/3/24
### Changed
- Express Sweet version 2 no longer depends on the AWS SDK.  
    The `services.AWSRekognitionClient` and `services.AWSSesClient` have been migrated to the [AWS SDK Extension](https://www.npmjs.com/package/aws-sdk-extension) NPM package, so please install from there if needed.

## [1.1.1] - 2024/3/23
### Changed
- When cookie security is enabled (`config/authentication.js#cookie_secure`) and the application is running on the HTTP protocol, the following warning message is output upon user authentication.
  ```sh
  Warning: Cookie security must be disabled for user authentication to work over the HTTP protocol (config/authentication.js#cookie_secure)
  ```

## [1.1.0] - 2024/3/6
### Changed
- Updated Express Sweet's dependency packages.
    - [express](https://www.npmjs.com/package/express) from v4.18.2 to v4.18.3
    - [multer](https://www.npmjs.com/package/multer) from v1.4.4 to v1.4.5-lts.1
    - [express-session](https://www.npmjs.com/package/express-session) from v1.17.3 to v1.18.0
    - [sequelize](https://www.npmjs.com/package/sequelize) from v6.32.0 to v6.37.1
    - [mariadb](https://www.npmjs.com/package/mariadb) from v2.4.0 to v3.2.3
    - [moment](https://www.npmjs.com/package/moment) from v2.29.4 to v2.30.1
- Update [metronic-extension](https://www.npmjs.com/package/metronic-extension) of the demo from v1.0.1 to v3.0.9.

### Added
- Demo (./demo) Docker environment added. See [here](demo/README.md) for details.

## [1.0.44] - 2023/12/30
### Changed
- The `Secure` and `HttpOnly` attributes of the session cookie can now be set from the authentication configuration file (`config/authentication.js`).

    config/authentication.js:
    ```js
    /**
     * Specifies the boolean value for the Secure Set-Cookie attribute.
     * The default is true, which sets the Secure attribute on the cookie.
     * @type {boolean|undefined}
     */
    cookie_secure: true,

    /**
     * Specifies the boolean value for the HttpOnly Set-Cookie attribute. 
     * Defaults to true, which sets the HttpOnly attribute on the cookie.
     * @type {boolean|undefined}
     */
    cookie_httpOnly: true,
    ```

## [1.0.43] - 2023/12/30
### Changed
- The cookie name for storing session IDs can now be set in the `cookie_name` field of the authentication configuration file (`config/authentication.js`).  

    config/authentication.js:
    ```js
    /**
     * The name of the session ID cookie to set in the response (and read from in the request).
     * The default value is 'connect.sid'.
     * @type {string|undefined}
     */
    cookie_name: 'connect.sid'
    ```

## [1.0.42] - 2023/8/31
### Changed
- Update TypeScript version from 4.8.4 to 5.2.2.
- Update redis dependency package used for user authentication.
    - Updated redis package version from 4.3.1 to 4.6.8.  
        [Here](https://github.com/redis/node-redis/blob/master/CHANGELOG.md) are the changes.
    - Updated connect-redis package version from 6.1.3 to 7.1.0.  
        [Here](https://github.com/tj/connect-redis/releases) are the changes.


## [1.0.41] - 2023/8/4
### Changed
- Added an option to the method that searches for faces in the collection to throw an exception if a face is not found or if multiple faces are found.
    <table>
        <thead>
            <tr>
                <th>Option</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>throwNotFoundFaceException</td>
                <td>boolean</td>
                <td>If true, throws a <code>FaceMissingInPhoto</code> exception when a face is not found in the image; if false, returns null. Default is false.</td>
            </tr>
            <tr>
                <td>throwTooManyFaceException</td>
                <td>boolean</td>
                <td>If true, throws a <code>FacesMultipleInPhoto</code> exception when more than one face is found in the image. Default is false.</td>
            </tr>
        </tbody>
    </table>

    Example:
    ```js
    const {services: {AWSRekognitionClient}, exceptions: {FaceMissingInPhoto, FacesMultipleInPhoto}} = require('express-sweet');

    // Rekognition Client.
    const client =  new AWSRekognitionClient({
      accessKeyId: 'your AWS access key ID',
      secretAccessKey: 'your AWS secret access key',
      region: 'the region to send service requests to',
    });

    // Find a face in the collection.
    const collectionId = 'MyCollection';

    try {
      await client.searchFaces(collectionId, 'face.jpg', {
        throwNotFoundFaceException: true,
        throwTooManyFaceException: true,
      });
    } catch (err) {
      if (err instanceof FaceMissingInPhoto)
        console.log('No face was found');
      else if (err instanceof FacesMultipleInPhoto)
        console.log('Multiple faces were found');
      else
        console.log('Other errors');
    }
    ```

## [1.0.40] - 2023/8/4
### Changed
- Fixed to return null instead of throwing an error when looking for faces in the collection using images without faces (<code>AWSRekognitionClient.searchFaces()</code>).

## [1.0.39] - 2023/7/24
### Changed
- Changed exception class name.
    <table>
        <thead>
            <tr>
                <th>Before Class Name</th>
                <th>After class name</th>
                <th>Instance member</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CollectionCreationError</td>
                <td>FaceCollectionCreateFailed</td>
                <td>
                    <ul>
                        <li>name: Error Name.</li>
                        <li>collectionId: Collection ID.</li>
                        <li>httpStatusCode: HTTP status code.</li>
                    </ul>
                </td>
                <td>Thrown when face collection creation (<code>AWSRekognitionClient.createCollection()</code>) fails.</td>
            </tr>
            <tr>
                <td>CollectionDeletionError</td>
                <td>FaceCollectionDeleteFailed</td>
                <td>
                    <ul>
                        <li>name: Error Name.</li>
                        <li>collectionId: Collection ID.</li>
                        <li>httpStatusCode: HTTP status code.</li>
                    </ul>
                </td>
                <td>Thrown when deleting a face collection (<code>AWSRekognitionClient.deleteCollection()</code>) fails.</td>
            </tr>
            <tr>
                <td>FaceIndexError</td>
                <td>FaceIndexFailed</td>
                <td>
                    <ul>
                        <li>name: Error Name.</li>
                        <li>collectionId: Collection ID.</li>
                    </ul>
                </td>
                <td>Thrown when face indexing (<code>AWSRekognitionClient.indexFace()</code>) fails.</td>
            </tr>
            <tr>
                <td>MissingFaceInImageError</td>
                <td>FaceMissingInPhoto</td>
                <td>
                    <ul>
                        <li>name: Error Name.</li>
                    </ul>
                </td>
                <td>Thrown if the face to index (<code>AWSRekognitionClient.indexFace()</code>) is not in the photo.</td>
            </tr>
            <tr>
                <td>MultipleFacesInImageError</td>
                <td>FacesMultipleInPhoto</td>
                <td>
                    <ul>
                        <li>name: Error Name.</li>
                    </ul>
                </td>
                <td>Thrown when there are multiple faces to index (<code>AWSRekognitionClient.indexFace()</code>) in a photo.</td>
            </tr>
        </tbody>
    </table>

## [1.0.38] - 2023/7/17
### Fixed
- Fixed a bug that login user data (req.user) could not be referenced in the function called just before view rendering (config/view.js#beforeRender).

## [1.0.37] - 2023/7/17
### Changed
- The beforeRender option in the view configuration (config/view.js) can now specify asynchronous functions.

### Added
- New Math-related view helpers have been added.  
    |Helper|Description|
    |--|--|
    |add|Calculates the sum of two numbers.|
    |sub|Calculates the difference of the given values.|
    |multiply|Calculate the multiplication of the given values.|
    |divide|Compute the division of the given values.|
    |ceil|Round up the value.|
    |floor|Rounds down a number.|
    |abs|Returns an absolute value.|

## [1.0.36] - 2023/7/12
### Changed
- Moved the Ajax determination option (is_ajax) in the authentication configuration (config/authentication.js) to the basic configuration (config/config.js).  
    
    config/config.js:
    ```js
    is_ajax: req => {
      // If the request URL begins with /api, it is assumed to be Ajax.
      return /^\/api/.test(req.path);
      // return !!req.xhr;
    }
    ```
- The error handle option (error_handler) in the basic configuration (config/config.js) has been removed and an option to hook error handles (hook_handle_error) added instead.  
    
    config/config.js:
    ```js
    hook_handle_error: (err, req, res, next) => {
      if (err.status === 404)
        // If the URL cannot be found, a 404 error screen (views/error-404.hbs) is displayed.
        res.render('error-404');
      else
        // For other errors, unknown error screen (views/error-unknown.hbs) is displayed.
        res.render('error-unknown');
    }
    ```

## [1.0.35] - 2023/7/11
### Changed
- The URL to redirect to when login fails (failure_redirect) option in the authentication configuration (config/authentication.js) can now be defined with a function.  
  
    config/authentication.js:
    ```js
    // Set the URL to redirect to in case of login failure as a string.
    failure_redirect: '/login',

    // Dynamically set the url to redirect to on login failure.
    failure_redirect: (req, res) => {
      // If the role stored in the cookie is admin, redirect to the admin login screen.
      return req.cookies.role === 'admin' ? '/adminlogin' : 'login';
    },
    ```
- The arguments of the failureRedirect method of the authentication service class (services/Authentication) have changed.  
    The argument to the Authentication.failureRedirect method used to be just express.Response, but now it requires express.Request and express.Response.

    Example of login routes:
    ```js
    import {Router} from 'express';
    import * as sweet from 'express-sweet';
    const router = Router();
    const Authentication = sweet.services.Authentication;

    router.post('/login', async (req, res, next) => {
      const isAuth = await Authentication.authenticate(req, res, next);
      if (isAuth)
        Authentication.successRedirect(res);
      else
        Authentication.failureRedirect(req, res);
    });
    export default router;
    ```

## [1.0.34] - 2023/7/1
### Changed
- Changed the response status code from 403 to 401 when asynchronous communication requiring authentication fails to authenticate.

## [1.0.33] - 2023/7/1
### Added
- Added regular expression comparison view helper.
    ```html
    {{!-- results in: true --}}
    {{regexMatch 'foobar' 'foo'}}

    {{!-- results in: false --}}
    {{regexMatch 'bar' 'foo'}}

    {{!-- results in: false --}}
    {{regexMatch 'foobar' '^foo$'}}

    {{!-- results in: true --}}
    {{regexMatch 'Visit Here' 'here' 'i'}}

    {{!-- results in: false --}}
    {{regexMatch 'Visit Here' 'here'}}

    {{!-- results in: Match --}}
    {{#if (regexMatch 'foobar' 'foo')}}
      Match
    {{/if}}
    ```

## [1.0.32] - 2023/7/1
### Fixed
- Fixed a bug that cookies (req.cookies) cannot be referenced in the hook function before view rendering (config/view.js#beforeRender).

## [1.0.31] - 2023/6/29
### Changed
- Changed helper function names in the view (Handlebars) from SnakeCase to CamelCase.
    |After|Before|Description|
    |--|--|--|
    |notEmpty|not_empty|Check that it is not empty.|
    |formatDate|format_date|Use moment to format the date.|
    |cacheBusting|cache_busting|Returns the Assets path containing the file update time parameter.|
    |jsonStringify|json_stringify|Stringify an object using JSON.stringify.|
    |jsonParse|json_parse|Parses the given string using JSON.parse.|
    |formatBytes|format_bytes|Convert bytes to just the right units(KB, MB, GB, TB, PB, EB, ZB, YB).|

### Added
- Added view helper to convert numeric values to strings with language-sensitive representations.
    ```html
    {{!-- results in: 123,456.789 --}}
    {{number2locale 123456.789}}

    {{!-- German uses comma as decimal separator and period for thousands. --}}
    {{!-- results in: 123.456,789 --}}
    {{number2locale 123456.789 'de-DE'}}
    ```

## [1.0.30] - 2023/6/26
### Changed
- Fixed AWS Rekognition credentials passing.

## [1.0.29] - 2023/6/20
### Changed
- Changed class private variables and methods from soft private to hard private.
  
### Added
- Added AWS SES email sending client class.
    ```js
    const sweet = require('express-sweet');

    // SES Client.
    const client = new sweet.services.AWSSesClient({
      apiVersion: 'API Version ("YYYYY-MM-DD" or "latest")',
      region: 'the region to send service requests to',
      accessKeyId: 'your AWS access key ID',
      secretAccessKey: 'your AWS secret access key',
    });

    // Send an email from "test<from@example.com>" to "to@example.com".
    await client
      .from('from@example.com', 'Sender Name')
      .to('to@example.com')
      .subject('Test email')
      .body('Hi, this is a test email')
      .send();

    // Use variables in the body of the e-mail.
    // The body can use the handlebars and handlebars-extd syntax.
    await client
      .from('from@example.com', 'Sender Name')
      .to('to@example.com')
      .subject('Test email')
      .body('Hello {{name}}', {name: 'Mason'})
      .send();
    ```

## [1.0.28] - 2023/6/16
### Changed
- Updated AWS SDK version from 2 to 3.  
    Unit test results:
    ```sh
    npm run test

    > express-sweet@1.0.25 test
    > jest

    PASS  __tests__/AWSRekognitionClient.test.js (8.773 s)
      ? Should detect one person from the image (448 ms)
      ? Should be able to get facial details (532 ms)
      ? Should detect three persons from the image (589 ms)
      ? The two faces should be the same person (131 ms)
      ? The two faces should be different people (213 ms)
      ? Should be able to create collections (98 ms)
      ? Should index faces in the collection (242 ms)
      ? Should return the details of the indexed face (346 ms)
      ? Should be able to find faces from the collection (153 ms)
      ? Should be able to find faces from the collection (132 ms)
      ? Should list indexed faces (27 ms)
      ? Should delete the face from the collection (53 ms)
      ? Collection should be deleted (62 ms)

    Test Suites: 1 passed, 1 total
    Tests:       13 passed, 13 total
    Snapshots:   0 total
    Time:        9.323 s
    Ran all test suites.
    ```

## [1.0.27] - 2023/6/12
### Changed
- Request object has been added to the arguments of the beforeRender function in the view configuration (config/view.js).

    express-sweet v1.0.27 or later (current):
    ```js
    beforeRender: (req, res) => {}
    ```

    express-sweet v1.0.26 or earlier:
    ```js
    beforeRender: res => {}
    ```

## [1.0.26] - 2023/6/11
### Changed
- Update Sequelize from v5 to v6.
- Changed the framework debug log to output only when the environment variable EXPRESS_DEBUG is defined.  
    .env:
    ```
    EXPRESS_DEBUG=true
    ```
- A demo application was added [here](./demo).

## [1.0.25] - 2022/11/24
### Added
- Added formatBytes view helper to convert bytes to appropriate units.
    ```html
    {{!-- results in: 1 KB --}}
    {{formatBytes 1024}}

    {{!-- results in: 1.21 KB --}}
    {{formatBytes 1234 2}}

    {{!-- results in: 1.205 KB --}}
    {{formatBytes 1234 3}}

    {{!-- results in: 0 Bytes --}}
    {{formatBytes 0}}
    ```

## [1.0.24] - 2022/10/24
### Added
- Added is_ajax option to user authentication.

    config/authentication.js:
    ```js
    is_ajax: req => {
      // If the request URL begins with /api, it is assumed to be Ajax.
      return /^\/api/.test(req.path);
      // return !!req.xhr;
    }
    ```

## [1.0.23] - 2022/10/20
### Added
- A request body object has been added to the parameters of the callback function for user authentication.  

    config/authentication.js:
    ```js
    authenticate_user: async (username, password, req) => {
      const UserModel = require('../models/UserModel');
      return UserModel.findOne({
        where: {
          email: username,
          password
        },
        raw: true
      });
    }
    ```

## [1.0.22] - 2022/7/27
### Added
- You can now set hook functions that are called before the view is rendered.  
    Hook functions can be used, for example, to set local variables that can be used in the view.  
    
    To use, add the beforeRender hook function to "config/view.js" as follows.
    ```js
    beforeRender: res => {
      res.locals.extra = 'Extra';
    }
    ```

## [1.0.21] - 2022/526
### Added
- Added an option to the face indexing method to retrieve details (gender, emotion, age group) of indexed faces.
    ```js
    const sweet = require('express-sweet');

    // Rekognition Client.
    const client = new sweet.services.AWSRekognitionClient({
      accessKeyId: 'your AWS access key ID',
      secretAccessKey: 'your AWS secret access key',
      region: 'the region to send service requests to'
    });

    // Collection ID for testing.
    const collectionId = 'MyCollection';

    // Create a face and get the ID of the created face.
    // results in: e65d66cb-e7bc-4bbf-966c-b1b49ddf29f8
    const faceId = await client.indexFace(collectionId, 'face4.jpg');
    console.log(faceId);

    // Create a face and get the details of the created face.
    // results in:  {
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
    const faceDetails = await client.indexFace(collectionId, 'face5.jpg', {returnDetails: true});
    console.log(faceDetails);
    ```

## [1.0.20] - 2022/5/25
### Added
- Added an option to get details (emotion, gender, age group) to the face detection method.
    ```js
    const sweet = require('express-sweet');

    // Rekognition Client.
    const client = new sweet.services.AWSRekognitionClient({
      accessKeyId: 'your AWS access key ID',
      secretAccessKey: 'your AWS secret access key',
      region: 'the region to send service requests to'
    });

    (async () => {
      // Detects bounding boxes on faces.
      // results in:  [
      //            {
      //              width: 0.3099822998046875,
      //              height: 0.661512017250061,
      //              left: 0.5449195504188538,
      //              top: 0.11531734466552734
      //            }
      //          ]
      let res = await client.detectFaces('face.jpg');
      console.log(res);

      // Detect facial details.
      // results in:  [
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
      res = await client.detectFaces('face.jpg', minConfidence, withDetails);
      console.log(res);
    })();
    ```

## [1.0.19] - 2022/5/20
### Added
- Add date format helper to view.
    ```html
    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}}

    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}}

    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}}
    ```

## [1.0.18] - 2022/5/18
### Added
- User authentication sessions can now be stored in redis.  
    To use redis for session storage, simply add the following option to config/authentication.js.  
    Please give it a try.

    config/authentication.js:  
    ```json
    session_store: 'memory',
    // session_store: 'redis',
    redis_host: 'redis://localhost:6379'
    ```

## [1.0.17] - 2022/5/17
### Changed
- Updated documentation and refactored variable names.

## [1.0.16] - 2022/2/14
### Fixed
- I forgot to include the build file, so I added the build file.

## [1.0.15] - 2022/2/14
### Changed
- Changed the type of 'config/authentication.js#allow_unauthenticated' from'string[]' to'(string|RegExp)[]}'.

## [1.0.14] - 2022/1/17
### Changed
- empty view helper can now check any type. Previously I could only check arrays.
    ```html
    {{!-- results in: false --}}
    {{empty [5, 6]}}

    {{#if (empty 'foo')}}
      Hello
    {{/if}}

    {{!-- results in: false --}}
    {{empty 'Hello'}}
 
    {{!-- results in: true --}}
    {{empty ''}}
 
    {{!-- results in: true --}}
    {{empty value}}
    ```

- Added notEmpty view helper.
    ```html
    {{!-- results in: true --}}
    {{notEmpty [5, 6]}}

    {{#if (notEmpty 'foo')}}
      Hello
    {{/if}}

    {{!-- results in: true --}}
    {{notEmpty 'Hello'}}

    {{!-- results in: false --}}
    {{notEmpty ''}}

    {{!-- results in: false --}}
    {{notEmpty ' '}}
    ```

## [1.0.13] - 2021/12/13
### Added
- The model's begin method now accepts the transaction option.
    ```js
    let transaction;
    try {
      transaction = await BookModel.begin({
        isolationLevel: BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
        type: BookModel.Transaction.TYPES.DEFERRED,
      });
      const book = await BookModel.findOne({where: {id: 1}}, {transaction});
      book.title = 'When Im Gone';
      await book.save({transaction});
      await transaction.commit();

      // Check the update result.
      // results in: New title of book: When Im Gone
      await book.reload();
      console.log(`New title of book: ${book.title}`);
    } catch (err) {
      if (transaction)
        await transaction.rollback();
    }
    ```

## [1.0.12] - 2021/11/16
### Added
- Added a method to the model that can execute raw SQL.  
    As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the Model.query method.  

    ```js
    // By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc).
    // Note that since this is a raw query, the metadata are dialect specific.
    const [results, metadata] = await BookModel.query("UPDATE book SET title = 'When Im Gone' WHERE id = 1");

    // In cases where you don't need to access the metadata you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:
    // We didn't need to destructure the result here - the results were returned directly
    const users = await BookModel.query("SELECT * FROM book", {type: BookModel.QueryTypes.SELECT});
    ```

## [1.0.11] - 2021/11/10
### Fixed
- Fixed a bug that the database config was read before NODE_ENV was set and the database config matching NODE_ENV could not be read.

## [1.0.10] - 2021/10/19
### Changed
- Added face similarity found to face search results in collection.

    ```js
    import * as sweet from 'express-sweet';

    // Find a face from the collection.
    // results in: Face search results: [
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
    const collectionId = 'MyCollection';
    const res = await client.searchFaces(collectionId, 'face.jpg');
    console.log('Face search results:', res);
    ```

## [1.0.9] - 2021/10/13
### Changed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
  This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
  Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.8] - 2021/9/25
### Fixed
- Fixed a bug where the default router couldn't aqua from the endpoint URL.

## [1.0.7] - 2021/8/13
### Added
- Added where member functions to Model class.

## [1.0.6] - 2021/8/13
### Added
- Added fn, col and literal member functions to Model class.

## [1.0.5] - 2021/8/12
### Changed
- Changed the maximum size per field for multipart (multipart/form-data) requests from 1MB to unlimited.

## [1.0.4] - 2021/6/13
### Fixed
- Fixed a bug where the referrer URL was set in app.locals.currentPath instead of the current URL.

## [1.0.3] - 2021/6/13
### Changed
- Change the current URL path of a local variable.app.locals.currentPath is a USVString containing an initial '/' followed by the path of the URL not including the query string or fragment.

    ```js
    // For example, when the current URL is "https://example.com/docs/api?q=value", "/docs/api" is set for "app.locals.currentPath".
    console.log(app.locals.currentPath);
    ```

## [1.0.2] - 2021//6/10
### Changed
- Updated rollup from version 2.44 to 2.51.

### Fixed
- Fixed a bug where preloading models failed in cjs.

## [1.0.1] - 2021/6/2
### Fixed
- Fixed a bug that caused an error when reading options defined in ESM's default Export.

[1.0.1]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.4...v1.0.5
[1.0.6]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.5...v1.0.6
[1.0.7]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.6...v1.0.7
[1.0.8]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.7...v1.0.8
[1.0.9]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.8...v1.0.9
[1.0.10]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.9...v1.0.10
[1.0.11]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.10...v1.0.11
[1.0.12]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.11...v1.0.12
[1.0.13]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.12...v1.0.13
[1.0.14]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.13...v1.0.14
[1.0.15]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.14...v1.0.15
[1.0.16]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.15...v1.0.16
[1.0.17]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.16...v1.0.17
[1.0.18]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.17...v1.0.18
[1.0.19]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.18...v1.0.19
[1.0.20]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.19...v1.0.20
[1.0.21]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.20...v1.0.21
[1.0.22]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.21...v1.0.22
[1.0.23]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.22...v1.0.23
[1.0.24]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.23...v1.0.24
[1.0.25]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.24...v1.0.25
[1.0.26]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.25...v1.0.26
[1.0.27]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.26...v1.0.27
[1.0.28]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.27...v1.0.28
[1.0.29]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.28...v1.0.29
[1.0.30]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.29...v1.0.30
[1.0.31]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.30...v1.0.31
[1.0.32]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.31...v1.0.32
[1.0.33]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.32...v1.0.33
[1.0.34]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.33...v1.0.34
[1.0.35]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.34...v1.0.35
[1.0.36]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.35...v1.0.36
[1.0.37]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.36...v1.0.37
[1.0.38]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.37...v1.0.38
[1.0.39]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.38...v1.0.39
[1.0.40]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.39...v1.0.40
[1.0.41]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.40...v1.0.41
[1.0.42]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.41...v1.0.42
[1.0.43]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.42...v1.0.43
[1.0.44]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.43...v1.0.44
[1.0.45]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.44...v1.0.45
[1.1.0]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.45...v1.1.0
[1.1.1]: https://github.com/takuya-motoshima/express-sweet/compare/v1.1.0...v1.1.1
[2.0.0]: https://github.com/takuya-motoshima/express-sweet/compare/v1.1.1...v2.0.0
[2.0.1]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.0...v2.0.1