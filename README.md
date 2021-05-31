<a href="https://takuya-motoshima.github.io/express-sweet/"><img src="https://raw.githubusercontent.com/takuya-motoshima/express-sweet/main/logo.svg" height="140"></a>

Extend Express functionality with Express Sweet and start developing fast, minimal web applications.

## Docs

* <a href="https://takuya-motoshima.github.io/express-sweet/" target="_blank">Website and Documentation</a> - <a href="https://github.com/takuya-motoshima/express-sweet" target="_blank">[website repo]</a>
* <a href="https://github.com/takuya-motoshima/express-sweet/blob/main/CHANGELOG.md" target="_blank">Changelog</a>

## Features

Extend Express functionality with Express Sweet and start developing fast, minimal web applications. The package elements that make up this extension.  
In addition, some packages have been customized to make them easier for developers to use.

* Framework  
    The framework uses <a href="https://expressjs.com/" target="_blank">Expess v4</a>.
    Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* Automatic URL routing  
    Express Sweet automatically maps the URL to express.Router defined in the routes directory.
    See <a href="https://takuya-motoshima.github.io/express-sweet/#routing" target="_blank">&quot;Routing reference&quot;</a> for details.
* Model  
    The model uses <a href="https://sequelize.org/master/" target="_blank">Sequelize v6</a>.
    Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
    It features solid transaction support, relations, eager and lazy loading, read replication and more.
    See the <a href="https://takuya-motoshima.github.io/express-sweet/#model" target="_blank">&quot;Model reference&quot;</a> for details.
* View  
    The view template engine uses <a href="https://handlebarsjs.com/" target="_blank">Handlebars v4</a>.
    Handlebars is a simple templating language.
    It uses a template and an input object to generate HTML or other text formats.
    Handlebars templates look like regular text with embedded Handlebars expressions.
    See the <a href="https://takuya-motoshima.github.io/express-sweet/#views" target="_blank">&quot;View reference&quot;</a> for more details.
* User authentication  
    User authentication uses <a href="https://www.passportjs.org/docs/" target="_blank">Passport v0.4.1</a>.
    Passport is Express-compatible authentication middleware for Node.js.
    See the <a href="https://takuya-motoshima.github.io/express-sweet/#user-authentication" target="_blank">&quot;Authentication Reference&quot;</a> for more information.
* Service  
    Express Sweet includes convenient classes for developing applications using <a href="https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html" target="_blank">&quot;Amazon Rekognition&quot;</a> and classes for easy user authentication.
    For more information on Rekognition, see <a href="https://takuya-motoshima.github.io/express-sweet/#rekognition" target="_blank">&quot;Rekognition Reference&quot;</a>.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).  
Before installing, [download and install Node.js](https://nodejs.org/en/download/).  
Node.js 0.10 or higher is required.  

For details on installing Express Sweet, see the <a href="https://takuya-motoshima.github.io/express-sweet/#started-installation" target="_blank">&quot;installation reference&quot;</a>.

## Quick Start

The easiest way to get started with Express Sweet is to install express-sweet-generator and automatically create a template application.  
From the beginning, the template includes the following screen and sample programs such as router, model class, and authentication.  
Please refer to these and start developing your application.  
See <a href="https://takuya-motoshima.github.io/express-sweet/#started-generator" target="_blank">&quot;Express Sweet app generator&quot;</a> for more information on how to use express-sweet-generator.

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

## License

[MIT](LICENSE)