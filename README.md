# EXPRESS SWEET
EXPRESS SWEET is an extension of EXPRESS.

- [EXPRESS SWEET](#express-sweet)
    - [EXPRESS SWEET Generator](#express-sweet-generator)
    - [API](#api)
        - [Environment variable](#environment-variable)
        - [Base configuration](#base-configuration)
        - [Routing](#routing)
            - [Basic Routing](#basic-routing)
            - [Nested Routing](#nested-routing)
            - [Default Routing](#default-routing)
            - [Routing Methods](#routing-methods)
        - [View](#view)
            - [Configuration](#configuration)
            - [Syntax](#syntax)
            - [Layout](#layout)
            - [Comparison Helper](#comparison-helper)
            - [HTML Helper](#html-helper)
            - [Object Helper](#object-helper)
            - [String Helper](#string-helper)
            - [Date Helper](#date-helper)
            - [Number Helper](#number-helper)
            - [Math Helper](#math-helper)
        - [Model](#model)
            - [Configuration](#configuration-1)
            - [Accessing Model](#accessing-model)
            - [Creating Model](#creating-model)
            - [Database class extends sequelize.Sequelize](#database-class-extends-sequelizesequelize)
                - [Instance Methods](#instance-methods)
            - [Model Class extends sequelize.Model](#model-class-extends-sequelizemodel)
                - [Class Properties](#class-properties)
                - [Class Methods](#class-methods)
        - [Authentication](#authentication)
            - [Configuration](#configuration-2)
            - [Login Procedure](#login-procedure)
            - [Logout Procedure](#logout-procedure)
    - [Release Notes](#release-notes)
    - [Author](#author)
    - [License](#license)

## EXPRESS SWEET Generator
Use the application generator tool, `express-sweet-generator`, to quickly create an application skeleton.

![Image](screencaps/demonstration.webp)

1. Install and launch the application generator as a global npm package.
    ```sh
    npm install -g express-sweet-generator
    ```
1. Display the command options with the -h option.
    ```sh
    express-sweet -h

    Usage: express-sweet [options] [dir]

    Options:

            --version      output the version number
        -o, --output <output>  add output <module> support (esm|cjs) (defaults to cjs)
        -p, --port <port>  application listening port (default: 3000)
        -f, --force        force on non-empty directory
        -h, --help         output usage information
    ```
1. For example, the following creates an Express app named `myapp`. The app will be created in a folder named `myapp` in the current working directory.
    ```sh
    express-sweet -o esm myapp
    ```
1. Then install dependencies.
    ```sh
    cd myapp/
    npm install
    ```
1. The skeleton uses a DB. Please create a DB with the following SQL.
    ```sql
    CREATE DATABASE IF NOT EXISTS `sample_db` DEFAULT CHARACTER SET utf8mb4;

    USE `sample_db`;

    CREATE TABLE `user` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(30) NOT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(100) NOT NULL,
        `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()),
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukUserEmail` (`email`),
        UNIQUE KEY `ukUserIcon`(`icon`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `profile` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `address` varchar(255) NOT NULL,
        `tel` varchar(14) NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukProfileUserId` (`userId`),
        CONSTRAINT `fkProfileUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `comment` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `text` text NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        CONSTRAINT `fkCommentUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE `book` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `userId` int(10) unsigned NOT NULL,
        `title` text NOT NULL,
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukBookTitle` (`userId`, `title`(255)),
        CONSTRAINT `fkBookUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    INSERT INTO `user` (`id`, `email`, `password`, `name`, `icon`) VALUES
        (1, 'robin@example.com', 'password', 'Robin', '/upload/1.png'),
        (2, 'taylor@example.com', 'password', 'Taylor', '/upload/2.png');
    INSERT INTO `profile` (`userId`, `address`, `tel`) VALUES
        (1, '777 Brockton Avenue, Abington MA 2351', '202-555-0105'),
        (2, '30 Memorial Drive, Avon MA 2322', '');
    INSERT INTO `comment` (`userId`, `text`) VALUES
        (1, 'From Robin #1'),
        (1, 'From Robin #2'),
        (2, 'From Taylor #1');
    INSERT INTO `book` (`userId`, `title`) VALUES
        (1, 'Beautiful'),
        (1, 'Lose Yourself'),
        (2, 'When Im Gone');
    ```
1. Set the DB connection method in `config/database.js`. For details, please refer to [here](https://sequelize.org/docs/v6/other-topics/migrations/#cfg).
    ```js
    export default {
        development: {
            username: 'root',
            password: 'password',
            database: 'sample_db',
            host: 'localhost',
            dialect: 'mariadb'
        },
        test: {
            username: 'root',
            password: 'password',
            database: 'sample_db',
            host: 'localhost',
            dialect: 'mariadb'
        },
        production: {
            username: 'root',
            password: 'password',
            database: 'sample_db',
            host: 'localhost',
            dialect: 'mariadb'
        }
    }
    ```
1. The DB to be accessed can be defined for each environment. Specify the environment in the `.env` file
    ```sh
    NODE_ENV=development
    ```
1. Run the application with the following command.
    ```sh
    npm start
    ```
1. Then, load `http://localhost:3000/` in your browser to access the app.  
    The generated app has the following directory structure:
    ```sh
    .
    ├── .env
    ├── app.js
    ├── ecosystem.config.js
    ├── nginx.sample.conf
    ├── package.json
    ├── bin
    │   └── www
    ├── client
    │   ├── package.json
    │   ├── webpack.config.js
    │   └── src
    ├── config
    │   ├── authentication.js
    │   ├── config.js
    │   ├── database.js
    │   └── view.js
    ├── exceptions
    │   └── UserNotFound.js
    ├── models
    │   ├── BookModel.js
    │   ├── CommentModel.js
    │   ├── ProfileModel.js
    │   └── UserModel.js
    ├── public
    │   ├── build
    │   └── upload
    ├── routes
    │   ├── login.js
    │   ├── users.js
    │   └── api
    │       └── users.js
    ├── shared
    │   ├── CustomValidation.js
    │   └── empty.js
    └── views
        ├── edit-personal.hbs
        ├── error.hbs
        ├── login.hbs
        ├── personal.hbs
        ├── users.hbs
        ├── layout
        │   └── default.hbs
        └── partials
            └── .gitkeep
    ```

## API
### Environment variable
If you set the environment variable file in env_path of `config/config.js`, the value of the environment variable file will be set automatically in process.env.  
The `NODE_ENV` environment variable is required. If omitted, `development` is used.  
You can access the environment variables yourself and perform your own checks and logic, as in the following example.
```js
if (process.env.NODE_ENV === 'development')
  ;
```

### Base configuration
The basic configuration of EXPRESS SWEET is defined in the `config/config.js` file.

Click [here](configuration_sample/esm/config.js) to download a sample ESM configuration
and [here](configuration_sample/cjs/config.js) to download a sample CJS configuration.

- `env_path: string`  
    The path to the environment configuration file (`.env`).  
    When you start the EXPRESS SWEET application, the contents of the environment configuration file are automatically read and saved in `process.env`.  
    The default is `.env`.
- `cors_enabled: boolean`  
    Set to true to allow requests from another domain to the application.  
    The default is `false`.
- `max_body_size: string|number`  
    Controls the maximum request body size.  
    If this is a number, then the value specifies the number of bytes.  
    if it is a string, the value is passed to the [bytes library](https://www.npmjs.com/package/bytes) for parsing.  
    The default is 100kb.
- `router_dir: string`  
    The directory path where the routes module is located.
    The default is the `routes/` directory directly under the application root.
- `default_router: string`  
    EXPRESS SWEET can be told to load a default router when a URI is not present, as will be the case when root URL (`/`) is requested.  
    For example, to specify a default route, set `default_router` as follows.  
    Where blog is the name of the router module you want used.  
    Next, create the `routes/blog.js` module.  

    In the following example, requesting the root URL (`/`) will result in "Hello World".
    ```js
    import {Router} from 'express';

    const router = Router();
    router.get('/', (req, res) => {
        res.send('Hello World');
    });
    export default router;
    ```
- `rewrite_base_url: (baseUrl: string) => string`  
    This is a hook that rewrites the base URL.  
    If you want to rewrite the app.locals.baseUrl property and the view's baseUrl variable, use this hook to return a new base URL.  
    The default value is the referrer's origin (eg https://example.com).  
    In this example, `https://example.com/admin` is used as the base URL.  
    ```js
    rewrite_base_url: baseUrl => {
        return `${baseUrl}/admin`;
    }
    ```
- `is_ajax: (req: express.Request) => boolean`  
    How to determine if it is an ajax request.  
    The default is that if there is an XMLHttpRequest in the request header (`req.xhr`) returns `true`.  

    For example, if there is no XMLHttpRequest in req(`express.Request`) and the Ajax endpoint starts with /api, a custom Ajax decision can be made like `return /^\/api\//.test(req.path)`.
    ```js
    is_ajax: req => {
        // If the request URL begins with /api, it is assumed to be Ajax.
        return /^\/api/.test(req.path);
        // return !!req.xhr;
    }
    ```
- `hook_handle_error: (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => void`  
    Hooks the default behavior on request errors.  
    If unset, simply returns an error HTTP status. (`res.status(error.status||500).end();`)
    ```js
    hook_handle_error: (error, req, res, next) => {
        if (error.status === 404)
            // If the URL cannot be found, a 404 error screen (views/error/404.hbs) is displayed.
            res.render('error/404');
        else
            // For other errors, unknown error screen (views/error/500.hbs) is displayed.
            res.render('error/500');
    },
    ```

### Routing
Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).  
Each route can have one or more handler functions, which are executed when the route is matched.  
Route definition takes the following structure.
- app is an instance of express.
- METHOD is an [HTTP request method](https://en.wikipedia.org/wiki/HTTP#Request_methods), in lowercase.
- PATH is a path on the server.
- HANDLER is the function executed when the route is matched.
```js
import express from 'express';

const app = express();
app.METHOD(PATH, HANDLER)
```

#### Basic Routing
All routes are defined in your route files, which are located in the `routes/` directory.  
These files are automatically mapped by `EXPRESS SWEET` to the route files specified in the URI and the route handlers defined in the route files.  
The following examples illustrate defining simple routes.  
`routes/user.js` responds to `GET /user` requests.
```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});
export default router;
```

#### Nested Routing
The router supports nested files.  
If you create a nested folder structure files will be automatically routed in the same way still.  
`routes/api/users.js` responds to `GET /api/users` requests.
```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});
export default router;
```

#### Default Routing
EXPRESS SWEET can be told to load a default router when a URI is not present, as will be the case when only your site root URL (`/`) is requested.  
To specify a default router, open your `config/config.js` file and set this variable:
```js
default_router: '/blog'
```

Where blog is the name of the router module you want used.  
Next, create the `routes/blog.js` module.
```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello World');
});
export default router;
```

Now when you request the root URL (`/`), you will see "Hello World".

#### Routing Methods
Express supports the following routing methods corresponding to the HTTP methods of the same names.
For more details about routing, see the [Exprees’s Routing Guide](https://expressjs.com/en/guide/routing.html#express-router).
- checkout
- copy
- delete
- get
- head
- lock
- merge
- mkactivity
- mkcol
- move
- m-search
- notify
- options
- patch
- post
- purge
- put
- report
- search
- subscribe
- trace
- unlock
- unsubscribe

### View
EXPRESS SWEET uses Handlebars as its view template engine.  
This section describes the basic usage of the view on EXPRESS SWEET.  
See the [here](https://handlebarsjs.com/guide/) for more information on how to use Handlebars.

#### Configuration
The view (template engine) configuration is defined in the `config/view.js` file.

Click [here](configuration_sample/esm/view.js) to download a sample ESM configuration
and [here](configuration_sample/cjs/view.js) to download a sample CJS configuration.

- `views_dir: string`  
    The directory path where the view will be placed.  
    The default is the `views/` directory directly under the application root.
- `partials_dir: string`  
    The directory path where the reusable templates are located.  
    The default is the `views/partials/` directory directly under the application root.  
    Reusable templates are automatically loaded when you launch the EXPRESS SWEET application and can be called from other templates.
- `layouts_dir: string`  
    The directory path where the reusable base template is located.  
    The default is the `views/layout/` directory directly under the application root.
- `default_layout: string`  
    The path to the layout file used by default.  
    The default is the `views/layout/default.*` File directly under the application root.  
    The extension of the default layout file is replaced with the extension specified by `extension`.
- `extension: string`  
    Extension for templates and partials files.  
    The default is `.hbs`.
- `beforeRender: (req: express.Request, res: express.Response) => Promise<void>|void`  
    Hook function just before the view is rendered.  
    For example, you can set your own local variables that can be used within the view.
    ```js
    beforeRender: (req, res) => {
        res.locals.extra = 'Extra';
    }
    ```

#### Syntax
To mark where layout should insert page.
```js
{{{body}}}
```

To declare a block placeholder in layout.
```js
{{{block "script"}}}
```

To define block content in a page.
```js
{{#contentFor "script"}}
    CONTENT HERE
{{/contentFor}}
```

#### Layout
There are three ways to use a layout, listed in precedence order.

1. Declarative within a page. Use handlebars comment.
    ```js
    {{!< LAYOUT}}
    ```

    Layout file resolution.
    ```js
    If path starts with '.'
        LAYOUT is relative to template
    Else If `layoutsDir` is set
        LAYOUT is relative to `layoutsDir`
    Else
        LAYOUT from path.resolve(dirname(template), LAYOUT)
    ```
1. As an option to render.  
    Do not use this option in conjunction with passing user submitted data to res.  
    render e.g. res.render('index', req.query).  
    This allows users to read arbitrary files from your filesystem.
    ```js
    res.render('veggies', {
        title: 'My favorite veggies',
        veggies: veggies,
        layout: 'layout/veggie'
    });
    ```

    This option also allows for layout suppression (both the default layout and when specified declaratively in a page) by passing in a falsey Javascript value as the value of the layout property.
    ```js
    res.render('veggies', {
        title: 'My favorite veggies',
        veggies: veggies,
        layout: null // render without using a layout template
    });
    ```

    Layout file resolution.
    ```js
    If path starts with '.'
        layout is relative to template
    Else If `layoutsDir` is set
        layout is relative to `layoutsDir`
    Else
        layout from path.resolve(viewsDir, layout)
    ```
1. Lastly, use defaultLayout if specified in hbs configuration options.  
    Layouts can be nested: just include a declarative layout tag within any layout template to have its content included in the declared "parent" layout.  
    Be aware that too much nesting can impact performances, and stay away from infinite loops.

#### Comparison Helper
- `eq()`  
    Determine whether or not two values are equal (===).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the value and type are the same, false if they are different.

    ```js
    {{eq val1 val2}}
    {{#if (eqw val1 val2)}}...{{/if}}
    ```
- `eqw()`  
    Determine whether or not two values are equal (==) i.e. weak checking.

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the values are the same, false if they are different.

    ```js
    {{eqw val1 val2}}
    {{#if (eqw val1 val2)}}...{{/if}}
    ```
- `neq()`  
    Determine whether or not two values are not equal (!==).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the value and type are different, false if they are the same.

    ```js
    {{neq val1 val2}}
    {{#if (neq val1 val2)}}...{{/if}}
    ```
- `neqw()`  
    Determine whether or not two values are not equal (!=) weak checking.

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the values are different, false if they are the same.

    ```js
    {{neqw val1 val2}}
    {{#if (neqw val1 val2)}}...{{/if}}
    ```
- `lt()`  
    Check for less than condition (`a < b`).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the first value is less than the second value, false otherwise.

    ```js
    {{lt val1 val2}}
    {{#if (lt val1 val2)}}...{{/if}}
    ```
- `lte()`  
    Check for less than or equals condition (`a <= b`).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the first value is less than or equal to the second value, false otherwise.

    ```js
    {{lte val1 val2}}
    {{#if (lte val1 val2)}}...{{/if}}
    ```
- `gt()`  
    Check for greater than condition (a > b).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the first value exceeds the second value, false otherwise.

    ```js
    {{gt val1 val2}}
    {{#if (gt val1 val2)}}...{{/if}}
    ```
- `gte()`  
    Check for greater than or equals condition (a >= b).

    **Parameters:**  
    - val1: any  
        First value to be compared with second.
    - val2: any  
        Second value to be compared with first.

    **Return:**  
    `boolean` Returns true if the first value is greater than or equal to the second value, false otherwise.

    ```js
    {{gte val1 val2}}
    {{#if (gte val1 val2)}}...{{/if}}
    ```
- `not()`  
    Logical NOT of any expression.

    **Parameters:**  
    - val: any  
        Any expression.

    **Return:**  
    `boolean` Returns the logical negation of the value.

    ```js
    {{not val}}
    {{#if (not (eq val1 val2))}}...{{/if}}
    ```
- `ifx()`  
    Helper to imitate the ternary `?:` conditional operator.

    **Parameters:**  
    - condition: boolean  
        Satisfying condition for getting first value. Either true of false.
    - val1: any  
        First value to be displayed as result.
    - val2: any  
        Second value to be displayed as result. Defaults to an empty string.

    **Return:**  
    `any` Returns the result of the ternary operator.

    ```js
    {{ifx true val1 val2}}
    {{ifx false val1 val2}}
    {{ifx (eq val1 val2) val3 val4}}
    {{ifx (not (eq val1 val2)) val3 val4}}
    {{ifx true val}}
    {{ifx false val}}
    ```
- `empty()`  
    Check if it is empty.  
    If the value is an array, returns true if there are no elements.  
    If the value is a string, the leading and trailing spaces are trimmed and then checked.

    **Parameters:**  
    - value: any  
        Character strings, arrays, objects, etc. to be checked.

    **Return:**  
    `boolean` Returns true if the value is empty, false otherwise.

    ```js
    {{empty val}}
    {{#if (empty val)}}...{{/if}}
    ```
- `notEmpty()`  
    Check that it is not empty.  
    If the value is an array, returns true if there is an element.  
    If the value is a string, the leading and trailing spaces are trimmed and then checked.

    **Parameters:**  
    - val: any  
        Character strings, arrays, objects, etc. to be checked.

    **Return:**  
    `boolean` Returns true if the value is not empty, false otherwise.

    ```js
    {{notEmpty val}}
    {{#if (notEmpty val)}}...{{/if}}
    ```
- `count()`  
    Determine the length of an array.

    **Parameters:**  
    - items: any[]  
        Array whose elements to be counted.

    **Return:**  
    `number|false` Returns the length of the array if the value is an array, false if the value is not an array.

    ```js
    {{count val}}
    ```
- `and()`  
    Returns the boolean AND of two or more parameters passed i.e it is true iff all the parameters are true.

    **Parameters:**  
    - ...params: any[]  
        Any number of boolean parameters.

    **Return:**  
    `boolean` Returns the result of the logical product.

    ```js
    {{and val1 val2}}
    {{#if (and val1 val2)}}...{{/if}}
    ```
- `or()`  
    Returns the boolean OR of two or more parameters passed i.e it is true if any of the parameters is true.

    **Parameters:**  
    - ...params: any[]  
        Any number of boolean parameters.

    **Return:**  
    `boolean` Returns the result of the OR.

    ```js
    {{or val1 val2}}
    {{#if (or val1 val2)}}...{{/if}}
    ```
- `coalesce()`  
    Returns the first non-falsy value from the parameter list.  
    Works quite similar to the SQL's `COALESCE()` function, but unlike this checks for the first non-false parameter.

    **Parameters:**  
    - ...params: any[]  
        Any number of parameters.

    **Return:**  
    `any` Returns the first non-false element of the parameter.

    ```js
    {{coalesce val1 val2}}
    ```
- `includes()`  
    Returns boolean if the array contains the element strictly or non-strictly.

    **Parameters:**  
    - items: any[]  
        The array.
    - val: any  
        The value to be checked for existence in the array.
    - strict: boolean  
        `false` for non-strict checking. `true` by default.

    **Return:**  
    `boolean` Returns true if the array contains the specified value, false otherwise.

    ```js
    {{includes [1, 2, 3] 2}}
    {{includes [1, 2, 3] 2 true}}
    {{#if (includes [1, 2, 3] 2)}}...{{/if}}
    {{ifx (includes [1, 2, 3] 2) true false}}
    ```
- `regexMatch()`  
    Returns true if the given str matches the given regex.

    **Parameters:**  
    - val: string  
        The string against which to match the regular expression.
    - pattern: string  
        The text of the regular expression.
    - flags?: string  
        Regular expression flags, such as global and case-insensitive searches. The default is none (undefined).

    **Return:**  
    `boolean` true if there is a match between the regular expression and the string str. Otherwise, false.

    ```js
    {{regexMatch 'Hello, world!' 'Hello'}}
    {{regexMatch 'Hello, world!' 'Hello' 'i'}}
    {{#if (regexMatch 'Hello, world!' 'Hello')}}...{{/if}}
    ```

#### HTML Helper
- `cacheBusting()`  
    Returns the Assets path containing the file update time parameter.

    **Parameters:**  
    - filePath: string  
        Paths of Assets files such as CSS and JS in public directories.
    - baseUrl: string  
        Application Origin URL. The default is none (`undefined`).

    **Return:**  
    `string` Returns the Assets file path with the update date and time parameters.

    ```js
    {{!-- results in: example.com/assets/style.css?1620526340463 --}}
    {{cacheBusting '/assets/style.css' '//example.com'}}
    ```

#### Object Helper
- `jsonStringify()`  
    Stringify an object using JSON.stringify.

    **Parameters:**  
    - val: any  
        The value to convert to a JSON string.
    - indent: number  
        The number of space characters to use as whitespace.

    **Return:**  
    `string` A JSON string representing the given value, or undefined.

    ```js
    {{jsonStringify val}}
    ```
- `jsonParse()`  
    Parses the given string using JSON.parse.

    **Parameters:**  
    - val: any  
        Object to stringify.

    **Return:**  
    `any` JavaScript value or object described by a string.

    ```js
    {{jsonParse val}}
    ```

#### String Helper
- `replace()`  
    Returns a new string with some or all matches of a pattern replaced by a replacement.

    **Parameters:**  
    - val: string  
        String.
    - find: string  
        The string to be replaced.
    - replace: string  
        The string to replace.

    **Return:**  
    `string` Character string after replacement.

    ```js
    {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
    ```
- `split()`  
    Split `string` by the given `character`.

    **Parameters:**  
    - val: string  
        String.
    - separator: string  
        A character that delimits the substrings in this string. Default is a comma.

    **Return:**  
    `string[]` An Array of strings, split at each point where the separator occurs in the given string. The default is a comma.

    ```js
    {{split "a,b,c" ","}}
    {{#each (split list ',')}}<div>{{this}}</div>{{/each}}
    ```
- `formatBytes()`  
    Convert bytes to just the right units(KB, MB, GB, TB, PB, EB, ZB, YB).

    **Parameters:**  
    - bytes: number  
        Bytes.
    - decimals?: number  
        Number of decimal places to display. Default is 0.

    **Return:**  
    `string` Returns a value with units.

    ```js
    {{!-- results in: 1 KB --}}
    {{formatBytes 1024}}

    {{!-- results in: 1.21 KB --}}
    {{formatBytes 1234 2}}

    {{!-- results in: 1.205 KB --}}
    {{formatBytes 1234 3}}

    {{!-- results in: 0 Bytes --}}
    {{formatBytes 0}}
    ```

#### Date Helper
- `formatDate()`  
    Use moment to format the date.

    **Parameters:**  
    - format: string  
        A format string based on `moment`.
    - date: string  
        Date string to format.
    - locale: string|string[]  
        Language or language-country locale string (or array of strings) available in [https://github.com/moment/moment/tree/develop/locale](https://github.com/moment/moment/tree/develop/locale).

    **Return:**  
    `string` Returns formatted date.

    ```js
    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z"}}

    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'jp'}}

    {{!-- results in: 2021/10/24 --}}
    {{formatDate 'YYYY/MM/DD' "2021-10-24T02:13:06.610Z" 'es'}}
    ```

#### Number Helper
- `number2locale()`  
    Returns the language-sensitive representation of a number as a string.

    **Parameters:**  
    - val: number|string  
        Target number or numeric string.
    - locales: string|undefined  
        A string with a BCP 47 language tag, or an array of such strings.
        Corresponds to the `locales` parameter of the Intl.NumberFormat() constructor.
        In implementations without Intl.NumberFormat support, this parameter is ignored and the host's locale is usually used.

    **Return:**  
    `string` A string with a language-sensitive representation of the given number.

    ```js
    {{!-- results in: 123,456.789 --}}
    {{number2locale 123456.789}}

    {{!-- German uses comma as decimal separator and period for thousands. --}}
    {{!-- results in: 123.456,789 --}}
    {{number2locale 123456.789 'de-DE'}}
    ```

#### Math Helper
- `add()`  
    Calculates the sum of two numbers.

    **Parameters:**  
    - val1: number|string  
        The first number.
    - val2: number|string  
        The second number.

    **Return:**  
    `number`

    ```js
    {{add 1 2}}
    ```
- `sub()`  
    Calculates the difference of the given values.

    **Parameters:**  
    - val1: number|string  
        The first number.
    - val2: number|string  
        The second number.

    **Return:**  
    `number`

    ```js
    {{sub 5 2}}
    ```
- `multiply()`  
    Calculate the multiplication of the given values.

    **Parameters:**  
    - val1: number|string  
        The first number.
    - val2: number|string  
        The second number.

    **Return:**  
    `number`

    ```js
    {{multiply 5 2}}
    ```
- `divide()`  
    Compute the division of the given values.

    **Parameters:**  
    - val1: number|string  
        The first number.
    - val2: number|string  
        The second number.

    **Return:**  
    `number`

    ```js
    {{divide 10 2}}
    ```
- `ceil()`  
    Round up the value.

    **Parameters:**  
    - val: number|string  
        Number to be rounded to nearest greater integer.

    **Return:**  
    `number`

    ```js
    {{ceil 5.6}}
    ```
- `floor()`  
    Rounds down a number.

    **Parameters:**  
    - val: number|string  
        Number to be rounded to nearest lower integer.

    **Return:**  
    `number`

    ```js
    {{floor 5.6}}
    ```
- `abs()`  
    Returns an absolute value.

    **Parameters:**  
    - val: number|string  
        Number to perform absolute value operation on.

    **Return:**  
    `number`

    ```js
    {{abs -5.6}}
    ```

### Model
Models provide a way to interact with a specific table in your database.  
EXPRESS SWEET provides a [Sequelize](https://sequelize.org/docs/v6/) based model class that offers some great features, including.
- Automatic database connection.
- Basic CRUD methods.
- And more.

This class provides a solid base from which to build your own models, allowing you to rapidly build out your application’s model layer.

#### Configuration
The database configuration is defined in the `config/database.js` file.

Click [here](configuration_sample/esm/database.js) to download a sample ESM configuration
and [here](configuration_sample/cjs/database.js) to download a sample CJS configuration.

- `username: string`  
    The username which is used to authenticate against the database.
- `password: string|null`  
    The password which is used to authenticate against the database.  
    The default is no password (`null`).
- `database: string`  
    The name of the database.
- `host: string`  
    The host of the relational database.
- `port: number|null`  
    The port of the relational database.  
    The default is automatic selection (`null`).
- `dialect: string`  
    The dialect of the database you are connecting to.  
    One of `mariadb`, `mysql`, `postgres`, `sqlite` and `mssql`.
- `logging: boolean|(...message: any[]) => void`  
    Set true to output the executed query etc. to the log.  
    The default is no log output (`false`).
- `timezone: string`  
    Time zone dedicated to writing to the database.  
    For example, for the Japanese time zone, do the following.
    ```js
    timezone: '+09:00'
    ```

#### Accessing Model
Place the model in the `models/` directory of the root directory.  
When you load the model, you have immediate access to the model's functions for working with the database.

```js
import BookModel from '../models/BookModel';

// INSERT INTO book (title) VALUES ('Beautiful')
await BookModel.create({title: 'Beautiful'});

// SELECT * FROM book
await BookModel.findAll();

// UPDATE book SET title = 'Beautiful' WHERE id= 1
await BookModel.update({title: 'Beautiful'}, {where: {id: 1}});

// DELETE FROM book WHERE id= 1
await BookModel.destroy({where: {id: 1}});
```

#### Creating Model
To take advantage of EXPRESS SWEET’s model, you would simply create a new model class that extends `database/Model`.  
This class provides convenient access to the database connection, the Query Builder, and a number of additional convenience methods.  
For more information, see [reference](#model-class).
```js
import * as expressExtension from 'express-sweet';

export default class extends expressExtension.database.Model {
  static get table() {
    return 'user';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: this.DataTypes.STRING,
      email: this.DataTypes.STRING,
      password: this.DataTypes.STRING,
      icon: this.DataTypes.STRING,
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }
}
```

#### Database class extends [sequelize.Sequelize](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize)
This is the class that makes the database connection.  
See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize) for other available methods.

The database connection is automatic when the model is loaded.  
The configuration related to the database connection is defined in the `config/database.js` file.  
For more information on database configuration, see [Database configuration](#configuration-1).

##### Instance Methods
- `public constructor()`  
    Instantiate sequelize with name of database, username and password.
- `public isConnect()`  
    Test the connection by trying to authenticate. It runs `SELECT 1+1 AS result` query.

    **Return:**  
    `Promise<boolean>` Returns `true` if it can connect to the database, `false` if it cannot.

    ```js
    import * as expressExtension from 'express-sweet';

    await expressExtension.database.Database.isConnect();
    ```

#### Model Class extends [sequelize.Model](https://sequelize.org/api/v6/class/src/model.js~model)
This is a class that abstracts the tables in the database.  
See [here](https://sequelize.org/api/v6/class/src/model.js~model) for more information on the methods and properties available in your model.  

##### Class Properties
- `protected static table: string`  
    The name of the table that the model accesses. This member must be defined in a subclass.
    ```js
    import * as expressExtension from 'express-sweet';

    export default class extends expressExtension.database.Model {
        static get table() {
            return 'user';
        }
    }
    ```
- `protected static attributes: sequelize.ModelAttributes`  
    List of columns in the table accessed by this model. This member must be defined in a subclass.
    ```js
    import * as expressExtension from 'express-sweet';

    export default class extends expressExtension.database.Model {
        static get attributes() {
            return {
                id: {
                    type: this.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                name: this.DataTypes.STRING,
                email: this.DataTypes.STRING,
                password: this.DataTypes.STRING,
                icon: this.DataTypes.STRING,
                created: this.DataTypes.DATE,
                modified: this.DataTypes.DATE
            };
        }
    }
    ```
- `public static readonly DataTypes: {[key: string]: any}`  
    A convenience class holding commonly used data types.  
    This is an alias for `sequelize.DataTypes`.  
    See [here](https://sequelize.org/api/v6/variable/index.html#static-variable-DataTypes) for details.
    ```js
    {id: this.DataTypes.INTEGER}
    ```
- `public static readonly Op: {[key: string]: any}`  
    Operator symbols to be used when querying data.  
    This is an alias for `sequelize.Op`.  
    See [here](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators) for details.
    ```js
    import BookModel from '../models/BookModel';

    // SELECT * FROM book WHERE title = 'Beautiful' AND genre = 'Nonfiction';
    BookModel.findOne({
        where: {
            [BookModel.Op.and]: [
                {title: 'Beautiful'},
                {genre: 'Nonfiction'}
            ]
        }
    });

    // SELECT * FROM book WHERE title = 'Beautiful' OR title = 'Lose Yourself';
    BookModel.findAll({
        where: {
            [BookModel.Op.or]: [
                {title: 'Beautiful'},
                {title: 'Lose Yourself'}
            ]
        }
    });

    // DELETE FROM user WHERE name = 'Beautiful' OR name = 'Lose Yourself';
    BookModel.destroy({
        where: {
            title: {[BookModel.Op.or]: ['Beautiful', 'Lose Yourself']}
        }
    });
    ```
- `public static readonly fn: (fn: string, ...args: unknown[]) => any`  
    Creates an object representing a database function.  
    This can be used in search queries, both in where and order parts, and as default values in column definitions.  
    If you want to refer to columns in your function, you should use sequelize.col, so that the columns are properly interpreted as columns and not a strings.  
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-fn) for details.
    ```js
    import BookModel from '../models/BookModel';

    // SELECT upper(`title`) AS `title` FROM `book` AS `book`;
    const books = await BookModel.findAll({
        attributes: [[BookModel.fn('upper', BookModel.col('title')), 'title']],
        raw: true
    });
    ```
- `public static readonly col: (col: string) => any`  
    Creates an object which represents a column in the DB, this allows referencing another column in your query.  
    This is often useful in conjunction with sequelize.fn, since raw string arguments to fn will be escaped.  
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-col) for details.
- `public static readonly literal: (val: string) => any`  
    Creates an object representing a literal, i.e. something that will not be escaped.  
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-literal) for details.
    ```js
    import BookModel from '../models/BookModel';

    // SELECT `id`, `title`, (SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id) AS `count` FROM `book` AS `book`;
    const books = await BookModel.findAll({
        attributes: [
            'id',
            'title',
            [BookModel.literal(`(SELECT COUNT(*) FROM comment WHERE comment.bookId = book.id)`), 'count']
        ],
        raw: true
    });
    ```
- `public static readonly where: (attr: sequelize.AttributeType, comparator: string, logic: sequelize.LogicType) => sequelize.Utils.Where`  
    A way of specifying attr = condition.  
    The attr can either be an object taken from Model.rawAttributes (for example Model.rawAttributes.id or Model.rawAttributes.name).  
    The attribute should be defined in your model definition.  
    The attribute can also be an object from one of the sequelize utility functions (sequelize.fn, sequelize.col etc.)  
    For string attributes, use the regular {where: {attr: something}} syntax.  
    If you don't want your string to be escaped, use sequelize.literal.
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#static-method-where) for details.
    ```js
    import BookModel from '../models/BookModel';

    // SELECT `title` FROM `book` AS `book` WHERE CHAR_LENGTH(`title`) <= 10;
    const books = await BookModel.findAll({
        attributes: ['title'],
        where: BookModel.where(
            BookModel.fn('CHAR_LENGTH', BookModel.col('title')),
            {[BookModel.Op.lte]: 10}
        ),
        raw: true
    });
    ```
- `public static readonly QueryTypes: {[key: string]: string}`  
    An enum of query types used by `sequelize.query`.  
    See [here](https://sequelize.org/api/v6/variable/index.html#static-variable-QueryTypes) for details.
- `public static readonly Transaction: (typeof sequelize.Transaction)`  
    Reference to [sequelize.Transaction](https://sequelize.org/api/v6/class/src/transaction.js~transaction).  
    This includes properties such as isolation level enums used with the transaction option.
    ```js
    const BookModel = require('../models/BookModel');
    BookModel.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED // "READ UNCOMMITTED"
    BookModel.Transaction.ISOLATION_LEVELS.READ_COMMITTED // "READ COMMITTED"
    BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ  // "REPEATABLE READ"
    BookModel.Transaction.ISOLATION_LEVELS.SERIALIZABLE // "SERIALIZABLE"
    ```

##### Class Methods
- `public static association()`  
    Associate the model.  
    Define associations with other models such as `hasOne`, `hasMany`, `belongsTo`, `belongsToMany`.  
    This method is called automatically from within the `mount` method, so you don't have to run it yourself.  
    See the [here](https://sequelize.org/api/v6/class/src/associations/base.js~association) for more information.  
    If you omit the alias (`as`) option, the associated name will be hasOne, singular for belongsTo, and plural for hasMany.
    ```js
    import * as expressExtension from 'express-sweet';
    import ProfileModel from './ProfileModel';

    export default class extends expressExtension.database.Model {
        static association() {
            // User has one profile.
            this.hasOne(ProfileModel, {
                foreignKey: 'userId', // profile.userId
                sourceKey: 'id', // user.id
                as: 'profile'
            });
        }
    }
    ```
- `public static begin()`  
    Starts a transaction and returns a transaction object to identify the running transaction.  
    This is an alias for the `sequelize.Sequelize.transaction()` method.  
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-transaction) for details.

    **Parameters:**  
    - options?: sequelize.TransactionOptions  
        Options provided when the transaction is created.

    **Return:**  
    `Promise<sequelize.Transaction>` Returns a transaction object to identify the transaction being executed.

    Simple transaction usage example.
    ```js
    import BookModel from '../models/BookModel';

    let transaction;
    try {
        transaction = await BookModel.begin();
        const book = await BookModel.create({title: 'Beautiful'}, {transaction});
        await transaction.commit();
    } catch {
        if (transaction)
            await transaction.rollback();
    }
    ```

    You can also use transaction options.
    ```js
    import BookModel from '../models/BookModel';

    let transaction;
    try {
        transaction = await BookModel.begin({
            isolationLevel: BookModel.Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            type: BookModel.Transaction.TYPES.DEFERRED,
        });
        const book = await BookModel.findOne({where: {id: 1}}, {transaction});
        book.title = 'Beautiful';
        await book.save({transaction});
        await transaction.commit();

        // Load updated data.
        await book.reload();
    } catch {
        if (transaction)
            await transaction.rollback();
    }
    ```
- `public static create()`  
    Builds a new model instance and calls `save` on it.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-create) for details.

    **Parameters:**  
    - values: object  
        Hash of data values to create new record with.
    - options: object  
        Build and query options.

    **Return:**  
    `Promise<Model>` Returns a model that contains the data for the added record.

    ```js
    import BookModel from '../models/BookModel';

    // INSERT INTO `book` (`id`,`title`) VALUES (DEFAULT,'Beautiful');
    await BookModel.create({title: 'Beautiful'});
    ```
- `public static save()`  
    Validates this instance, and if the validation passes, persists it to the database.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#instance-method-save) for details.

    **Parameters:**  
    - options: object  
        save options.

    **Return:**  
    `Promise<Model>` Returns a model that contains data for manipulated records such as add and update.

    ```js
    import BookModel from '../models/BookModel';

    // INSERT INTO `book` (`id`,`title`) VALUES (DEFAULT,'Beautiful');
    const book = BookModel.build({title: 'Beautiful'});
    await book.save();

    // UPDATE `book` SET `title`='Lose Yourself' WHERE `id` = 1;
    book.title = 'Lose Yourself';
    await book.save();
    ```
- `public static findOne()`  
    Search for a single instance.  
    Returns the first instance found, or null if none can be found.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-findOne) for details.

    **Parameters:**  
    - options: object  
        A hash of options to describe the scope of the search.

    **Return:**  
    `Promise<Model|null>` Returns a Model containing the first data found in the database.

    ```js
    import BookModel from '../models/BookModel';

    // SELECT `id`, `title`, `created`, `modified` FROM `book` AS `book` LIMIT 1;
    await BookModel.findOne();
    ```
- `public static findAll()`  
    Search for multiple instances.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-findAll) for details.

    **Parameters:**  
    - options: object  
        A hash of options to describe the scope of the search.

    **Return:**  
    `Promise<Array<Model>>` Returns a model containing the data found in the database.

    ```js
    import BookModel from '../models/BookModel';

    // SELECT `id`, `title`, `created`, `modified` FROM `book` AS `book` WHERE `book`.`title` LIKE 'Beautiful%';
    await BookModel.findAll({
        where: {
            title: {
                [BookModel.Op.like]: 'Beautiful%'
            }
        }
    });
    ```
- `public static count()`  
    Count the number of records matching the provided where clause.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-count) for details.

    **Parameters:**  
    - options: object  
        A hash of options to describe the scope of the search.

    **Return:**  
    `Promise<number>` Returns the count of records that match the condition.

    ```js
    import BookModel from '../models/BookModel';

    // SELECT count(*) AS `count` FROM `book` AS `book`;
    await BookModel.count();
    ```
- `public static update()`  
    Update multiple instances that match the where options.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-update) for details.

    **Parameters:**  
    - values: object  
        hash of values to update.
    - options: object  
        update options.

    **Return:**  
    `Promise<Array<number, number>>` The first element is always the number of affected rows, while the second element is the actual affected rows (only supported in postgres with `options.returning` true).

    ```js
    import BookModel from '../models/BookModel';

    // UPDATE `book` SET `title`='Lose Yourself' WHERE `id` = 1;
    await BookModel.update({title: 'Lose Yourself'}, {where: {id: 1}});
    ```
- `public static upsert()`  
    Insert or update a single row.  
    An update will be executed if a row which matches the supplied values on either the primary key or a unique key is found.  
    Note that the unique index must be defined in your sequelize model and not just in the table.  
    Otherwise you may experience a unique constraint violation, because sequelize fails to identify the row that should be updated.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-upsert) for details.

    **Parameters:**  
    - values: object  
        hash of values to upsert.
    - options: object  
        upsert options.

    **Return:**  
    `Promise<Model, boolean|null>` returns record and whether row was created or updated as boolean. For Postgres/SQLite dialects boolean value is always null.

    ```js
    import BookModel from '../models/BookModel';

    // INSERT INTO `book` (`title`) VALUES (?) ON DUPLICATE KEY UPDATE `title`=VALUES(`title`);
    await BookModel.upsert({title: 'Lose Yourself'});
    ```
- `public static destroy()`  
    Delete multiple instances, or set their deletedAt timestamp to the current time if paranoid is enabled.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-destroy) for details.

    **Parameters:**  
    - options: object  
        destroy options.

    **Return:**  
    `Promise<number>` The number of destroyed rows.

    ```js
    import BookModel from '../models/BookModel';

    // DELETE FROM `user` WHERE `id` = 1;
    await BookModel.destroy({where: {id :1}});
    ```
- `public static hasOne()`  
    Creates an association between this (the source) and the provided target.  
    The foreign key is added on the target.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-hasOne) for details.

    **Parameters:**  
    - target: Model  
        The target model.
    - options: object  
        hasOne association options.

    **Return:**  
    [`sequelize.HasOne`](https://sequelize.org/api/v6/class/src/associations/has-one.js~hasone) One-to-one association.

    For one-to-one association we will use two tables as an example they are User and Profile table.  
    User table has one Profile table and Profile table belongs to the User table.  
    Here's the relation diagram for it.

    ![Image](screencaps/has-one.png)

    HasOne put the association key in the target model.  
    Here User can exist without a Profile, but the vice versa is not possible.  
    This means, we will insert userId field to Profile model’s table.  

    This is a user model that defines an association in which the user has one profile.
    ```js
    import * as expressExtension from 'express-sweet';
    import ProfileModel from  './ProfileModel';

    export default class extends expressExtension.database.Model {
        static association() {
            // User has one profile.
            this.hasOne(ProfileModel, {
                foreignKey: 'userId', // profile.userId
                sourceKey: 'id', // user.id
                as: 'profile'
            });
        }
    }
    ```

    This is an example of record search.
    ```js
    import UserModel from '../models/UserModel';

    // SELECT
    //     `user`.`id`,
    //     `user`.`name`,
    //     `profile`.`id` AS `profile.id`,
    //     `profile`.`userId` AS `profile.userId`,
    //     `profile`.`address` AS `profile.address`,
    //     `profile`.`tel` AS `profile.tel`
    // FROM
    //     `user` AS `user`
    //     LEFT OUTER JOIN `profile` AS `profile` ON `user`.`id` = `profile`.`userId`;
    // 
    // results in: [
    //     {
    //         "id": 1,
    //         "name": "Robin",
    //         "profile": {
    //             "userId": 1,
    //             "address": "777 Brockton Avenue, Abington MA 2351",
    //             "tel": "202-555-0105"
    //         }
    //     }
    // ]
    await UserModel.findAll({
        attributes: ['id', 'name'],
        include: [{
            association: 'profile',
            attributes: ['userId', 'address', 'tel']
        }]
    });
    ```
- `public static belongsTo()`  
    Creates an association between this (the source) and the provided target.  
    The foreign key is added on the source.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-belongsTo) for details.

    **Parameters:**  
    - target: Model  
        The target model.
    - options: object  
        belongsTo association options.

    **Return:**  
    [`sequelize.BelongsTo`](https://sequelize.org/api/v6/class/src/associations/belongs-to.js~belongsto) One-to-one association.


    For one-to-one association we will use two tables as an example they are User and Profile table.  
    User table has one Profile table and Profile table belongs to the User table.  
    Here's the relation diagram for it.

    ![Image](screencaps/belongs-to.png)

    BelongsTo put the associations key in the source model.  
    Here User can exist without a Profile, but the vice versa is not possible.  
    This means, we will insert userId field to Profile model’s table.

    This is a profile model that defines an association whose profile belongs to one user.
    ```js
    import * as expressExtension from 'express-sweet';
    import UserModel from './UserModel';

    export default class extends expressExtension.database.Model {
        static association() {
            // Profile belongs to one user.
            this.belongsTo(UserModel, {
                foreignKey: 'userId',  // profile.userId,
                targetKey: 'id',  // user.id
                as: 'user'
            });
        }
    }
    ```

    This is an example of record search.
    ```js
    import ProfileModel from  '../models/ProfileModel';

    // SELECT
    //     `profile`.`id`,
    //     `profile`.`userId`,
    //     `profile`.`address`,
    //     `profile`.`tel`,
    //     `user`.`id` AS `user.id`,
    //     `user`.`name` AS `user.name`
    // FROM
    //     `profile` AS `profile`
    //     INNER JOIN `user` AS `user` ON `profile`.`userId` = `user`.`id`;
    // 
    // results in: [
    //     {
    //         "userId": 1,
    //         "address": "777 Brockton Avenue, Abington MA 2351",
    //         "tel": "202-555-0105",
    //         "user": {
    //             "id": 1,
    //             "name": "Robin"
    //         }
    //     }
    // ]
    await ProfileModel.findAll({
        attributes: ['userId', 'address', 'tel'],
        include: {
            association: 'user',
            required: true,
            attributes: ['id', 'name']
        }
    });
    ```
- `public static hasMany()`  
    Creates a 1:m association between this (the source) and the provided target.  
    The foreign key is added on the target.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-hasMany) for details.

    **Parameters:**  
    - target: Model  
        The target model.
    - options: object  
        hasMany association options.

    **Return:**  
    [`sequelize.HasMany`](https://sequelize.org/api/v6/class/src/associations/has-many.js~hasmany) One-to-many association.

    For one-to-many association we will use two tables as an example they are User and Comment table.  
    User table has many Comment table and Comment table belongs to the User table.  
    Here's the relation diagram for it.

    ![Image](screencaps/has-many.png)


    The HasMany put the association key in the target model.  
    Here user and comments share a one to many relationship.  
    Each user can make multiple comments while each comment is associated with only a single user.

    This is a user model that defines an association in which the user has many comments.
    ```js
    import * as expressExtension from 'express-sweet';
    import CommentModel from './CommentModel';

    export default class extends expressExtension.database.Model {
        static association() {
            // User has many comments.
            this.hasMany(CommentModel, {
                foreignKey: 'userId',  // comment.userId
                sourceKey: 'id',  // user.id
                as: 'comments'
            });
        }
    }
    ```

    This is an example of record search.
    ```js
    import UserModel from  '../models/UserModel';

    // SELECT
    //     `user`.`id`,
    //     `user`.`name`,
    //     `comments`.`id` AS `comments.id`,
    //     `comments`.`userId` AS `comments.userId`,
    //     `comments`.`text` AS `comments.text`
    // FROM
    //     `user` AS `user`
    //     LEFT OUTER JOIN `comment` AS `comments` ON `user`.`id` = `comments`.`userId`;
    // 
    // results in: [
    //     {
    //         "id": 1,
    //         "name": "Robin",
    //         "comments": [
    //             {
    //                 "userId": 1,
    //                 "text": "From Robin #1"
    //             },
    //             {
    //                 "userId": 1,
    //                 "text": "From Robin #2"
    //             }
    //         ]
    //     }
    // ]
    await UserModel.findAll({
        attributes: ['id', 'name'],
        include: {
            association: 'comments',
            attributes: ['userId', 'text']
        }
    });
    ```
- `public static belongsToMany()`  
    Create an N:M association with a join table.  
    Defining through is required.  
    See [here](https://sequelize.org/api/v6/class/src/model.js~model#static-method-belongsToMany) for details.

    **Parameters:**  
    - target: Model  
        The target model.
    - options: object  
        belongsToMany association options.

    **Return:**  
    [`sequelize.BelongsToMany`](https://sequelize.org/api/v6/class/src/associations/belongs-to-many.js~belongstomany) Many-to-many association with a join table.

    For many-to-many association we will use two tables as an example they are User and Book table.  
    User is marking down Books that he has read. Each user can mark as many books as they want, creating a many to many association between User and Books.  
    Books can belong to many users.  
    Here's the relation diagram for it.

    ![Image](screencaps/belongs-to-many.png)

    The BlongsToMany put the association key in the target model.  
    Here user and book share a many to many relationship.  
    Each user can make multiple books, and each book can be associated with multiple users.

    This is a user model that defines an association where users and books have a many-to-many relationship.
    ```js
    import * as expressExtension from 'express-sweet';
    import BookModel from './BookModel';

    export default class extends expressExtension.database.Model {
        static association() {
            // Users have many books, and books belong to many users.
            this.belongsToMany(BookModel, {
                foreignKey: 'userId',  // book.userId
                sourceKey: 'id',  // user.id
                as: 'books'
            });
        }
    }
    ```

    This is an example of record search.
    ```js
    import UserModel from  '../models/UserModel';

    // SELECT
    //     `user`.`id`,
    //     `user`.`name`,
    //     `books`.`id` AS `books.id`,
    //     `books`.`userId` AS `books.userId`,
    //     `books`.`title` AS `books.title`
    // FROM
    //     `user` AS `user`
    //     LEFT OUTER JOIN `book` AS `books` ON `user`.`id` = `books`.`userId`;
    // 
    // results in: [
    //     {
    //         "id": 1,
    //         "name": "Robin",
    //         "books": [
    //             {
    //                 "userId": 1,
    //                 "title": "Beautiful"
    //             },
    //             {
    //                 "userId": 1,
    //                 "title": "Lose Yourself"
    //             }
    //         ]
    //     }
    // ]
    await UserModel.findAll({
        attributes: ['id', 'name'],
        include: {
            association: 'books',
            attributes: ['userId', 'title']
        }
    });
    ```
- `public static query()`  
    Raw Queries.  
    As there are often use cases in which it is just easier to execute raw / already prepared SQL queries, you can use the Model.query method.  
    This is an alias for the `sequelize.Sequelize.query()` method.  
    See [here](https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-query) for details.

    **Parameters:**  
    - sql: string  
        SQL string.
    - options: object  
        Query options.

    **Return:**  
    `Promise<any>` By default, the function will return two arguments: an array of results, and a metadata object, containing number of affected rows etc. If you are running a type of query where you don't need the metadata, for example a SELECT query, you can pass in a query type to make sequelize format the results.

    ```js
    // By default the function will return two arguments - a results array, and an object containing metadata (such as amount of affected rows, etc).
    // Note that since this is a raw query, the metadata are dialect specific.
    const [results, metadata] = await BookModel.query("UPDATE book SET title = 'Lose Yourself' WHERE id = 1");

    // In cases where you don't need to access the metadata you can pass in a query type to tell sequelize how to format the results. For example, for a simple select query you could do:
    // We didn't need to destructure the result here - the results were returned directly
    await BookModel.query("SELECT * FROM book", {type: BookModel.QueryTypes.SELECT});
    ```

### Authentication
EXPRESS SWEET has built-in passport authentication middleware for user authentication by username and password.
You can immediately start user authentication in your application using the authentication configuration file and the authentication service module.

For more information about `passport`, click [here](https://www.passportjs.org/).

**NOTE:** If an unauthenticated user makes a request to a URL that allows access only if authenticated, the user will be redirected to the page specified by `failure_redirect`.
If that access is asynchronous, a `401` error is returned.

#### Configuration
The user authentication configuration is defined in the `config/authentication.js` file.

Click [here](configuration_sample/esm/authentication.js) to download a sample ESM configuration and
[here](configuration_sample/cjs/authentication.js) to download a sample CJS configuration.

- `enabled: boolean`  
    Set to true to enable user authentication using [Passport middleware](https://www.passportjs.org/docs/).  
    User authentication is enabled (`true`) by default.
- `session_store: 'memory'|'redis'`  
    The session store instance, defaults to a new MemoryStore(`memory`) instance.
- `cookie_name?: string|undefined`  
    The name of the session ID cookie to set in the response (and read from in the request).  
    The default value is `connect.sid`.
- `cookie_secure?: boolean|undefined`  
    Specifies the boolean value for the `Secure` Set-Cookie attribute.  
    The default is `true`, which sets the `Secure` attribute on the cookie.
- `cookie_httpOnly?: boolean|undefined`  
    Specifies the boolean value for the `HttpOnly` Set-Cookie attribute.  
    Defaults to `true`, which sets the `HttpOnly` attribute on the cookie.
- `redis_host?: string|undefined`  
    If the session is stored in `redis`, this field is required and should be set to the hostname of the Redis server.  
    For example, to connect to redis on localhost on port `6379`, set `redis://localhost:6379`.  

    To connect to a different host or port, use a connection string in the format `redis[s]://[[username][:password]@][host][:port][/db-number]`.  
    For example, `redis://alice:foobared@awesome.redis.server:6380`. 
- `username: string`  
    The login username field name used for authentication.  
    This should be set to the same value as the user field name in the POST body sent to the server and the user example name in the login user table.
- `password: string`  
    The login password field name used for authentication.  
    This should be set to the same value as the password field name in the POST body sent to the server and the password column name in the login user table.
- `success_redirect: string`  
    The URL to redirect to after successful authentication.  
    The default is the root URL (`/`).
- `failure_redirect: string|((req: express.Request, res: express.Response) => string)`  
    Specify the URL to redirect after logging out, or the URL to redirect when the logoff user requests a URL that only the logged-in user can access.  
    This usually specifies the URL of the login page.  
    The default is `/login`.
    ```js
    // Set the URL to redirect to in case of login failure as a string.
    failure_redirect: '/login',

    // Dynamically set the url to redirect to on login failure.
    failure_redirect: (req, res) => {
        // If the role stored in the cookie is admin, redirect to the admin login screen.
        return req.cookies.role === 'admin' ? '/adminlogin' : 'login';
    },
    ```
- `authenticate_user: (username: string, password: string, req: express.Request): Promise<object|null>`  
    This hook is called when authenticating a user.  
    Please find the user information that owns the credentials based on the user name and password you received and return it.  
    If the user who owns the credentials cannot be found, return null.

    **NOTE:** Note that the user information must include an ID value that can identify the user.

    The following example uses the user model to find the user who owns the credentials based on the username and password.
    ```js
    authenticate_user: async (username, password, req) => {
        const UserModel = require('../models/UserModel');
        return UserModel.findOne({
            where: {
                email: username,
                password
            },
            raw: true
        });
    }
    ```
- `subscribe_user: (id: number): Promise<object>`  
    This hook is called when user authentication is successful.  
    Please search and return the authenticated user information to be set in the session based on the user ID of the parameter.  
    The returned data will be set in the req.user property and the view's session variable.  
    The following example uses the user model to return the user information that owns the credentials based on the authenticated user's id.
    ```js
    subscribe_user: async (id) => {
        const UserModel = require('../models/UserModel');
        return UserModel.findOne({
            where: {
                id
            },
            raw: true
        });
    }
    ```
- `allow_unauthenticated: (string|RegExp)[]`  
    By default, it requires an authenticated user for all requests.  
    You can use the `allow_unauthenticated` option to disable this behavior on certain requests.  
    For example, if you don’t want to authenticate all requests that contain `api` in the URL, set `allow_unauthenticated` as follows.
    ```js
    allow_unauthenticated: ['/api']
    ```

    You can also use regular expressions.
    ```js
    allow_unauthenticated: [/^\/api/]
    ```
- `expiration: number`  
    Specifies the time, in milliseconds, before the session expires.  
    The default is 24 hours (`86400000` milliseconds).

#### Login Procedure
To authenticate the request, call `services/Authentication.authenticate()` method.  
This method returns `true` if the authentication succeeds and `false` if it fails.  
If authentication succeeds, the next handler will be invoked and the `req.user` property will be set to the authenticated user.

The post-authentication logic depends on whether the login request is received asynchronously or synchronously, so an example of both logics is shown here.

1. Create a user table to authenticate.
    ```sql
    CREATE TABLE `user` (
        `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
        `name` varchar(30) NOT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(100) NOT NULL,
        `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()),
        `created` datetime NOT NULL DEFAULT current_timestamp(),
        `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
        PRIMARY KEY (`id`),
        UNIQUE KEY `ukUserEmail` (`email`),
        UNIQUE KEY `ukUserIcon`(`icon`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ```
1. Set the email address and password columns of the user table to be used for authentication in the config file `config/authentication.js`.
    ```js
    /**
    * Authentication user ID field name, defaults to `username`.
    * @type {string}
    */
    username: 'email',

    /**
    * Authentication password field name, defaults to `password`.
    * @type {string}
    */
    password: 'password'
    ```
1. For asynchronous requests.  
    Returns the authentication result and executes subsequent processing on the front end.

    When the form submits, it sends a login request (`/api/users/login`), and the `routes/api/user.js` router receives the request, authenticates it based on the username and password, and returns the result.  
    After that, the front end checks the authentication result returned from the router and redirects to `/` if the authentication result is successful (`true`).  
    If you redirect to /, the page will automatically switch to the URL specified in `success_redirect` of `config/authentication.js`.
    ```js
    import {Router} from 'express';
    import * as expressExtension from 'express-sweet';

    const router = Router();
    router.post('/login', async (req, res, next) => {
        const isAuthenticated = await expressExtension.services.Authentication.authenticate(req, res, next);
        res.json(isAuthenticated);
    });
    export default router;
    ```

    Below is an example of HTML.
    ```html
    <form id="form">
        <label>Email</label><input type="email" name="email" required autofocus>
        <label class="form-label">Password</label><input type="password" name="password" required>
        <button type="submit">Login</button>
    </form>
    <script>
    const form = document.querySelector('#form');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const res = await fetch('/api/users/login', {method: 'POST', body: new FormData(form)});
        const isAuthenticated = await res.json();
        if (!isAuthenticated)
            return void alert('The user name or password is incorrect.');
        location.href = '/';
    });
    </script>
    ```
1. For sync request.  
    If the authentication is successful, redirect to the page with the URL specified by `success_redirect` in `config/authentication.js`.  
    If it fails, redirect to the page with the URL specified by `failure_redirect` in `config/authentication.js`.
    ```js
    import {Router} from 'express';
    import * as expressExtension from 'express-sweet';

    const router = Router();
    router.post('/login', async (req, res, next) => {
        const isAuthenticated = await expressExtension.services.Authentication.authenticate(req, res, next);
        if (isAuthenticated)
            await expressExtension.services.Authentication.successRedirect(res);
        else
            await expressExtension.services.Authentication.failureRedirect(req, res);
    });
    export default router;
    ```

    Below is an example of HTML.
    ```html
    <form method="post" action="/api/users/login">
        <label>Email</label><input type="email" name="email" required autofocus>
        <label class="form-label">Password</label><input type="password" name="password" required>
        <button type="submit">Login</button>
    </form>
    ```

#### Logout Procedure
If you want to log out the user, call the `services/Authentication.logout()` method.  
Invoking `logout()` will remove the `req.user` property and clear the login session (if any).
```js
import {Router} from 'express';
import * as expressExtension from 'express-sweet';

const router = Router();
router.get('/logout', (req, res) => {
    expressExtension.services.Authentication.logout(req);
    res.redirect('/');
});
export default router;
```

Below is an example of HTML.
```html
<a href="/api/users/logout">Logout</a>
```

## Release Notes
All changes can be found [here](CHANGELOG.md).

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)