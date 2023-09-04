# Changelog
All notable changes to this project will be documented in this file.

## [1.0.43] - Undecided
### Changed
- Refactor the unit class.
- Delete unnecessary dependencies (class-transformer,class-validator).

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
      accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_REKOGNITION_SECRET_ACCESS_KEY,
      region: process.env.AWS_REKOGNITION_REGION,
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

    See [here](https://takuya-motoshima.github.io/express-sweet/#view-math-helper) how to use the helper.
  
    Added view helpers:  
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
    /**
     * How to determine if it is an ajax request.
     * The default is that if there is an XMLHttpRequest in the request header (req.xhr) returns true.
     * For example, if there is no XMLHttpRequest in req(express.Request) and the Ajax endpoint starts with /api, a custom Ajax decision can be made like "return /^\/api\//.test(req.path)".
     *
     * @type {(req: express.Request) => boolean}
     * @example
     * is_ajax: req => {
     *   // If the request URL begins with /api, it is assumed to be Ajax.
     *   return /^\/api/.test(req.path);
     *   // return !!req.xhr;
     * }
     */
    is_ajax: req => !!req.xhr,
    ```
- The error handle option (error_handler) in the basic configuration (config/config.js) has been removed and an option to hook error handles (hook_handle_error) added instead.  
    
    config/config.js:
    ```js
    /**
     * Hooks the default behavior on request errors.
     * If unset, simply returns an error HTTP status. (<code>res.status(err.status||500).end();</code>)
     *
     * @type {(err: any, req: express.Request, res: express.Response, next: express.NextFunction) => void}
     * @example
     * hook_handle_error: (err, req, res, next) => {
     *   if (err.status === 404)
     *     // If the URL cannot be found, a 404 error screen (views/error-404.hbs) is displayed.
     *     res.render('error-404');
     *   else
     *     // For other errors, unknown error screen (views/error-unknown.hbs) is displayed.
     *     res.render('error-unknown');
     * },
     */
    hook_handle_error: undefined,
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

    // Load environment variables.
    sweet.middlewares.Environment.mount();

    // SES Client.
    const client = new sweet.services.AWSSesClient({
      apiVersion: process.env.SES_API_VERSION,
      region: process.env.SES_REGION,
      accessKeyId: process.env.SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY,
    });

    // Send an email from "test<user1@example.com>" to "user2@example.com".
    await client
      .from('user1@example.com', 'Sender Name')
      .to('user2@example.com')
      .subject('Test email')
      .body('Hi, this is a test email')
      .send();

    // Use variables in the body of the e-mail.
    // The body can use the handlebars and handlebars-extd syntax.
    await client
      .from('user1@example.com', 'Sender Name')
      .to('user2@example.com')
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
    /**
    * How to determine if it is an ajax request.
    * The default is that if there is an XMLHttpRequest in the request header (req.xhr) returns true.
    * For example, if there is no XMLHttpRequest in req(express.Request) and the Ajax endpoint starts with /api, a custom Ajax decision can be made like "return /^\/api\//.test(req.path)".
    *
    * @type {(req: express.Request) => boolean}
    * @example
    * is_ajax: req => {
    *   // If the request URL begins with /api, it is assumed to be Ajax.
    *   return /^\/api/.test(req.path);
    *   // return !!req.xhr;
    * }
    */
    is_ajax: req => !!req.xhr
    ```

## [1.0.23] - 2022/10/20
### Added
- A request body object has been added to the parameters of the callback function for user authentication.  
    config/authentication.js:
    ```js
    const UserModel = require('../models/UserModel');

    /**
    * User authentication configuration interface.
    */
    module.exports = {
      /**
      * This hook is called when authenticating a user.
      * Please find the user information that owns the credentials based on the user name and password you received and return it.
      * If the user who owns the credentials cannot be found, return null.
      *
      * Note that the user information must include an ID value that can identify the user.
      * 
      * @type {(username: string, password: string, req: express.Request) => Promise<{[key: string]: any}|null>}
      */
      authenticate_user: async (username, password, req) => {
        return UserModel.findOne({
          where: {
            email: username,
            password
          },
          raw: true
        });
      }
    }
    ```

## [1.0.22] - 2022/7/27
### Added
- You can now set hook functions that are called before the view is rendered.  
    Hook functions can be used, for example, to set local variables that can be used in the view.  
    
    To use, add the beforeRender hook function to "config/view.js" as follows.
    ```js
    /**
     * Hook function just before the view is rendered.
     * For example, you can set your own local variables that can be used within the view.
     *
     * @example
     * // The message set here can be referenced in the view as {{message}}.
     * beforeRender: res => {
     *   res.locals.message = 'Hello World';
     * }
     *
     * @type {(res: express.Response) => void}
     */
    beforeRender: res => {
      res.locals.message = 'Hello World';
    }
    ```

## [1.0.21] - 2022/526
### Added
- Added an option to the face indexing method to retrieve details (gender, emotion, age group) of indexed faces.
    ```js
    const sweet = require('express-sweet');

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
    /**
    * The session store instance, defaults to a new MemoryStore(memory) instance.
    * @type {'memory|redis'}
    */
    session_store: 'memory',

    /**
    * If the session is stored in "redis", this field is required and should be set to the hostname of the Redis server.
    * For example, to connect to redis on localhost on port 6379, set "redis://localhost:6379".
    * To connect to a different host or port, use a connection string in the format "redis[s]://[[username][:password]@][host][:port][/db-number]".
    * For example, "redis://alice:foobared@awesome.redis.server:6380".
    * @type {string|undefined}
    */
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
    See [Transaction | Sequelize](https://sequelize.org/master/class/lib/transaction.js~Transaction.html) for transaction options.  
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
- Added where member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

## [1.0.6] - 2021/8/13
### Added
- Added fn, col and literal member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

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