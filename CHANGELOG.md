# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2021-06-13
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
[1.0.3]: 
