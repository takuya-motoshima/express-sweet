# Changelog

All notable changes to this project will be documented in this file.

## [1.0.14] - 2022-01-17
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

## [1.0.13] - 2021-12-13
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

## [1.0.12] - 2021-11-16
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
[1.0.11]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.10...v1.0.11
[1.0.12]: https://github.com/takuya-motoshima/express-sweet/compare/v1.0.11...v1.0.12