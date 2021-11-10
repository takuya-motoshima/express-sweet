# Changelog

All notable changes to this project will be documented in this file.

## [1.0.11] - 2021-11-10
### Fixed
- Fixed a bug that the database config was read before NODE_ENV was set and the database config matching NODE_ENV could not be read.

## [1.0.10] - 2021-10-19
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

## [1.0.9] - 2021-10-13
### Fixed
- Updated dependent package'sharp'from 0.25.4 to 0.29.1.  
  This update statically links sharp's pre-built libvips binaries, eliminating the need to install Phton.  
  Click [here](https://sharp.pixelplumbing.com/changelog) for sharp change log.

## [1.0.8] - 2021-09-25
### Fixed
- Fixed a bug where the default router couldn't aqua from the endpoint URL.

## [1.0.7] - 2021-08-13
### Fixed
- Added where member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

## [1.0.6] - 2021-08-13
### Fixed
- Added fn, col and literal member functions to Model class. Please see [here](https://takuya-motoshima.github.io/express-sweet/#model-class) for details.

## [1.0.5] - 2021-08-12
### Fixed
- Changed the maximum size per field for multipart (multipart/form-data) requests from 1MB to unlimited.

## [1.0.4] - 2021-06-13
### Fixed
- Fixed a bug where the referrer URL was set in app.locals.currentPath instead of the current URL.

## [1.0.3] - 2021-06-13
### Fixed
- Change the current URL path of a local variable.app.locals.currentPath is a USVString containing an initial '/' followed by the path of the URL not including the query string or fragment.

    ```js
    // For example, when the current URL is "https://example.com/docs/api?q=value", "/docs/api" is set for "app.locals.currentPath".
    console.log(app.locals.currentPath);
    ```

## [1.0.2] - 2021-06-10
### Fixed
- Updated rollup from version 2.44 to 2.51.
- Fixed a bug where preloading models failed in cjs.

## [1.0.1] - 2021-06-02
### Fixed
- Fixed a bug that caused an error when reading options defined in ESM's default Export.

[1.0.1]: https://github.com/takuya-motoshima/express-sweet/commit/bd6bf98b7e12f3daca834610b2cb7ad4997ec868
[1.0.2]: https://github.com/takuya-motoshima/express-sweet/commit/8f7fba9d4875661a02f74327f3ec2298ce76290d
[1.0.3]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.2...v1.0.3
[1.0.4]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.3...v1.0.4
[1.0.5]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.4...v1.0.5
[1.0.6]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.5...v1.0.6
[1.0.7]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.6...v1.0.7
[1.0.8]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.7...v1.0.8
[1.0.9]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.8...v1.0.9
[1.0.10]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.9...v1.0.10