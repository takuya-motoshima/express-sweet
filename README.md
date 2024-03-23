# Express Sweet
This is an extension of Express.

- [Express Sweet](#express-sweet)
    - [Documentation](#documentation)
    - [Quick Start](#quick-start)
    - [How to start the demo with Docker](#how-to-start-the-demo-with-docker)
    - [Release Notes](#release-notes)
    - [Testing](#testing)
    - [Author](#author)
    - [License](#license)

## Documentation
For Express Sweet documentation, please click [here](https://takuya-motoshima.github.io/express-sweet/v1/).

## Quick Start
See [here](QUICK_START.md).

## How to start the demo with Docker
See [here](demo/README.md).

## Release Notes
All changes can be found [here](CHANGELOG.md).

- ### [1.1.1] - 2024/3/23
    #### Changed
    - When cookie security is enabled (`config/authentication.js#cookie_secure`) and the application is running on the HTTP protocol, the following warning message is output upon user authentication.
        ```sh
        Warning: Cookie security must be disabled for user authentication to work over the HTTP protocol (config/authentication.js#cookie_secure)
        ```
- ### [1.1.0] - 2024/3/6
    #### Changed
    - Updated Express Sweet's dependency packages.
        - [express](https://www.npmjs.com/package/express) from v4.18.2 to v4.18.3
        - [multer](https://www.npmjs.com/package/multer) from v1.4.4 to v1.4.5-lts.1
        - [express-session](https://www.npmjs.com/package/express-session) from v1.17.3 to v1.18.0
        - [sequelize](https://www.npmjs.com/package/sequelize) from v6.32.0 to v6.37.1
        - [mariadb](https://www.npmjs.com/package/mariadb) from v2.4.0 to v3.2.3
        - [moment](https://www.npmjs.com/package/moment) from v2.29.4 to v2.30.1
    - Update [metronic-extension](https://www.npmjs.com/package/metronic-extension) of the demo from v1.0.1 to v3.0.9.

    #### Added
    - Demo (./demo) Docker environment added. See [here](demo/README.md) for details.

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)