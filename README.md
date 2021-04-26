<a href="https://takuya-motoshima.github.io/express-sweet/"><img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/logo.svg" height="140"></a>

Extend Express functionality with Express Sweet and start developing fast, minimal web applications.

## Introduction

The package elements that make up this extension.  
In addition, some packages have been customized to make them easier for developers to use.  

* Framework  
    The framework uses Expess v4.  
    Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* URI Routing  
    Express Sweet automatically maps the URL to express.Router defined in the routes directory.
* Model  
    The model uses Sequelize v6.  
    Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
* View  
    The view template engine uses Handlebars v4.  
    Handlebars is a simple templating language.  
    It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.
* User authentication  
    User authentication uses Passport v0.4.1.  
    Passport is Express-compatible authentication middleware for Node.js.
* Service  
    Sweet includes a convenient interface for developing applications using "Amazon Rekognition" and "Google Cloud Vision".
* Utils  
    With Sweet, you can quickly use a variety of generic utility classes.

## Docs

* [Website and Documentation](https://takuya-motoshima.github.io/express-sweet/) - [[website repo](https://github.com/takuya-motoshima/express-sweet)]
* [Changelog](./CHANGELOG.md)

## Quick Start

The quickest way to get started with Express Sweet is to utilize the executable `express-sweet(1)` to generate an application as shown below.  
The application created here includes the following screens from the beginning.  

<table>
    <tr>
        <td valign="top">
            <div>Login</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/screencaps/login.png" width="400">
        </td>
        <td valign="top">
            <div>Home</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/screencaps/home.png" width="400">
        </td>
    </tr>
    <tr>
        <td valign="top">
            <div>User list</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/screencaps/user-list.png" width="400">
        </td>
        <td valign="top">
            <div>New user</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/screencaps/new-user.png" width="400">
        </td>
    </tr>
    <tr>
        <td valign="top">
            <div>Edit user</div>
            <img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/screencaps/edit-user.png" width="400">
        </td>
    </tr>
</table>

Install the executable. The executable's major version will match Express Sweet's.

```sh
npm install -g express-sweet-generator;
```

Create the app.

```sh
express-sweet /tmp/foo && cd /tmp/foo;
```

Install dependencies.

```sh
npm install;
```

Create DB.

```sh
CREATE DATABASE IF NOT EXISTS `example` DEFAULT CHARACTER SET utf8mb4;

USE `example`;

CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(30) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukAccount1` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`email`, `password`, `name`) VALUES
  ('robin@example.com', 'password', 'Robin'),
  ('taylor@example.com', 'password', 'Taylor'),
  ('vivian@example.com', 'password', 'Vivian'),
  ('harry@example.com', 'password', 'Harry'),
  ('eliza@example.com', 'password', 'Eliza'),
  ('nancy@example.com', 'password', 'Nancy'),
  ('melinda@example.com', 'password', 'Melinda'),
  ('harley@example.com', 'password', 'Harley');
```

Start your Express Sweet app at `http://localhost:3000/`.

```bash
npm start;
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).  
Before installing, [download and install Node.js](https://nodejs.org/en/download/).  
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).  
Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

Install Express Sweet and dependent packages.  

```bash
npm i express-sweet \
      express \
      express-hbs \
      express-session \
      sequelize \
      passport \
      passport-local \
      aws-sdk;
```

Follow [our installing guide](http://expressjs.com/en/starter/installing.html) for more information.

## License

[MIT](LICENSE)