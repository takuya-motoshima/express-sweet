# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0] - 2025-12-19

### Breaking Changes

**Middleware Architecture Refactoring**
- All middleware components have been refactored from class-based to function-based architecture
- Middleware naming updated to follow Express.js conventions (2-word composition pattern)

  **Middleware Name Changes:**
  | Previous (Class-based) | Current (Function-based) |
  |------------------------|--------------------------|
  | `CORS` | `corsPolicy` |
  | `Environment` | `envLoader` |
  | `ErrorHandler` | `errorHandler` |
  | `Http` | `requestParser` |
  | `Local` | `localVars` |
  | `Router` | `routeMapper` |
  | `View` | `viewEngine` |
  | `Authentication` | `passportAuth` |
  | `Global` | `globalVars` |

  **Migration Notes:**
  - These are internal changes and do not affect the public API
  - The `mount()` function handles all middleware automatically
  - No changes required in application code for standard usage

**Express 5 Migration**
- **Requires Node.js 18.x or higher**
- Upgraded from Express 4.21.2 to Express 5.2.1
- Note: `express-handlebars` remains at v7.1.3 to maintain Node.js 18+ compatibility (v8 requires Node.js 20+)
- Route patterns with regex parameters no longer support `/:param(\\d+)` syntax
  - Use RegExp with named capture groups instead: `/^\/(?<userId>\d+)$/`
  - See migration example in Changed section below
- For more details on Express 5 changes, see:
  - [Express 5 Migration Guide](https://expressjs.com/en/guide/migrating-5.html)
  - [Express.js Release Notes](https://expressjs.com/en/changelog/)

### Added

**File Upload Support (Multer)**
- Added dynamic file upload middleware using Multer
- New `config/upload.js` configuration file for flexible upload handling
- Support for single file, multiple files (array), and multiple field uploads
- Both memory storage and disk storage options
- Request-based middleware resolution for route-specific upload configurations
- Sample configurations added:
  - [ESM Configuration](configuration_sample/esm/upload.js)
  - [CJS Configuration](configuration_sample/cjs/upload.js)

### Changed

**Express 5 Compatibility Updates**
- Added `query parser: 'extended'` setting in HTTP middleware to maintain Express 4 behavior for nested query objects
- Added `multer().none()` middleware to parse `multipart/form-data` requests without files

**Route Pattern Migration Example**
```js
// Before (Express 4)
router.get('/:userId(\\d+)', (req, res) => {
  const userId = req.params.userId; // Works
});

// After (Express 5)
router.get(/^\/(?<userId>\d+)$/, (req, res) => {
  const userId = req.params.userId; // Works with named capture group
});
```

### Fixed

- Fixed `ERR_INVALID_URL` error when invalid Host header values are provided
- `baseUrl` is now set to `undefined` when URL construction fails, allowing graceful error handling via `rewrite_base_url` hook or template checks

## [3.0.2] - 2025-11-28

### Changed

**CORS Middleware Enhancements**
- Added `Authorization` header support for Bearer token and API key authentication
- Added cache control headers (`Cache-Control`, `If-None-Match`, `If-Modified-Since`) for conditional requests
- Added `Range` header support for partial content and resumable downloads
- Added `X-CSRF-Token` header support for CSRF protection
- Added explicit handling for OPTIONS preflight requests

**Demo Improvements**
- Added new REST API demo showcasing CORS functionality with simple CRUD endpoints

## [3.0.1] - 2025-09-02

### Changed

- Added pool configuration examples and JSDoc documentation to sample database configuration.
  - [ESM Configuration](configuration_sample/esm/database.js)
  - [CJS Configuration](configuration_sample/cjs/database.js)

## [3.0.0] - 2025-08-26

This release introduces significant improvements to database layer architecture and adds configurable logging support.

### Breaking Changes

**Database Layer Refactoring**
- `Database` class removed → Use `DatabaseManager` singleton pattern
- All models now share a single database connection for improved performance
- Enhanced database management with connection testing and graceful shutdown

### Added

#### Database Management
- **`DatabaseManager.getInstance()`** - Get singleton Sequelize database instance
- **`DatabaseManager.isConnected()`** - Test database connectivity
- **`DatabaseManager.getConfig()`** - Access original database configuration
- **`DatabaseManager.getSequelizeOptions()`** - Access runtime Sequelize options
- **`DatabaseManager.close()`** - Graceful database connection shutdown

#### Logging Configuration
- **`config/logging.js`** - Morgan logging configuration support

  Create `config/logging.js` to customize HTTP request logging:
  ```js
  // config/logging.js
  export default {
    format: 'combined',    // Options: 'combined', 'common', 'dev', 'short', 'tiny'
    skip: (req, res) => {
      // Skip logging for health check endpoints
      return req.path === '/health';
    }
  };
  ```
  
  **Default behavior**: Uses 'combined' format with no skip conditions if config file is not provided.

### Changed

- Updated `sequelize` dependency from v6.37.1 to v6.37.7

### Migration Guide

**Database Usage Migration:**
```js
// v2.x - Old way
import * as expx from 'express-sweet';

const config = await expx.utils.loadDatabaseConfig();
const db = new expx.database.Database(config.database, config.username, config.password, config);

// v3.x - New way
import * as expx from 'express-sweet';

const db = await expx.database.DatabaseManager.getInstance();
```

## [2.0.9] - 2025-08-12

### Added

- Added `getConfig()` method to Database class to retrieve the current database configuration object containing all sequelize options.

### Changed

- Updated `multer` dependency from v1.4.5-lts.1 to v2.0.2 for improved file upload handling and security enhancements.

## [2.0.8] - 2025-07-29

### Changed

- Updated the usage example of the `isConnect` method in the `Database` class in the README reference.

## [2.0.7] - 2025-07-22

### Changed

- Updated dependencies to address vulnerabilities
	- `express`: 4.19.2 => 4.21.2
	- `express-session`: 1.18.0 => 1.18.2
	- `body-parser`: 1.19.0 => 2.2.0
	- `cookie-parser`: 1.4.4 => 1.4.7
	- `morgan`: 1.10.0 => 1.10.1
	- `rollup`: 4.21.2 => 4.45.1

## [2.0.6] - 2025-02-09

### Fixed

- Fixed a bug that caused logout redirection to fail when the redirect URL contained query parameters.

## [2.0.5] - 2025-02-04

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

## [2.0.4] - 2025-01-14

### Changed

- Refactored variable names.
- Fixed Docker demo.
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

## [2.0.3] - 2024-09-03

> **Note:** This version used class-based middleware with names like `CORS`, `Environment`, `ErrorHandler`, `Http`, `Local`, `Router`, `View`, and `Authentication`. In v3.x and later, these were refactored to function-based middleware with new names (`corsPolicy`, `envLoader`, `errorHandler`, `requestParser`, `localVars`, `routeMapper`, `viewEngine`, `passportAuth`). The items listed below reflect the naming and structure used in v2.0.3.

### Breaking Changes

**Template Engine Migration**
- Template engine changed from `express-hbs` to `express-handlebars`.
	However, the `block` and `contentFor` helpers are still available for backward compatibility.

**Database Layer Changes**
- `database/Database` has been changed from a `sequelize.Sequelize` instance to a `sequelize.Sequelize` class. If you use it in the future, you need to instantiate it.
- DB connection check method has been changed.
	- After:
		```js
		const expx = require('express-sweet');

		// Create Database instance.
		const config = await expx.utils.loadDatabaseConfig();
		const database = new expx.database.Database(config.database, config.username, config.password, config);

		// Check database connection.
		await database.isConnect();
		```
	- Before:
		```js
		const expx = require('express-sweet');

		// Check database connection.
		await expx.database.Database.isConnect();
		```

**Async Function Signature Changes**
- All middleware mount methods, configuration loaders, authentication services, and database initialization functions now return `Promise` types instead of synchronous return types. This change enables asynchronous configuration loading and proper async/await usage throughout the framework.

### Changed

- Added `"type": "module"` to the `package.json` of the ESM app generated by `express-sweet-generator`. It is now fully ESM compliant.
- `require` was changed to dynamic import.
- Updated passport from 0.4.1 to 0.7.0
  
## [2.0.2] - 2024-09-01

### Changed

- Updated express from 4.18.3 to 4.19.2.
- Updated rollup from 2.79.1 to 4.21.2.
- Renamed build files (build.common.js => build.cjs, build.esm.js => build.mjs).
- The express package was excluded from the build file. Instead, users should install express on their own.

## [2.0.1] - 2024-04-05

### Changed

- Removed [nodejs-shared](https://www.npmjs.com/package/nodejs-shared) package dependency.

## [2.0.0] - 2024-03-24

### Breaking Changes

**AWS SDK Removal**
- EXPRESS SWEET version 2 no longer depends on the AWS SDK.
	The `services.AWSRekognitionClient` and `services.AWSSesClient` have been migrated to the [AWS SDK Extension](https://www.npmjs.com/package/aws-sdk-extension) NPM package, so please install from there if needed.

## [1.1.1] - 2024-03-23

### Changed

- When cookie security is enabled and the application runs over HTTP, a warning message is now displayed during user authentication to prevent authentication issues caused by secure cookie settings incompatible with the HTTP protocol.

## [1.1.0] - 2024-03-06

### Changed

- Updated EXPRESS SWEET's dependency packages.
	- [express](https://www.npmjs.com/package/express) from v4.18.2 to v4.18.3
	- [multer](https://www.npmjs.com/package/multer) from v1.4.4 to v1.4.5-lts.1
	- [express-session](https://www.npmjs.com/package/express-session) from v1.17.3 to v1.18.0
	- [sequelize](https://www.npmjs.com/package/sequelize) from v6.32.0 to v6.37.1
	- [mariadb](https://www.npmjs.com/package/mariadb) from v2.4.0 to v3.2.3
	- [moment](https://www.npmjs.com/package/moment) from v2.29.4 to v2.30.1

## [1.0.44] - 2023-12-30

### Changed

- The `Secure` and `HttpOnly` attributes of session cookies can now be configured through the authentication configuration file.

## [1.0.43] - 2023-12-30

### Changed

- Session cookie name is now configurable through the authentication configuration file.  

## [1.0.42] - 2023-08-31

### Changed

- Updated TypeScript version from 4.8.4 to 5.2.2.
- Updated redis dependency packages used for user authentication.
	- Updated redis package version from 4.3.1 to 4.6.8.  
		[Here](https://github.com/redis/node-redis/blob/master/CHANGELOG.md) are the changes.
	- Updated connect-redis package version from 6.1.3 to 7.1.0.  
		[Here](https://github.com/tj/connect-redis/releases) are the changes.


## [1.0.41] - 2023-08-04

### Changed

- Added an option to the method that searches for faces in the collection to throw an exception if a face is not found or if multiple faces are found.

## [1.0.40] - 2023-08-04

### Changed

- Fixed to return null instead of throwing an error when looking for faces in the collection using images without faces (<code>AWSRekognitionClient.searchFaces()</code>).

## [1.0.39] - 2023-07-24

### Changed

- Renamed AWS Rekognition exception classes to more descriptive names. All face-related error classes now follow a consistent naming pattern with "Face" prefix and "Failed"/"Missing"/"Multiple" suffixes for better clarity and error handling.

## [1.0.38] - 2023-07-17

### Fixed

- Fixed a bug that prevented login user data from being referenced in the view rendering hook function.

## [1.0.37] - 2023-07-17

### Changed

- The view rendering hook function now supports asynchronous functions for async operations before rendering.

### Added

- New Math-related view helpers have been added.  

## [1.0.36] - 2023-07-12

### Changed

- Moved the Ajax determination option (`is_ajax`) from authentication configuration to application configuration.
- The error handler option has been replaced with a hookable error handling mechanism (`hook_handle_error`) for more flexible error processing.

## [1.0.35] - 2023-07-11

### Changed

- The login failure redirect URL option can now be defined as a function for dynamic redirect behavior.
- Authentication service's `failureRedirect` method signature changed to accept both request and response objects instead of response only.

## [1.0.34] - 2023-07-01

### Changed

- Changed the response status code from 403 to 401 when asynchronous communication requiring authentication fails to authenticate.

## [1.0.33] - 2023-07-01

### Added

- Added regular expression comparison view helper.

## [1.0.32] - 2023-07-01

### Fixed

- Fixed a bug that prevented cookies from being accessed in the view rendering hook function.

## [1.0.31] - 2023-06-29

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

## [1.0.30] - 2023-06-26

### Changed

- Fixed AWS Rekognition credentials passing.

## [1.0.29] - 2023-06-20

### Changed

- Changed class private variables and methods from soft private to hard private.
  
### Added

- Added AWS SES email sending client class.

## [1.0.28] - 2023-06-16

### Changed

- Updated AWS SDK version from 2 to 3.  

## [1.0.27] - 2023-06-12

### Changed

- The view rendering hook function now receives the request object as an argument for accessing request data during rendering.

## [1.0.26] - 2023-06-11

### Changed

- Updated Sequelize from v5 to v6.
- Changed the framework debug log to output only when the environment variable SWEET_DEBUG is defined.  
	.env:
	```
	SWEET_DEBUG=true
	```

## [1.0.25] - 2022-11-24

### Added

- Added formatBytes view helper to convert bytes to appropriate units.

## [1.0.24] - 2022-10-24

### Added

- Added Ajax request detection option to authentication configuration for custom XHR/fetch request handling.

## [1.0.23] - 2022-10-20

### Added

- A request body object has been added to the parameters of the callback function for user authentication.  

## [1.0.22] - 2022-07-27

### Added

- You can now set hook functions that are called before the view is rendered. Hook functions can be used, for example, to set local variables that can be used in the view.  

## [1.0.21] - 2022-05-26

### Added

- Added an option to the face indexing method to retrieve details (gender, emotion, age group) of indexed faces.

## [1.0.20] - 2022-05-25

### Added

- Added an option to get details (emotion, gender, age group) to the face detection method.

## [1.0.19] - 2022-05-20

### Added

- Add date format helper to view.

## [1.0.18] - 2022-05-18

### Added

- User authentication sessions can now be stored in redis. To use redis for session storage, simply add the following option to config/authentication.js. Please give it a try.  
	config/authentication.js:  
	```json
	session_store: 'redis',
	redis_host: 'redis://localhost:6379'
	```

## [1.0.17] - 2022-05-17

### Changed

- Updated documentation and refactored variable names.

## [1.0.16] - 2022-02-14

### Fixed

- I forgot to include the build file, so I added the build file.

## [1.0.15] - 2022-02-14

### Changed

- The unauthenticated route pattern option now accepts both string and RegExp patterns for more flexible route matching.

## [1.0.14] - 2022-01-17

### Changed

- The empty view helper can now check any type. Previously it could only check arrays.

## [1.0.13] - 2021-12-13

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

## [1.0.12] - 2021-11-16

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

## [1.0.11] - 2021-11-10

### Fixed

- Fixed a bug where the database config was read before NODE_ENV was set, preventing the correct database config from being loaded.

## [1.0.10] - 2021-10-19

### Changed

- Added face similarity score to face search results in collection.

## [1.0.9] - 2021-10-13

### Changed

- Updated dependent package 'sharp' from 0.25.4 to 0.29.1.
  This update statically links sharp's pre-built libvips binaries, eliminating the need to install Python.  
  Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.8] - 2021-09-25

### Fixed

- Fixed a bug where the default router couldn't be accessed from the endpoint URL.

## [1.0.7] - 2021-08-13

### Added

- Added where member functions to Model class.

## [1.0.6] - 2021-08-13

### Added

- Added fn, col and literal member functions to Model class.

## [1.0.5] - 2021-08-12

### Changed

- Changed the maximum size per field for multipart (multipart/form-data) requests from 1MB to unlimited.

## [1.0.4] - 2021-06-13

### Fixed

- Fixed a bug where the referrer URL was set in app.locals.currentPath instead of the current URL.

## [1.0.3] - 2021-06-13

### Changed

- Changed the current URL path of a local variable. app.locals.currentPath is a USVString containing an initial '/' followed by the path of the URL, not including the query string or fragment.
	```js
	// For example, when the current URL is "https://example.com/docs/api?q=value", "/docs/api" is set for "app.locals.currentPath".
	console.log(app.locals.currentPath);
	```

## [1.0.2] - 2021-06-10

### Changed

- Updated rollup from version 2.44 to 2.51.

### Fixed

- Fixed a bug where preloading models failed in cjs.

## [1.0.1] - 2021-06-02

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
[2.0.8]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.7...v2.0.8
[2.0.9]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.8...v2.0.9
[3.0.0]: https://github.com/takuya-motoshima/express-sweet/compare/v2.0.9...v3.0.0
[3.0.1]: https://github.com/takuya-motoshima/express-sweet/compare/v3.0.0...v3.0.1
[3.0.2]: https://github.com/takuya-motoshima/express-sweet/compare/v3.0.1...v3.0.2
[4.0.0]: https://github.com/takuya-motoshima/express-sweet/compare/v3.0.2...v4.0.0