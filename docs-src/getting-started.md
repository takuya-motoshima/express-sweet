Express Sweet is a powerful Express.js extension that streamlines your development workflow with comprehensive utilities and enhancements.

## Express 5 Support

**Version 4.0+ brings full Express 5 compatibility with production-ready solutions:**

- **Express 5.2.1** - Latest Express version with modern features
- **Node.js 18+** - Requires Node.js 18.x or higher
- **Query Parser Behavior** - Maintains Express 4 nested query object support
- **Multipart Form Support** - Built-in handling for file uploads and form submissions
- **Modern Route Patterns** - Full RegExp with named capture groups support

For more details on Express 5 changes, see the [Express.js Release Notes](https://expressjs.com/en/changelog/).

## Quick Start

### Project Generator (Recommended)

The fastest way to get started is using the express-sweet-generator CLI tool.

**1. Install the generator globally:**
```bash
npm install -g express-sweet-generator
```

**2. Create your application:**
```bash
# CommonJS project (default)
express-sweet myapp

# ESM project
express-sweet -o esm myapp

# With custom port
express-sweet -o esm -p 8080 myapp
```

**3. Install dependencies and start:**
```bash
cd myapp
npm install
npm start
```

**Generator Options:**
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

This generates a complete project structure with:
- Pre-configured Express Sweet setup
- Sample models, routes, and views
- Database configuration templates
- Authentication scaffolding
- Development and production configurations

### Manual Installation

For existing projects or custom setups:

```bash
npm install express-sweet
```

**Basic Setup:**

```js
import express from 'express';
import * as expx from 'express-sweet';

const app = express();
await expx.mount(app);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Project Structure

Create the following directory structure:

```
your-app/
├── config/                 # Application configuration files
│   ├── config.js           # Core application configuration
│   ├── database.js         # Database connection settings
│   ├── authentication.js   # Authentication and session settings
│   ├── view.js             # Template engine configuration
│   ├── logging.js          # HTTP request logging configuration
│   └── upload.js           # File upload configuration
├── models/                 # Database models (Sequelize ORM)
├── routes/                 # Express route definitions
├── views/                  # Handlebars template files
│   ├── layout/             # Layout templates
│   └── partials/           # Reusable template components
└── public/                 # Static assets directory
```

## Configuration Guide

Express Sweet uses modular configuration files to customize application behavior.

### Database Configuration

Configure database connections in `config/database.js`:

```js
export default {
  development: {
    username: 'root',
    password: 'password',
    database: 'myapp_dev',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
```

### Authentication Configuration

Set up user authentication in `config/authentication.js`:

```js
export default {
  enabled: true,
  session_store: 'memory', // or 'redis'
  username: 'email',
  password: 'password',
  success_redirect: '/dashboard',
  failure_redirect: '/login',
  
  authenticate_user: async (username, password) => {
    const {default: UserModel} = await import('../models/UserModel.js');
    return await UserModel.findOne({
      where: { email: username, password }
    });
  }
};
```

### Base Configuration

Core application settings in `config/config.js`:

```js
export default {
  env_path: '.env',
  cors_enabled: true,
  max_body_size: '100mb',
  router_dir: path.join(process.cwd(), 'routes'),
  default_router: '/home'
};
```

### Upload Configuration

File upload settings using Multer in `config/upload.js`:

```js
export default {
  enabled: true,

  resolve_middleware: (req, multer) => {
    // Single file upload
    if (req.path === '/api/user/avatar' && req.method === 'POST') {
      const upload = multer({ storage: multer.memoryStorage() });
      return upload.single('avatar');
    }

    // Multiple files with same field name
    if (req.path === '/api/gallery' && req.method === 'POST') {
      const upload = multer({ storage: multer.memoryStorage() });
      return upload.array('photos', 10);
    }

    // Multiple file fields
    if (req.path === '/api/admin/firms' && req.method === 'POST') {
      const upload = multer({ storage: multer.memoryStorage() });
      return upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'eyecatch', maxCount: 1 }
      ]);
    }

    return null;
  }
};
```

**Storage Options:**

- **Memory Storage** (`multer.memoryStorage()`): Stores files in memory as Buffer objects. Fast, suitable for small files.
- **Disk Storage** (`multer.diskStorage()`): Stores files on disk. Better for large files or persistent storage.

**Accessing Uploaded Files in Routes:**

```js
router.post('/avatar', (req, res) => {
  // Single file: req.file
  console.log(req.file.originalname);
  console.log(req.file.mimetype);
  console.log(req.file.buffer); // for memory storage

  // Multiple files: req.files (array)
  req.files.forEach(file => {
    console.log(file.originalname);
  });

  // Multiple fields: req.files (object)
  console.log(req.files['logo'][0]);
  console.log(req.files['eyecatch'][0]);
});
```

### View Configuration

Template engine settings in `config/view.js`:

```js
export default {
  views_dir: path.join(process.cwd(), 'views'),
  partials_dir: path.join(process.cwd(), 'views/partials'),
  layouts_dir: path.join(process.cwd(), 'views/layout'),
  default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),
  extension: '.hbs',

  beforeRender: (req, res) => {
    // Set custom local variables for templates
    res.locals.siteName = 'My App';
  }
};
```

### Logging Configuration

HTTP request logging settings in `config/logging.js`:

```js
export default {
  format: 'combined', // 'combined', 'common', 'dev', 'short', 'tiny'

  skip: (req, res) => {
    // Skip logging for static files to reduce noise
    return req.path.startsWith('/build/') || req.path.startsWith('/upload/');

    // Or skip logging for specific routes
    // return req.path === '/health';
  }
};
```

## Authentication Guide

### Login Implementation

**Asynchronous Login (Ajax):**
```js
import * as expx from 'express-sweet';

router.post('/login', async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  res.json({ success: isAuthenticated });
});
```

**Synchronous Login (Form):**
```js
router.post('/login', async (req, res, next) => {
  const isAuthenticated = await expx.services.Authentication.authenticate(req, res, next);
  
  if (isAuthenticated) {
    await expx.services.Authentication.successRedirect(res);
  } else {
    await expx.services.Authentication.failureRedirect(req, res);
  }
});
```

### Logout Implementation

```js
router.get('/logout', (req, res) => {
  expx.services.Authentication.logout(req);
  res.redirect('/');
});
```

### Route Protection

```js
// Protect individual routes
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

router.get('/profile', requireAuth, (req, res) => {
  res.render('profile', { user: req.user });
});
```

## Database & Models

### Creating Models

```js
import * as expx from 'express-sweet';

export default class UserModel extends expx.database.Model {
  static get table() {
    return 'users';
  }

  static get attributes() {
    return {
      id: {
        type: this.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: this.DataTypes.STRING,
      email: {
        type: this.DataTypes.STRING,
        unique: true
      }
    };
  }
  
  // Define relationships
  static associate() {
    this.hasMany(BookModel, { foreignKey: 'userId' });
  }
}
```

### Database Operations

```js
import UserModel from '../models/UserModel.js';

// Create
const user = await UserModel.create({
  name: 'John Doe',
  email: 'john@example.com'
});

// Read
const users = await UserModel.findAll();
const user = await UserModel.findOne({ where: { email: 'john@example.com' } });

// Update
await UserModel.update(
  { name: 'Jane Doe' },
  { where: { id: 1 } }
);

// Delete
await UserModel.destroy({ where: { id: 1 } });
```

### Using DatabaseManager (v3.0+)

```js
// Get singleton instance
const db = await expx.database.DatabaseManager.getInstance();

// Check connection
const isConnected = await expx.database.DatabaseManager.isConnected();

// Transaction example
const transaction = await UserModel.begin();
try {
  const user = await UserModel.create({ name: 'John' }, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
}
```

## Routing

### Basic Routing

Routes are automatically mapped based on file structure:

```js
// routes/users.js → GET /users
import {Router} from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.send('Users list');
});

export default router;
```

### Nested Routing

```js
// routes/api/users.js → GET /api/users
router.get('/', async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
});
```

### Route Patterns with RegExp (Express 5)

Use RegExp with named capture groups for parameter validation:

```js
// Match numeric user IDs: /users/123
router.get(/^\/(?<userId>\d+)$/, async (req, res) => {
  const user = await UserModel.findByPk(req.params.userId);
  res.json(user);
});

// The old Express 4 syntax is no longer supported:
// router.get('/:userId(\\d+)', ...) // ❌ Not supported in Express 5
```

### Default Routing

Set a default route in `config/config.js`:

```js
export default {
  default_router: '/blog' // routes/blog.js handles root requests
};
```

## View System

### Template Structure

```handlebars
{{!-- views/users.hbs --}}
{{!< layout/default}}

<h1>Users</h1>
{{#each users}}
  <div>{{name}} - {{email}}</div>
{{/each}}
```

### Layout Usage

```handlebars
{{!-- views/layout/default.hbs --}}
<!DOCTYPE html>
<html>
<head>
  <title>{{title}}</title>
</head>
<body>
  {{{body}}}
  {{{block "scripts"}}}
</body>
</html>
```

### Content Blocks

```handlebars
{{!-- In your page template --}}
{{#contentFor "scripts"}}
  <script src="/js/page-specific.js"></script>
{{/contentFor}}
```

### Using Handlebars Helpers

**Comparison helpers:**
```handlebars
{{#if (eq status 'active')}}Active{{/if}}
{{#if (gt score 90)}}Excellent{{/if}}
```

**String helpers:**
```handlebars
{{replace title 'old' 'new'}}
{{formatBytes fileSize 2}}
```

**Date helpers:**
```handlebars
{{formatDate 'YYYY-MM-DD' createdAt}}
```

**Math helpers:**
```handlebars
Total: ${{add price tax}}
```

## Migration Guide

### v4.0.0 Breaking Changes (Express 5)

**Express 5.2.1 Migration:**

```js
// Requires Node.js 18.x or higher
// npm install express-sweet@4
```

**Route Pattern Changes:**

```js
// Before (Express 4)
router.get('/:userId(\\d+)', (req, res) => {
  const userId = req.params.userId;
});

// After (Express 5)
router.get(/^\/(?<userId>\d+)$/, (req, res) => {
  const userId = req.params.userId; // Works with named capture group
});
```

**Query Parser (Automatic):**

Express Sweet automatically configures `query parser: 'extended'` to maintain Express 4 behavior for nested query objects:

```js
// This works out of the box in Express Sweet
// ?user[email]=test@example.com
console.log(req.query.user.email); // 'test@example.com'

// Without Express Sweet, this would be:
// [Object: null prototype] { user: [Object: null prototype] { email: 'test@example.com' } }
```

**Multipart Form Data:**

Express Sweet includes `multer().none()` middleware by default for forms without files. For file uploads, use `config/upload.js`.

### v3.0.0 Breaking Changes

**DatabaseManager replaces Database class:**

```js
// Before (v2.x)
const db = new expx.database.Database(config.database, config.username, config.password, config);

// After (v3.0+)
const db = await expx.database.DatabaseManager.getInstance();
```

**Configuration loading:**

```js
// All configuration loaders now available
const dbConfig = await expx.utils.loadDatabaseConfig();
const authConfig = await expx.utils.loadAuthenticationConfig();
```

### v2.0.0 Changes

**Authentication hooks now async:**

```js
// Before (v1.x)
authenticate_user: (username, password) => { /* sync */ }

// After (v2.0+)
authenticate_user: async (username, password, req) => { /* async with request context */ }
```

## Examples

### RESTful API

```js
import {Router} from 'express';
import UserModel from '../models/UserModel.js';

const router = Router();

// GET /api/users
router.get('/', async (req, res) => {
  const users = await UserModel.findAll();
  res.json(users);
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/users/:id - Using RegExp for numeric ID validation (Express 5)
router.put(/^\/(?<id>\d+)$/, async (req, res) => {
  const [updated] = await UserModel.update(req.body, {
    where: { id: req.params.id }
  });

  if (updated) {
    const user = await UserModel.findByPk(req.params.id);
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
```

### Environment-Specific Configuration

```js
// config/config.js
const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  cors_enabled: isDevelopment,
  max_body_size: isDevelopment ? '100mb' : '10mb',
  
  hook_handle_error: (error, req, res, next) => {
    if (isDevelopment) {
      res.status(500).json({
        message: error.message,
        stack: error.stack
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
```

## API Reference

The modules and classes below provide the complete API reference for Express Sweet. Click on any module to explore its detailed documentation, method signatures, and usage examples.