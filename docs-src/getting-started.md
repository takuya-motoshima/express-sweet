# Express Sweet API Documentation

Express Sweet is a powerful Express.js extension that streamlines your development workflow with comprehensive utilities and enhancements.

## Quick Start

### Installation

```bash
npm install express-sweet
```

### Basic Setup

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
│   └── logging.js          # HTTP request logging configuration
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
    const UserModel = require('../models/UserModel');
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

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
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