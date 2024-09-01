# express-sweet
This is an extension of Express.

## Documentation
- express-sweet V2 Documentation: [https://takuya-motoshima.github.io/express-sweet/v2/](https://takuya-motoshima.github.io/express-sweet/v2/)
- express-sweet V1 documentation: [https://takuya-motoshima.github.io/express-sweet/v1/](https://takuya-motoshima.github.io/express-sweet/v1/)

## Quick Start
See [here](QUICK_START.md).

## How to start the demo with Docker
See [here](demo/README.md).

## Release Notes
All changes can be found [here](CHANGELOG.md).

- ### [2.0.2] - 2024/9/1
    #### Changed
    - Update express from 4.18.3 to 4.19.2.
    - Update rollup from 2.79.1 to 4.21.2.
    - Rename build files (build.common.js => build.cjs, build.esm.js => build.mjs).
    - The express package was excluded from the build file. Instead, users should install express on their own.
- ### [2.0.1] - 2024/4/5
    #### Changed
    - Removed [nodejs-shared](https://www.npmjs.com/package/nodejs-shared) package dependency.
        The `services.AWSRekognitionClient` and `services.AWSSesClient` have been migrated to the [AWS SDK Extension](https://www.npmjs.com/package/aws-sdk-extension) NPM package, so please install from there if needed.

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)