# Changelog
All notable changes to this project will be documented in this file.

## [1.0.24] - 2022/10/24
### Fixed
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
### Fixed
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
### Fixed
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
### Fixed
- Added an option to the face indexing method to retrieve details (gender, emotion, age group) of indexed faces.
    ```js
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
    ```

## [1.0.20] - 2022/5/25
### Fixed
- Added an option to get details (emotion, gender, age group) to the face detection method.
    ```js
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
      let res = await client.detectFaces('img/face.jpg');
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
      res = await client.detectFaces('img/face.jpg', minConfidence, withDetails);
      console.log(res);
    })();
    ```

## [1.0.19] - 2022/5/20
### Fixed
- Add date format helper to view.
    ```html
    {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}} => 2021/10/24
    {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}} => 2021/10/24
    {{format_date 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}} => 2021/10/24
    ```

## [1.0.18] - 2022/5/18
### Fixed
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
### Fixed
- Updated documentation and refactored variable names.

## [1.0.16] - 2022/2/14
### Fixed
- I forgot to include the build file, so I added the build file.

## [1.0.15] - 2022/2/14
### Fixed
- Changed the type of 'config/authentication.js#allow_unauthenticated' from'string[]' to'(string|RegExp)[]}'.

## [1.0.14] - 2022/1/17
### Fixed
- empty view helper can now check any type. Previously I could only check arrays.
    ```html
    // If the value is an array.
    let value = [5, 6];
    {{empty value}} => false

    {{#if (empty value)}}
      Hello
    {{/if}}

    // If the value is a string.
    let value = 'Hello';
    {{empty value}} => false
 
    let value = '';
    {{empty value}} => true
 
    let value = ' ';
    {{empty value}} => true
    ```

- Added not_empty view helper.
    ```html
    // If the value is an array.
    let value = [5, 6];
    {{not_empty value}} => true

    {{#if (not_empty value)}}
      Hello
    {{/if}}

    // If the value is a string.
    let value = 'Hello';
    {{not_empty value}} => true

    let value = '';
    {{not_empty value}} => false

    let value = ' ';
    {{not_empty value}} => false
    ```

## [1.0.13] - 2021/12/13
### Fixed
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
      // Output: New title of book: When Im Gone
      await book.reload();
      console.log(`New title of book: ${book.title}`);
    } catch (err) {
      if (transaction)
        await transaction.rollback();
    }
    ```

## [1.0.12] - 2021/11/16
### Fixed
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
### Fixed
- Added face similarity found to face search results in collection.

    ```js
    import * as sweet from 'express-sweet';

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
    const collectionId = 'MyCollection';
    const res = await client.searchFaces(collectionId, 'img/face.jpg');
    console.log('Face search results:', res);
    ```

## [1.0.9] - 2021/10/13
### Fixed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
  This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
  Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.8] - 2021/9/25
### Fixed
- Fixed a bug where the default router couldn't aqua from the endpoint URL.

## [1.0.7] - 2021/8/13
### Fixed
- Added where member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

## [1.0.6] - 2021/8/13
### Fixed
- Added fn, col and literal member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

## [1.0.5] - 2021/8/12
### Fixed
- Changed the maximum size per field for multipart (multipart/form-data) requests from 1MB to unlimited.

## [1.0.4] - 2021/6/13
### Fixed
- Fixed a bug where the referrer URL was set in app.locals.currentPath instead of the current URL.

## [1.0.3] - 2021/6/13
### Fixed
- Change the current URL path of a local variable.app.locals.currentPath is a USVString containing an initial '/' followed by the path of the URL not including the query string or fragment.

    ```js
    // For example, when the current URL is "https://example.com/docs/api?q=value", "/docs/api" is set for "app.locals.currentPath".
    console.log(app.locals.currentPath);
    ```

## [1.0.2] - 2021//6/10
### Fixed
- Updated rollup from version 2.44 to 2.51.
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