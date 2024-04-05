# Express Sweet
This is an extension of Express.

## Documentation
The latest API reference for Express Sweet can be found [here](https://takuya-motoshima.github.io/express-sweet/v2/).

The API reference for previous versions can be found [here](https://takuya-motoshima.github.io/express-sweet/v1/).

## Quick Start
See [here](QUICK_START.md).

## How to start the demo with Docker
See [here](demo/README.md).

## Release Notes
All changes can be found [here](CHANGELOG.md).

- ## [2.0.1] - 2024/4/5
    ### Changed
    - Removed [nodejs-shared](https://www.npmjs.com/package/nodejs-shared) package dependency.
- ### [2.0.0] - 2024/3/24
    #### Changed
    - Express Sweet version 2 no longer depends on the AWS SDK.  
        The `services.AWSRekognitionClient` and `services.AWSSesClient` have been migrated to the [AWS SDK Extension](https://www.npmjs.com/package/aws-sdk-extension) NPM package, so please install from there if needed.

<!-- ## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
``` -->

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)