# EXPRESS SWEET Web Application Demo

A complete web application demonstrating EXPRESS SWEET's core features including server-side rendering, user authentication, and database integration with Docker and MariaDB.

## Features

- **User Authentication** - Session-based login/logout system
- **CRUD Operations** - Create, read, update, and delete users
- **Database Relations** - Sequelize associations (1:1, 1:N, N:M)
- **View Templates** - Handlebars templating with custom helpers
- **Docker Environment** - Containerized app and database setup

## Prerequisites

- Docker and Docker Compose
- `express-sweet-generator` npm package

## Quick Start

### 1. Generate Application

```bash
npm install -g express-sweet-generator
express-sweet app
```

### 2. Configure Database

Update `app/config/database.js` to support Docker:

```javascript
const host = process.env.IS_DOCKER ? 'sample_db' : 'localhost';

module.exports = {
  development: {
    username: 'root',
    database: 'sample_db',
    host,
    dialect: 'mariadb',
    timezone: '+09:00',
    logging: false
  }
};
```

### 3. Start Services

```bash
# Start containers
docker-compose up -d

# Troubleshooting: Clean build if needed
rm -rf app/node_modules/ app/client/node_modules/
docker-compose up -d --build
```

### 4. Run Application

```bash
docker exec -it express_sweet_app bash
npm start
```

### 5. Access

Open **http://localhost:3000** in your browser.

## Project Structure

```
.
├── app/                    # Express application (generated)
│   ├── config/            # Configuration files
│   ├── models/            # Sequelize models
│   ├── routes/            # Route handlers
│   ├── views/             # Handlebars templates
│   └── public/            # Static assets
├── sql/                   # Database schema and seed data
├── volumes/               # Docker persistent data
├── docker-compose.yaml    # Service definitions
├── Dockerfile            # App container image
└── nodemon.json          # Dev server config
```

## Database Schema

Four related tables demonstrating Sequelize associations:

- **user** - User accounts with authentication credentials
- **profile** - Extended user information (1:1 relation)
- **comment** - User-generated comments (1:N relation)
- **book** - Books owned by users (N:M relation)

Sample data is loaded automatically on first startup.

## Docker Services

| Service | Container | Port | Description |
|---------|-----------|------|-------------|
| app | `express_sweet_app` | 3000 | Node.js application |
| db | `sample_db` | 3306 | MariaDB 10.8.8 |

## Common Commands

### Container Management

```bash
# View logs
docker-compose logs -f express_sweet_app

# Restart services
docker-compose restart

# Stop all
docker-compose down

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up -d
```

### Database Access

```bash
# Open MySQL console
docker exec -it sample_db mysql -uroot -D sample_db

# Backup database
docker exec sample_db mysqldump -uroot sample_db > backup.sql

# View DB logs
docker-compose logs -f sample_db
```

### Development

```bash
# Access container shell
docker exec -it express_sweet_app bash

# Install packages inside container
docker exec -it express_sweet_app npm install package-name

# Watch application logs
docker exec -it express_sweet_app npm run logs
```

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `IS_DOCKER` | `true` | Switches database host between container and localhost |
| `NODE_ENV` | `development` | Node environment mode |
| `PORT` | `3000` | HTTP server port |

## Next Steps

1. **Explore Code** - Check `app/routes/` for route handlers
2. **Add Features** - Create new routes and models
3. **Customize UI** - Modify Handlebars templates in `app/views/`
4. **Review Schema** - Study database relations in `sql/schema.sql`

For comprehensive documentation, visit the [EXPRESS SWEET npm package](https://www.npmjs.com/package/express-sweet).
