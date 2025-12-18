# EXPRESS SWEET

EXPRESS SWEET is a powerful Express.js extension that streamlines your development workflow and boosts productivity with a comprehensive suite of utilities and enhancements.

## Now Supports Express 5!

**Version 4.0+ brings full Express 5 compatibility with production-ready solutions for common migration challenges:**

- **Express 4 Query Parser Behavior** - Nested query objects work seamlessly (e.g., `?user[email]=test@example.com` → `req.query.user.email`)
  - Solves the `[Object: null prototype]` issue ([#3472](https://github.com/expressjs/express/issues/3472), [#599](https://github.com/cdimascio/express-openapi-validator/issues/599))
  - Automatic `query parser: 'extended'` configuration out of the box
- **Multipart Form Data Support** - Handle file uploads and form submissions effortlessly
  - Built-in `multer().none()` middleware for forms without files
  - Dynamic file upload configuration via `config/upload.js`
- **Modern Route Patterns** - Full support for RegExp with named capture groups
  - Migrated from deprecated `/:id(\\d+)` to `/^\/(?<id>\\d+)$/` syntax
- **Node.js 18+ Ready** - Leverages the latest Node.js LTS features

For more details on Express 5 changes, see the [Express.js Release Notes](https://expressjs.com/en/changelog/).

## Table of Contents

- [Now Supports Express 5!](#now-supports-express-5)
- [Features](#features)
- [Demos](#demos)
- [API Reference](#api-reference)
- [EXPRESS SWEET Generator](#express-sweet-generator)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Routing](#routing)
- [Model](#model)
- [View System](#view-system)
- [Authentication](#authentication)
- [Examples](#examples)
- [Release Notes](#release-notes)
- [Author](#author)
- [License](#license)

## Features

EXPRESS SWEET provides the following key features to accelerate your development:

- **Automatic Routing**: Files in the `routes/` directory are automatically mapped to URL endpoints
- **Database ORM**: Built-in Sequelize integration with automatic connection management
- **Authentication**: Passport-based authentication system with session management
- **Template Engine**: Handlebars view engine with custom helpers and layout support
- **Environment Management**: Automatic environment variable loading and configuration
- **Logging**: Morgan-based HTTP request logging with customizable formats
- **CORS Support**: Built-in Cross-Origin Resource Sharing support
- **Project Generator**: Command-line tool to quickly scaffold new applications

## Demos

The `demo/` directory contains working examples that demonstrate different use cases of EXPRESS SWEET:

- **REST API Demo** - Modern REST API with CORS support and Bearer token authentication, ideal for SPAs and mobile app backends
- **TODO Demo** - Full-stack application with authentication, database integration, and async operations
- **File Upload Demo** - File upload handling with Multer middleware for single and multiple file uploads

See the [demo README](https://github.com/takuya-motoshima/express-sweet/tree/main/demo) for complete details and screenshots.

## API Reference

**[Complete API Documentation](https://takuya-motoshima.github.io/express-sweet/)**

The comprehensive API reference includes detailed documentation for:

- **[Database](https://takuya-motoshima.github.io/express-sweet/modules/database.html)**: `DatabaseManager`, `Model` classes with full Sequelize integration, and `loadModels` utility
- **[Services](https://takuya-motoshima.github.io/express-sweet/modules/services.html)**: `Authentication` service for user login, logout, and session management
- **[Handlebars Helpers](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.html)**: Complete collection of template helpers including:
  - **[Array](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.array.html)**: `findObjectInArray`
  - **[Comparison](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.comparison.html)**: `eq`, `gt`, `lt`, `and`, `or`, `empty`, `includes`, etc.
  - **[String](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.string.html)**: `replace`, `split`, `formatBytes`
  - **[Date](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.date.html)**: `formatDate`
  - **[Math](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.math.html)**: `add`, `subtract`, `multiply`, `divide`, `ceil`, `floor`, `abs`
  - **[Number](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.number.html)**: `number2locale`
  - **[Object](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.object.html)**: `jsonStringify`, `jsonParse`
  - **[HTML](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.html.html)**: `cacheBusting`, `stripTags`
  - **[Layouts](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.layouts.html)**: `block`, `contentFor`
- **[Configuration Interfaces](https://takuya-motoshima.github.io/express-sweet/modules/interfaces.html)**: TypeScript interfaces for:
  - `AuthenticationConfig`, `AppConfig`, `DatabaseConfig`
  - `LoggingConfig`, `ViewConfig`, `UploadConfig`
- **[Middlewares](https://takuya-motoshima.github.io/express-sweet/modules/middlewares.html)**: Core middleware functions:
  - `corsPolicy`, `envLoader`, `errorHandler`, `globalVars`
  - `requestParser`, `localVars`, `viewEngine`, `passportAuth`, `routeMapper`
- **[Utilities](https://takuya-motoshima.github.io/express-sweet/modules/utils.html)**: Type checking functions and configuration loaders
- **[Mount Function](https://takuya-motoshima.github.io/express-sweet/variables/mount.html)**: Application initialization and setup

## EXPRESS SWEET Generator

Use the application generator tool, `express-sweet-generator`, to quickly create an application skeleton.

![Image](screencaps/demonstration.webp)

1. **Install the generator globally** as an npm package:
   ```bash
   npm install -g express-sweet-generator
   ```

2. **Display command options** with the `-h` flag:
   ```bash
   express-sweet -h

   Usage: express-sweet [options] [dir]

   Options:
       --version                    output the version number
     -o, --output <output>         add output <module> support (esm|cjs) (defaults to cjs)
     -p, --port <port>            application listening port (default: 3000)
     -f, --force                  force on non-empty directory
     -h, --help                   output usage information
   ```

3. **Create your application**. For example, the following creates an Express app named `myapp` using ESM modules:
   ```bash
   express-sweet -o esm myapp
   ```

4. **Install dependencies** and start developing:
   ```bash
   cd myapp/
   npm install
   ```

<details>
<summary><strong>Quick Start</strong></summary>

## Quick Start

### Database Setup

The application skeleton uses a MySQL/MariaDB database. Create a database with the following SQL:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS `sample_db` DEFAULT CHARACTER SET utf8mb4;

USE `sample_db`;

-- User table: Stores user account information
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `name` varchar(30) NOT NULL COMMENT 'User display name',
  `email` varchar(255) NOT NULL COMMENT 'User email address (unique)',
  `password` varchar(100) NOT NULL COMMENT 'Encrypted password',
  `icon` varchar(768) NOT NULL DEFAULT MD5(RAND()) COMMENT 'User icon path or identifier',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukUserEmail` (`email`),
  UNIQUE KEY `ukUserIcon`(`icon`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User accounts table';

-- Profile table: Stores additional user profile information
CREATE TABLE `profile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `address` varchar(255) NOT NULL COMMENT 'User address',
  `tel` varchar(14) NOT NULL COMMENT 'User telephone number',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukProfileUserId` (`userId`),
  CONSTRAINT `fkProfileUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User profiles table';

-- Comment table: Stores user comments
CREATE TABLE `comment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `text` text NOT NULL COMMENT 'Comment text content',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  CONSTRAINT `fkCommentUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User comments table';

-- Book table: Stores user books
CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `userId` int(10) unsigned NOT NULL COMMENT 'Foreign key to user table',
  `title` text NOT NULL COMMENT 'Book title',
  `created` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Record creation timestamp',
  `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Record last modified timestamp',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ukBookTitle` (`userId`, `title`(255)),
  CONSTRAINT `fkBookUser` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User books table';

-- Sample data insertion
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

### Database Configuration

Configure the database connection in `config/database.js`. For detailed options, refer to the [Sequelize documentation](https://sequelize.org/docs/v6/other-topics/migrations/#cfg).

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

### Environment Configuration

The database environment can be defined for each deployment stage. Specify the environment in the `.env` file:

```bash
NODE_ENV=development
```

### Running the Application

Start the application with the following command:

```bash
npm start
```

Then open `http://localhost:3000/` in your browser to access the application.

</details>

<details>
<summary><strong>Project Structure</strong></summary>

## Project Structure

The generated application has the following directory structure:

```bash
.
├── .env                          # Environment variables configuration
├── app.js                        # Main application entry point
├── ecosystem.config.js           # PM2 process manager configuration
├── nginx.sample.conf             # Sample Nginx reverse proxy configuration
├── package.json                  # Node.js dependencies and scripts
├── bin
│   └── www                       # Application startup script
├── client                        # Frontend application directory
│   ├── package.json              # Frontend dependencies
│   ├── webpack.config.js         # Webpack bundler configuration
│   └── src                       # Frontend source code
├── config                        # Application configuration files
│   ├── authentication.js         # Authentication and session settings
│   ├── config.js                 # Core application configuration
│   ├── database.js               # Database connection settings
│   ├── logging.js                # HTTP request logging configuration
│   ├── upload.js                 # File upload configuration
│   └── view.js                   # Template engine configuration
├── errors                        # Custom error classes
│   └── UserNotFound.js           # Custom error definitions
├── models                        # Database models (Sequelize ORM)
│   ├── BookModel.js              # Book entity model
│   ├── CommentModel.js           # Comment entity model
│   ├── ProfileModel.js           # User profile model
│   └── UserModel.js              # User entity model
├── public                        # Static assets directory
│   ├── build                     # Compiled frontend assets
│   └── upload                    # User uploaded files
├── routes                        # Express route definitions
│   ├── login.js                  # Authentication routes
│   ├── users.js                  # User management routes
│   └── api                       # API endpoints
│       └── users.js              # User API routes
├── shared                        # Shared utilities and helpers
│   ├── CustomValidation.js       # Custom validation functions
│   └── empty.js                  # Utility functions
└── views                         # Handlebars template files
    ├── edit-personal.hbs         # Profile editing template
    ├── error.hbs                 # Error page template
    ├── login.hbs                 # Login page template
    ├── personal.hbs              # Profile display template
    ├── users.hbs                 # Users listing template
    ├── layout                    # Layout templates
    │   └── default.hbs           # Default page layout
    └── partials                  # Reusable template components
        └── .gitkeep              # Placeholder for partial templates
```

### Key Directories Explained

**Configuration (`config/`)**  
Contains all application settings divided by functionality. Modify these files to customize database connections, authentication behavior, view rendering, and logging.

**Models (`models/`)**  
Database entities using Sequelize ORM. Each model represents a database table and defines the schema, relationships, and business logic for that entity.

**Routes (`routes/`)**  
URL endpoint handlers organized by feature. The file structure automatically maps to URL paths - for example, `routes/api/users.js` handles requests to `/api/users`.

**Views (`views/`)**  
Handlebars templates for rendering HTML pages. The `layout/` directory contains base templates, while `partials/` holds reusable components.

**Public (`public/`)**
Static files served directly by the web server. The `build/` directory contains compiled frontend assets, while `upload/` stores user-generated content.

</details>

<details>
<summary><strong>Configuration</strong></summary>

## Configuration

EXPRESS SWEET uses several configuration files to customize application behavior. Each configuration file corresponds to a specific aspect of the framework:

### Environment Variables

If you set the environment variable file in `env_path` of `config/config.js`, the values will be automatically loaded into `process.env`.

The `NODE_ENV` environment variable is required. If omitted, `development` is used by default.

You can access environment variables and perform custom logic as needed:
```js
if (process.env.NODE_ENV === 'development') {
  // Development-specific logic
}
```

### Base Configuration (`config/config.js`)

The core configuration of EXPRESS SWEET is defined in the `config/config.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/config.js)
- [CJS Configuration](configuration_sample/cjs/config.js)

**Configuration Options:**

- **`env_path: string`**  
  Environment variable file (`.env`) path. Defaults to `undefined`.  
  When the EXPRESS SWEET application starts, the environment file contents are automatically loaded into `process.env`.

- **`cors_enabled: boolean`**  
  Enable CORS (Cross-Origin Resource Sharing). Defaults to `false`.  
  Set to `true` to allow requests from other domains.

- **`max_body_size: string|number`**  
  Maximum request body size. Defaults to `100kb`.  
  If a number, specifies bytes. If a string, parsed by the [bytes library](https://www.npmjs.com/package/bytes).

- **`router_dir: string`**  
  Absolute path to the router directory. Defaults to `<application root>/routes`.

- **`default_router: string`**  
  Endpoint to run when the root URL is requested. Defaults to `undefined`.  
  EXPRESS SWEET can load a default router when no URI is present (root URL `/` requests).

- **`rewrite_base_url: (baseUrl: string) => string`**  
  Hook to rewrite the base URL for `app.locals.baseUrl` and view's `baseUrl` variable.  
  Default value is the referrer's origin (e.g., `https://example.com`).

- **`is_ajax: (req: express.Request) => boolean`**  
  Custom logic to determine Ajax requests.  
  Defaults to checking for XMLHttpRequest in headers (`req.xhr`).

- **`hook_handle_error: (error: any, req: express.Request, res: express.Response, next: express.NextFunction) => void`**  
  Custom error handling hook. If unset, returns appropriate HTTP status codes.

### Database Configuration (`config/database.js`)

Database settings are defined in the `config/database.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/database.js) 
- [CJS Configuration](configuration_sample/cjs/database.js)

**Configuration Options:**

- **`username: string`** - Database authentication username
- **`password: string|null`** - Database authentication password (default: `null`)
- **`database: string`** - Database name
- **`host: string`** - Database host
- **`port: number|null`** - Database port (default: auto-select)
- **`dialect: string`** - Database dialect: `mariadb`, `mysql`, `postgres`, `sqlite`, or `mssql`
- **`logging: boolean|(...message: any[]) => void`** - Query logging (default: `false`)
- **`timezone: string`** - Database timezone (e.g., `'+09:00'` for JST)

### Authentication Configuration (`config/authentication.js`)

User authentication settings are defined in the `config/authentication.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/authentication.js)
- [CJS Configuration](configuration_sample/cjs/authentication.js)

### View Configuration (`config/view.js`)

Template engine settings are defined in the `config/view.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/view.js)
- [CJS Configuration](configuration_sample/cjs/view.js)

### Logging Configuration (`config/logging.js`)

HTTP request logging settings are defined in the `config/logging.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/logging.js)
- [CJS Configuration](configuration_sample/cjs/logging.js)

### Upload Configuration (`config/upload.js`)

File upload settings using Multer are defined in the `config/upload.js` file.

**Sample configurations:**
- [ESM Configuration](configuration_sample/esm/upload.js)
- [CJS Configuration](configuration_sample/cjs/upload.js)

**Configuration Options:**

- **`enabled: boolean`**
  Enable file upload middleware. Defaults to `false`.
  If `config/upload.js` doesn't exist, upload middleware won't be applied.

- **`resolve_middleware: (req: express.Request, multer: typeof import('multer')) => Function|null`**
  Hook function to dynamically resolve multer middleware based on request.
  Return a multer middleware instance or `null` to skip upload handling for the request.

**Storage Options:**

- **Memory Storage** (`multer.memoryStorage()`): Stores files in memory as Buffer objects. Fast and suitable for small files or when you need to process files immediately.
- **Disk Storage** (`multer.diskStorage()`): Stores files on disk. Better for large files or when you need persistent storage.

**Configuration Examples:**

```js
// Single file upload
resolve_middleware: (req, multer) => {
  if (req.path === '/api/user/avatar' && req.method === 'POST') {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.single('avatar');
  }
  return null;
}

// Multiple files with same field name
resolve_middleware: (req, multer) => {
  if (req.path === '/api/gallery' && req.method === 'POST') {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.array('photos', 10);
  }
  return null;
}

// Multiple file fields
resolve_middleware: (req, multer) => {
  if (req.path === '/api/admin/firms' && req.method === 'POST') {
    const upload = multer({ storage: multer.memoryStorage() });
    return upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'eyecatch', maxCount: 1 }
    ]);
  }
  return null;
}
```

**Accessing Uploaded Files in Routes:**

```js
import {Router} from 'express';

const router = Router();

// Single file upload
router.post('/avatar', (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access file properties
  console.log(req.file.originalname);  // Original filename
  console.log(req.file.mimetype);      // MIME type
  console.log(req.file.size);          // File size in bytes
  console.log(req.file.buffer);        // File data (memory storage)

  res.json({ success: true, filename: req.file.originalname });
});

// Multiple files (array)
router.post('/gallery', (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Access files array
  req.files.forEach(file => {
    console.log(file.originalname);
  });

  res.json({ success: true, count: req.files.length });
});

// Multiple fields
router.post('/firms', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Access specific fields
  const logo = req.files['logo'] ? req.files['logo'][0] : null;
  const eyecatch = req.files['eyecatch'] ? req.files['eyecatch'][0] : null;

  res.json({
    success: true,
    logo: logo ? logo.originalname : null,
    eyecatch: eyecatch ? eyecatch.originalname : null
  });
});

export default router;
```

</details>

<details>
<summary><strong>Routing</strong></summary>

## Routing

Routing determines how an application responds to client requests for specific endpoints, defined by a URI path and HTTP request method (GET, POST, etc.).

### Basic Routing

All routes are defined in route files located in the `routes/` directory. These files are automatically mapped by EXPRESS SWEET to URL endpoints based on their file paths.

**Example:** `routes/user.js` responds to `GET /user` requests:
```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;
```

### Nested Routing

The router supports nested folder structures. Nested files are automatically routed following the same path convention.

**Example:** `routes/api/users.js` responds to `GET /api/users` requests:
```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;
```

### Default Routing

EXPRESS SWEET can load a default router when no URI is present (root URL `/` requests). To specify a default router, set `default_router` in your `config/config.js` file:

```js
default_router: '/blog'
```

Where `blog` corresponds to the router module name. Create the corresponding `routes/blog.js` module:

```js
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;
```

Now when you request the root URL (`/`), you will see "Hello World".

### Routing Methods

Express supports routing methods corresponding to HTTP methods:

- `checkout`, `copy`, `delete`, `get`, `head`, `lock`, `merge`, `mkactivity`, `mkcol`, `move`, `m-search`, `notify`, `options`, `patch`, `post`, `purge`, `put`, `report`, `search`, `subscribe`, `trace`, `unlock`, `unsubscribe`

For comprehensive routing documentation, see the [Express Routing Guide](https://expressjs.com/en/guide/routing.html#express-router).

</details>

<details>
<summary><strong>Model</strong></summary>

## Model

Models provide a structured way to interact with specific database tables in your application. EXPRESS SWEET provides a [Sequelize](https://sequelize.org/docs/v6/)-based model class that offers powerful features including:

- **Automatic database connection management**
- **Built-in CRUD methods**
- **Query builder integration**
- **Model relationships and associations**
- **Data validation and hooks**

This base class provides a solid foundation for building your application's model layer, allowing you to rapidly develop database interactions with minimal boilerplate code.

### Accessing Models

Place your model files in the `models/` directory of your application root. Once loaded, you have immediate access to all model functions for database operations.

**Basic model usage:**
```js
import BookModel from '../models/BookModel.js';

// Create a new record
// SQL: INSERT INTO book (title, userId) VALUES ('Beautiful', 1)
await BookModel.create({
  title: 'Beautiful',
  userId: 1
});

// Find all records
// SQL: SELECT * FROM book
const allBooks = await BookModel.findAll();

// Find with conditions
// SQL: SELECT * FROM book WHERE userId = 1
const userBooks = await BookModel.findAll({
  where: { userId: 1 }
});

// Update records
// SQL: UPDATE book SET title = 'Beautiful' WHERE id = 1
await BookModel.update(
  { title: 'Beautiful' }, 
  { where: { id: 1 } }
);

// Delete records
// SQL: DELETE FROM book WHERE id = 1
await BookModel.destroy({
  where: { id: 1 }
});

// Find single record
// SQL: SELECT * FROM book WHERE title = 'Beautiful' LIMIT 1
const book = await BookModel.findOne({
  where: { title: 'Beautiful' }
});
```

### Creating Custom Models

To leverage EXPRESS SWEET's model capabilities, create a new model class that extends `database.Model`. This provides convenient access to the database connection, query builder, and additional utility methods.

**Basic model structure:**
```js
import * as expx from 'express-sweet';

export default class UserModel extends expx.database.Model {
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
      created: this.DataTypes.DATE,
      modified: this.DataTypes.DATE
    };
  }
}
```

### Model Relationships

EXPRESS SWEET supports Sequelize associations for building data relationships:

```js
// Define associations in your model
static associate(models) {
  // One-to-One: User has one Profile
  this.hasOne(models.ProfileModel, {
    foreignKey: 'userId'
  });
  
  // One-to-Many: User has many Books
  this.hasMany(models.BookModel, {
    foreignKey: 'userId'
  });
}
```

For comprehensive model documentation and advanced features, see the [Model API Reference](https://takuya-motoshima.github.io/express-sweet/modules/database.html).

</details>

<details>
<summary><strong>View System</strong></summary>

## View System

EXPRESS SWEET uses Handlebars as its template engine with automatic layout support and a rich set of custom helpers.

### Layout Usage

There are three ways to specify a layout, listed in order of precedence:

1. **Declarative within a page** using Handlebars comments:
   ```handlebars
   {{!< LAYOUT}}
   ```

2. **As an option to render**:
   ```js
   res.render('veggies', {
     title: 'My favorite veggies',
     veggies: veggies,
     layout: 'layout/veggie'
   });
   ```

   To suppress layout rendering:
   ```js
   res.render('veggies', {
     title: 'My favorite veggies',
     veggies: veggies,
     layout: null // render without using a layout template
   });
   ```

3. **Default layout** using `default_layout` specified in view configuration.

### Template Syntax

**Mark where layout should insert page content:**
```handlebars
{{{body}}}
```

**Declare a block placeholder in layout:**
```handlebars
{{{block "script"}}}
```

**Define block content in a page:**
```handlebars
{{#contentFor "script"}}
  <script src="/js/page-specific.js"></script>
{{/contentFor}}
```

### Handlebars Helpers

EXPRESS SWEET provides a comprehensive collection of custom helpers for common template operations:

#### Array Helpers

Work with arrays and objects within arrays:

```handlebars
{{!-- Find object in array by property --}}
{{#each items}}
  {{#if (eq id 123)}}
    {{lookup (findObjectInArray ../items 'id' id) 'name'}}
  {{/if}}
{{/each}}
```

#### Comparison Helpers

Perform logical and comparison operations:

```handlebars
{{!-- Equality checks --}}
{{#if (eq status 'active')}}Active User{{/if}}

{{!-- Numerical comparisons --}}
{{#if (gt score 90)}}Excellent Score{{/if}}
{{#if (lt age 18)}}Minor{{/if}}

{{!-- Logical operations --}}
{{#if (and isLoggedIn hasPermission)}}Show Protected Content{{/if}}
{{#if (or isAdmin isModerator)}}Show Admin Controls{{/if}}

{{!-- Empty/existence checks --}}
{{#if (empty comments)}}No comments yet{{/if}}
{{#if (includes roles 'admin')}}Admin Access{{/if}}
```

#### HTML Helpers

HTML and asset management utilities:

```handlebars
{{!-- Cache busting for static assets --}}
<link rel="stylesheet" href="{{cacheBusting '/css/style.css'}}">
<script src="{{cacheBusting '/js/app.js'}}"></script>

{{!-- Strip HTML tags from content --}}
{{{stripTags '<p>Hello <strong>World</strong></p>'}}} {{!-- Results: Hello World --}}
```

#### Object Helpers

JSON serialization and parsing:

```handlebars
{{!-- Convert objects to JSON strings --}}
<script>
var userData = {{{jsonStringify user}}};
var config = {{{jsonStringify appConfig}}};
</script>

{{!-- Parse JSON strings back to objects --}}
{{#with (jsonParse jsonString)}}
  <h1>{{name}}</h1>
  <p>{{email}}</p>
{{/with}}
```

#### String Helpers

String manipulation and formatting:

```handlebars
{{!-- String replacement --}}
<h1>{{replace title 'Draft' 'Published'}}</h1>

{{!-- Split strings into arrays --}}
{{#each (split tags ',')}}
  <span class="tag">{{trim this}}</span>
{{/each}}

{{!-- Format file sizes --}}
<p>File size: {{formatBytes fileSize 2}}</p>
{{!-- Example output: File size: 1.23 MB --}}
```

#### Date Helpers

Date and time formatting with internationalization support:

```handlebars
{{!-- Format dates with custom patterns --}}
<p>Created: {{formatDate 'YYYY/MM/DD' createdAt}}</p>
<p>Time: {{formatDate 'HH:mm:ss' timestamp}}</p>

{{!-- Localized date formatting --}}
<p>Date: {{formatDate 'MMMM Do, YYYY' publishedAt 'en-US'}}</p>
<p>日付: {{formatDate 'YYYY年MM月DD日' publishedAt 'ja-JP'}}</p>
```

#### Number Helpers

Number formatting with locale support:

```handlebars
{{!-- Localized number formatting --}}
<p>Price: ${{number2locale price 'en-US'}}</p>
<p>Total: €{{number2locale total 'de-DE'}}</p>
<p>Count: {{number2locale userCount 'ja-JP'}}</p>
```

#### Math Helpers

Mathematical operations for template calculations:

```handlebars
{{!-- Basic arithmetic --}}
<p>Total: ${{add price tax}}</p>
<p>Discount: ${{subtract price discount}}</p>
<p>Amount: ${{multiply quantity unitPrice}}</p>
<p>Average: {{divide total count}}</p>

{{!-- Rounding functions --}}
<p>Rounded up: {{ceil 4.3}}</p> {{!-- Results: 5 --}}
<p>Rounded down: {{floor 4.7}}</p> {{!-- Results: 4 --}}
<p>Absolute value: {{abs -15}}</p> {{!-- Results: 15 --}}
```

For complete documentation of all helpers and their options, see the [Handlebars Helpers API Reference](https://takuya-motoshima.github.io/express-sweet/modules/handlebars_helpers.html).

</details>

<details>
<summary><strong>Authentication</strong></summary>

## Authentication

EXPRESS SWEET includes built-in Passport authentication middleware for username and password authentication. You can immediately implement user authentication using the authentication configuration file and authentication service module.

**Note:** If an unauthenticated user requests a URL that requires authentication, they will be redirected to the page specified by `failure_redirect`. For asynchronous requests, a `401` error is returned.

### Login Example

#### Asynchronous Login (Ajax)

Returns the authentication result for frontend processing:

```js
import {Router} from 'express';
import * as expx from 'express-sweet';

const router = Router();
router.post('/login', async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  res.json(isAuthenticated);
});

export default router;
```

**Frontend HTML example:**
```html
<form id="loginForm">
  <label>Email</label>
  <input type="email" name="email" required autofocus>
  <label>Password</label>
  <input type="password" name="password" required>
  <button type="submit">Login</button>
</form>

<script>
const form = document.querySelector('#loginForm');
form.addEventListener('submit', async event => {
  event.preventDefault();
  
  const res = await fetch('/api/users/login', {
    method: 'POST', 
    body: new FormData(form)
  });
  
  const isAuthenticated = await res.json();
  if (!isAuthenticated) {
    alert('The username or password is incorrect.');
    return;
  }
  
  location.href = '/dashboard';
});
</script>
```

#### Synchronous Login (Form Submit)

Redirects based on authentication result:

```js
import {Router} from 'express';
import * as expx from 'express-sweet';

const router = Router();
router.post('/login', async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  
  if (isAuthenticated) {
    await expx.services.Authentication.successRedirect(res);
  } else {
    await expx.services.Authentication.failureRedirect(req, res);
  }
});

export default router;
```

**Frontend HTML example:**
```html
<form method="post" action="/api/users/login">
  <label>Email</label>
  <input type="email" name="email" required autofocus>
  <label>Password</label>
  <input type="password" name="password" required>
  <button type="submit">Login</button>
</form>
```

### Logout Example

To log out a user, call the `services.Authentication.logout()` method. This removes the `req.user` property and clears the login session:

```js
import {Router} from 'express';
import * as expx from 'express-sweet';

const router = Router();
router.get('/logout', (req, res) => {
  expx.services.Authentication.logout(req);
  res.redirect('/login');
});

export default router;
```

**Frontend HTML example:**
```html
<a href="/api/users/logout">Logout</a>
```

For detailed authentication configuration options, see the [Configuration](#configuration) section and [Authentication API Reference](https://takuya-motoshima.github.io/express-sweet/classes/services.Authentication.html).

</details>

<details>
<summary><strong>Examples</strong></summary>

## Examples

### RESTful API Development

Build RESTful APIs with essential CRUD operations:

```js
import {Router} from 'express';
import BookModel from '../models/BookModel.js';

const router = Router();

// GET /api/books - List all books
router.get('/books', async (req, res, next) => {
  try {
    const books = await BookModel.findAll({
      order: [['created', 'DESC']],
      include: ['UserModel']
    });

    res.json({ books });
  } catch (error) {
    next(error);
  }
});

// POST /api/books - Create a new book
router.post('/books', async (req, res, next) => {
  try {
    const { title, userId } = req.body;
    
    const newBook = await BookModel.create({
      title,
      userId: userId || req.user.id
    });

    res.status(201).json({
      success: true,
      book: newBook
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/books/:id - Update a book
router.put('/books/:id', async (req, res, next) => {
  try {
    const { title } = req.body;
    const bookId = req.params.id;

    const [updatedRows] = await BookModel.update(
      { title },
      { where: { id: bookId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    const updatedBook = await BookModel.findByPk(bookId);
    res.json({
      success: true,
      book: updatedBook
    });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Advanced View Usage

Comprehensive view rendering with layouts and data:

```js
import {Router} from 'express';
import UserModel from '../models/UserModel.js';
import BookModel from '../models/BookModel.js';

const router = Router();

// Render page with custom layout
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: { id: req.params.id },
      include: ['ProfileModel']
    });

    if (!user) {
      return res.status(404).render('errors/404', {
        title: 'User Not Found'
      });
    }

    const userBooks = await BookModel.findAll({
      where: { userId: req.params.id },
      order: [['created', 'DESC']],
      limit: 10
    });

    res.render('profile', {
      title: `${user.name}'s Profile`,
      user,
      books: userBooks,
      layout: 'layout/profile'
    });
  } catch (error) {
    next(error);
  }
});

// Render partial view without layout
router.get('/api/partial/user-stats', async (req, res) => {
  try {
    const bookCount = await BookModel.count({
      where: { userId: req.user.id }
    });

    res.render('partials/user-stats', {
      bookCount,
      layout: null
    });
  } catch (error) {
    next(error);
  }
});

export default router;
```

### Environment-Specific Configuration

Configure different settings for development, testing, and production:

```js
// config/config.js
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export default {
  env_path: '.env',
  cors_enabled: isDevelopment,
  max_body_size: isProduction ? '10mb' : '100mb',
  
  // Custom error handling
  hook_handle_error: (error, req, res, next) => {
    if (error.status === 404) {
      res.status(404).render('errors/404', { 
        title: 'Page Not Found'
      });
    } else {
      if (isProduction) {
        console.error('Server Error:', error);
      }
      
      res.status(500).render('errors/500', {
        title: 'Server Error',
        error: isDevelopment ? error : null
      });
    }
  },

  // Custom Ajax detection
  is_ajax: (req) => {
    return req.xhr || 
           req.path.startsWith('/api/') || 
           req.get('Accept')?.includes('application/json');
  }
};
```

### Error Handling

Implement proper error handling in your routes:

```js
import {Router} from 'express';
import UserModel from '../models/UserModel.js';

const router = Router();

// Route with comprehensive error handling
router.post('/users', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // Input validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }
    
    // Create user
    const user = await UserModel.create({
      name,
      email,
      password
    });
    
    res.status(201).json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      }
    });
    
  } catch (error) {
    next(error);
  }
});

export default router;
```

</details>

## Release Notes

All changes and version history can be found in the [CHANGELOG.md](CHANGELOG.md).

## Author

**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [x/takuya_motech](https://x.com/takuya_motech)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License

[MIT](LICENSE)