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

- ### [1.1.0] - Undecided.
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
- ### [1.0.44] - 2023/12/30
    #### Changed
    - The `Secure` and `HttpOnly` attributes of the session cookie can now be set from the authentication configuration file (`config/authentication.js`).

        config/authentication.js:
        ```js
        /**
        * Specifies the boolean value for the Secure Set-Cookie attribute.
        * The default is true, which sets the Secure attribute on the cookie.
        * @type {boolean|undefined}
        */
        cookie_secure: true,

        /**
        * Specifies the boolean value for the HttpOnly Set-Cookie attribute. 
        * Defaults to true, which sets the HttpOnly attribute on the cookie.
        * @type {boolean|undefined}
        */
        cookie_httpOnly: true,
        ```

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