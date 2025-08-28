# EXPRESS SWEET Docker Demo

This repository demonstrates how to run EXPRESS SWEET in a Docker environment with MariaDB.

## Prerequisites

- Docker and Docker Compose installed
- `express-sweet-generator` npm package

## Directory Structure

```bash
.
├── app/                    # Express SWEET Application
├── sql/                    # Database schema and initial data
├── volumes/                # Docker container volumes
├── docker-compose.yaml     # Docker services configuration
├── Dockerfile             # Application container definition
└── nodemon.json           # Development server configuration
```

## Quick Start

### 1. Generate Express Application

Install the generator globally and create a new application:

```bash
npm install -g express-sweet-generator
express-sweet app
```

### 2. Configure Database Connection

Update `app/config/database.js` to work with Docker containers.

The configuration dynamically switches between Docker and local development environments:

```javascript
/**
    * Database configuration.
 */
const host = process.env.IS_DOCKER ? 'sample_db' : 'localhost';

module.exports = {
  development: {
    username: 'root',
    // password: 'password',  // Commented out for passwordless setup
    database: 'sample_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  },
  production: {
    username: 'root',
    database: 'sample_db',
    host,
    port: undefined,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
};
```

### 3. Launch Docker Environment

Start the database and application containers:

```bash
docker-compose up -d
```

**Troubleshooting:** If you encounter build errors, clean the node_modules directories:

```bash
rm -rf app/node_modules/ app/client/node_modules/
docker-compose up -d --build
```

### 4. Start the Application

Connect to the application container and start the development server:

```bash
docker exec -it express_sweet_app bash
npm start
```

### 5. Access the Demo

Open your browser and navigate to: **http://localhost:3000**

## Available Services

| Service | Container Name | Port | Description |
|---------|----------------|------|-------------|
| Application | express_sweet_app | 3000 | EXPRESS SWEET demo application |
| Database | sample_db | 3306 | MariaDB database server |

## Database Schema

The demo includes a complete sample database with the following tables:

- **user** - User accounts with authentication
- **profile** - User profile information (1:1 with user)
- **comment** - User comments (1:many with user)
- **book** - User books (many:many with user)

Sample data is automatically loaded when the containers start.

## Useful Commands

### Container Management

```bash
# Rebuild containers with latest changes
docker-compose up -d --build

# Rebuild without cache (for major changes)
docker-compose build --no-cache
docker-compose up -d

# View container logs
docker-compose logs -f express_sweet_app

# Stop all services
docker-compose down
```

### Database Operations

```bash
# Connect to MariaDB console
docker exec -it sample_db bash -c "mysql -uroot -D sample_db"

# View database logs
docker-compose logs -f sample_db

# Backup database
docker exec sample_db mysqldump -uroot sample_db > backup.sql
```

### Development Workflow

```bash
# Access application container shell
docker exec -it express_sweet_app bash

# Install new npm packages
docker exec -it express_sweet_app npm install package-name

# View application logs
docker exec -it express_sweet_app npm run logs
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `IS_DOCKER` | `true` | Indicates running in Docker environment |
| `NODE_ENV` | `development` | Node.js environment mode |
| `PORT` | `3000` | Application server port |

## File Structure in Container

```bash
/app/
├── config/          # Configuration files
├── models/          # Database models
├── routes/          # Route handlers  
├── views/           # Handlebars templates
├── public/          # Static assets
└── client/          # Frontend build tools
```

## Features Demonstrated

- **User Authentication** - Login/logout with session management
- **Database Relations** - Sequelize associations between models
- **View Templates** - Handlebars templating with helpers
- **Static Assets** - CSS/JS serving and build process
- **API Routes** - RESTful endpoints for data operations

## Next Steps

1. Explore the generated code in the `app/` directory
2. Review the database schema in `sql/schema.sql`
3. Modify routes in `app/routes/` to add new functionality
4. Customize views in `app/views/` for UI changes
5. Add new models in `app/models/` for additional data

For more information about EXPRESS SWEET features, visit the [official documentation](https://www.npmjs.com/package/express-sweet).