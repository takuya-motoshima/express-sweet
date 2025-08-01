# Changelog
All notable changes to this project will be documented in this file.

## [2.0.8] - 2025/7/29

### Changed

- Updated the usage example of the `isConnect` method in the `Database` class in the README reference.

## [2.0.7] - 2025/7/22

### Changed

- Updated dependencies to address vulnerabilities
    - `express`: 4.19.2 => 4.21.2
    - `express-session`: 1.18.0 => 1.18.2
    - `body-parser`: 1.19.0 => 2.2.0
    - `cookie-parser`: 1.4.4 => 1.4.7
    - `morgan`: 1.10.0 => 1.10.1
    - `rollup`: 4.21.2 => 4.45.1

## [2.0.6] - 2025/2/9

### Fixed

- Fixed a bug that caused redirection to fail when a path with query parameters was set for the logout redirect URL (`failure_redirect` in `config/authentication.js`).

## [2.0.5] - 2025/2/4

### Added

- Added a Handlebars helper, available for use in views, to replace HTML tags in a string.

    Example:

    ```html
    {{!-- results in: lorem ipsum dolor sit amet --}}
    {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>'}}}

    {{!-- results in: lorem ipsum <strong>dolor</strong> sit amet --}}
    {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' '<strong>' ''}}}

    {{!-- results in: 🍩lorem ipsum 🍩dolor🍩 🍩sit🍩 amet🍩 --}}
    {{{stripTags '<a href="https://example.com">lorem ipsum <strong>dolor</strong> <em>sit</em> amet</a>' [] '🍩'}}}
    ```

## [2.0.4] - 2025/1/14

### Changed

- Refactored variable names.
- Fix Docker demo.
- Changed the directory name for storing custom error classes in the demo from `exceptions` to `errors`.
- Added a section to the README.md API reference about considerations when using the `hasMany` association with the `findAll` method.

### Added

- **`findObjectInArray` Handlebars helper:**  This helper is added to the view, allowing you to find an object in an array based on a specified field name and value.

    Example:

    ```html
    {{!-- 
        items is an array of objects: [{id: 123, name: 'Item A'}, {id: 456, name: 'Item B'}]
        This code will output: "Item A" 
    --}}
    {{#each items}}
        {{#if (eq id 123)}}
            {{lookup (findObjectInArray ../items 'id' id) 'name'}}
        {{/if}}
    {{/each}}
    ```

## [2.0.3] - 2024/9/3

### Changed

- Add `"type": "module"` to the `package.json` of the esm app generated by `express-sweet-generator`. It is fully esm compliant.
- `require` was changed to dynamic import.
- Template engine changed from `express-hbs` to `express-handlebars`.  
    However, the `block` and `contentFor` helpers are still available.
- `database/Database` has been changed from a `sequelize.Sequelize` instance to a `sequelize.Sequelize` class. If you use it in the future, you need to instantiate it.
- Return type of `mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/CORS.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/Environment.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/ErrorHandler.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/Http.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/Local.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/Router.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/View.mount()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/View.mountBeforeRender()` changed from `void` to `Promise<void>`.
- Return type of `middlewares/Authentication.mount()` changed from `void` to `Promise<void>`.
- Return type of `utils/loadAuthenticationConfig()` changed from `AuthenticationConfig` to `Promise<AuthenticationConfig>`.
- Return type of `utils/loadBasicConfig()` changed from `BasicConfig` to `Promise<BasicConfig>`.
- Return type of `utils/loadDatabaseConfig()` changed from `sequelize.Options` to `Promise<sequelize.Options>`.
- Return type of `utils/loadViewConfig()` changed from `ViewConfig` to `Promise<ViewConfig>`.
- Return type of `services/Authentication.successRedirect()` changed from `void` to `Promise<void>`.
- Return type of `services/Authentication.failureRedirect()` changed from `void` to `Promise<void>`.
- Return type of `database/Model.initialize()` changed from `typeof Model` to `Promise<typeof Model>`.
- Return type of `database/loadModels()` changed from `void` to `Promise<void>`.
- DB connection check method has been changed.
    - After:
        ```js
        const expressExtension = require('express-sweet');

        // Create Database instance.
        const config = await expressExtension.utils.loadDatabaseConfig();
        const database = new expressExtension.database.Database(config.database, config.username, config.password, config);

        // Check database connection.
        await database.isConnect();
        ```
    - Before:
        ```js
        const expressExtension = require('express-sweet');

        // Check database connection.
        await expressExtension.database.Database.isConnect();
        ```
- Update passport from 0.4.1 to 0.7.0
  
## [2.0.2] - 2024/9/1

### Changed

- Update express from 4.18.3 to 4.19.2.
- Update rollup from 2.79.1 to 4.21.2.
- Rename build files (build.common.js => build.cjs, build.esm.js => build.mjs).
- The express package was excluded from the build file. Instead, users should install express on their own.

## [2.0.1] - 2024/4/5

### Changed

- Removed [nodejs-shared](https://www.npmjs.com/package/nodejs-shared) package dependency.

## [2.0.0] - 2024/3/24

### Changed

- EXPRESS SWEET version 2 no longer depends on the AWS SDK.  
    The `services.AWSRekognitionClient` and `services.AWSSesClient` have been migrated to the [AWS SDK Extension](https://www.npmjs.com/package/aws-sdk-extension) NPM package, so please install from there if needed.

## [1.1.1] - 2024/3/23

### Changed

- When cookie security is enabled (`config/authentication.js#cookie_secure`) and the application is running on the HTTP protocol, the following warning message is output upon user authentication.
  ```bash
  Warning: Cookie security must be disabled for user authentication to work over the HTTP protocol (config/authentication.js#cookie_secure)
  ```

## [1.1.0] - 2024/3/6

### Changed

- Updated EXPRESS SWEET's dependency packages.
    - [express](https://www.npmjs.com/package/express) from v4.18.2 to v4.18.3
    - [multer](https://www.npmjs.com/package/multer) from v1.4.4 to v1.4.5-lts.1
    - [express-session](https://www.npmjs.com/package/express-session) from v1.17.3 to v1.18.0
    - [sequelize](https://www.npmjs.com/package/sequelize) from v6.32.0 to v6.37.1
    - [mariadb](https://www.npmjs.com/package/mariadb) from v2.4.0 to v3.2.3
    - [moment](https://www.npmjs.com/package/moment) from v2.29.4 to v2.30.1

## [1.0.44] - 2023/12/30

### Changed

- The `Secure` and `HttpOnly` attributes of the session cookie can now be set from the authentication configuration file (`config/authentication.js`).

## [1.0.43] - 2023/12/30

### Changed

- The cookie name for storing session IDs can now be set in the `cookie_name` field of the authentication configuration file (`config/authentication.js`).  

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

## [1.0.36] - 2023/7/12

### Changed

- Moved the Ajax determination option (is_ajax) in the authentication configuration (config/authentication.js) to the basic configuration (config/config.js).  
- The error handle option (error_handler) in the basic configuration (config/config.js) has been removed and an option to hook error handles (hook_handle_error) added instead.

## [1.0.35] - 2023/7/11

### Changed

- The URL to redirect to when login fails (failure_redirect) option in the authentication configuration (config/authentication.js) can now be defined with a function.  
- The arguments of the failureRedirect method of the authentication service class (services/Authentication) have changed. The argument to the Authentication.failureRedirect method used to be just express.Response, but now it requires express.Request and express.Response.

## [1.0.34] - 2023/7/1

### Changed

- Changed the response status code from 403 to 401 when asynchronous communication requiring authentication fails to authenticate.

## [1.0.33] - 2023/7/1

### Added

- Added regular expression comparison view helper.

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

## [1.0.30] - 2023/6/26

### Changed

- Fixed AWS Rekognition credentials passing.

## [1.0.29] - 2023/6/20

### Changed

- Changed class private variables and methods from soft private to hard private.
  
### Added

- Added AWS SES email sending client class.

## [1.0.28] - 2023/6/16

### Changed

- Updated AWS SDK version from 2 to 3.  

## [1.0.27] - 2023/6/12

### Changed

- Request object has been added to the arguments of the beforeRender function in the view configuration (config/view.js).

## [1.0.26] - 2023/6/11

### Changed

- Update Sequelize from v5 to v6.
- Changed the framework debug log to output only when the environment variable EXPRESS_DEBUG is defined.  
    .env:
    ```
    EXPRESS_DEBUG=true
    ```

## [1.0.25] - 2022/11/24

### Added

- Added formatBytes view helper to convert bytes to appropriate units.

## [1.0.24] - 2022/10/24

### Added

- Added is_ajax option to user authentication (config/authentication.js).

## [1.0.23] - 2022/10/20

### Added

- A request body object has been added to the parameters of the callback function for user authentication.  

## [1.0.22] - 2022/7/27

### Added

- You can now set hook functions that are called before the view is rendered. Hook functions can be used, for example, to set local variables that can be used in the view.  

## [1.0.21] - 2022/526

### Added

- Added an option to the face indexing method to retrieve details (gender, emotion, age group) of indexed faces.

## [1.0.20] - 2022/5/25

### Added

- Added an option to get details (emotion, gender, age group) to the face detection method.

## [1.0.19] - 2022/5/20

### Added

- Add date format helper to view.

## [1.0.18] - 2022/5/18

### Added

- User authentication sessions can now be stored in redis. To use redis for session storage, simply add the following option to config/authentication.js. Please give it a try.  
    config/authentication.js:  
    ```json
    session_store: 'redis',
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

      // Load updated data.
      await book.reload();
    } catch (error) {
      if (transaction)
        await transaction.rollback();
    }
    ```

## [1.0.12] - 2021/11/16

### Added

- Added a method to the model that can execute raw SQL. As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the Model.query method.  
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
[2.0.2]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.1...v2.0.2
[2.0.3]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.2...v2.0.3
[2.0.4]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.3...v2.0.4
[2.0.5]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.4...v2.0.5
[2.0.6]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.5...v2.0.6
[2.0.7]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.6...v2.0.7