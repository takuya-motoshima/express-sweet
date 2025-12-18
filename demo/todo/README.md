# TODO Demo

A simple TODO application demonstrating EXPRESS SWEET features including database integration, authentication, and Handlebars views with Bootstrap 5 styling.

## Features

- User authentication with Passport.js
- Database integration with Sequelize ORM
- CRUD operations for TODO items via RESTful API
- Async operations with fetch API (no page reloads)
- Bootstrap 5 UI
- Session management

## Prerequisites

- Node.js (v14 or higher)
- MariaDB or MySQL

## Database Setup

1. Create the database and tables by running the SQL script:

```bash
mysql -u root -p < schema.sql
```

This will create:
- Database: `todo_demo`
- Tables: `users`, `todos`
- Sample users: `admin` and `demo` (both with password: `password`)
- Sample TODO items

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure database connection in `config/database.js`

3. Start the application:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Default Credentials

- Username: `admin` / Password: `password`
- Username: `demo` / Password: `password`

**Note:** Passwords are stored in plain text for demo purposes only. Never do this in production!

## Demo Structure

```
todo/
├── bin/www                 # Application entry point
├── config/                 # Configuration files
│   ├── config.js          # Application config
│   ├── database.js        # Database config
│   ├── authentication.js  # Authentication config
│   ├── logging.js         # Logging config
│   └── view.js            # View engine config
├── models/                 # Sequelize models
│   ├── UserModel.js       # User model with todos association
│   └── TodoModel.js       # Todo model with user association
├── routes/                 # Route handlers
│   ├── api/               # API routes for async operations
│   │   ├── todos.js       # RESTful TODO endpoints
│   │   └── users.js       # Login endpoint
│   ├── login.js           # Login page
│   ├── logout.js          # Logout handler
│   └── todos.js           # Todos page
├── views/                  # Handlebars templates
│   ├── layout/
│   │   └── default.hbs    # Bootstrap 5 layout with navbar
│   ├── login.hbs          # Login form with async submission
│   └── todos.hbs          # Todo list with fetch API
├── schema.sql              # Database schema with sample data
└── README.md
```

## Architecture

This demo uses a modern async architecture:

- **Page Routes** (`routes/*.js`) render Handlebars views
- **API Routes** (`routes/api/*.js`) handle async requests and return JSON
- **Views** use fetch API for all CRUD operations without page reloads
- **Models** use camelCase for database columns (userId, created, updated)
