# EXPRESS SWEET REST API Demo

A minimal REST API demonstrating EXPRESS SWEET's CORS support for cross-origin requests with simple CRUD endpoints.

## Features

- **CORS Enabled** - Cross-origin requests from any domain
- **JSON API** - RESTful endpoints with JSON responses
- **In-Memory Storage** - No database required
- **Error Handling** - Consistent JSON error responses

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Start server (auto-restarts on file changes)
npm start
```

Server runs at **http://localhost:3000**

## API Endpoints

### Get All Items
```bash
curl http://localhost:3000/api/items
```

Response:
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Item 1", "description": "First item" },
    { "id": 2, "name": "Item 2", "description": "Second item" },
    { "id": 3, "name": "Item 3", "description": "Third item" }
  ],
  "count": 3
}
```

### Get Single Item
```bash
curl http://localhost:3000/api/items/1
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "First item"
  }
}
```

### Create Item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"A new item"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "New Item",
    "description": "A new item"
  }
}
```

### Update Item
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","description":"Updated description"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Item",
    "description": "Updated description"
  }
}
```

### Delete Item
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Updated Item",
    "description": "Updated description"
  }
}
```

## Testing CORS

The server runs on port **3000** to demonstrate cross-origin requests.

### With Authorization Header
```bash
curl http://localhost:3000/api/items \
  -H "Authorization: Bearer sample-token-123"
```

### Preflight Request (OPTIONS)
```bash
curl -X OPTIONS http://localhost:3000/api/items \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Authorization" \
  -v
```

## CORS Headers

EXPRESS SWEET configures the following CORS headers:

- **Access-Control-Allow-Origin**: Request origin
- **Access-Control-Allow-Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Access-Control-Allow-Headers**: Authorization, Content-Type, X-Requested-With, and more
- **Access-Control-Allow-Credentials**: true

## Error Responses

All errors return consistent JSON format:

**404 Not Found**
```json
{
  "success": false,
  "error": {
    "status": 404,
    "message": "Item with ID 99 not found"
  }
}
```

**400 Bad Request**
```json
{
  "success": false,
  "error": {
    "status": 400,
    "message": "Name is required"
  }
}
```

## Project Structure

```
.
├── app.js                 # Express application setup
├── bin/
│   └── www               # Server startup script
├── config/
│   └── config.js         # Configuration (CORS enabled)
├── routes/
│   └── api/
│       └── items.js      # CRUD endpoints
├── package.json
└── README.md
```

## Configuration Highlights

```javascript
// config/config.js
export default {
  cors_enabled: true,           // Enable CORS
  max_body_size: '1mb',         // Request size limit
  default_router: '/api/items', // Root redirects here
  is_ajax: _req => true,        // Treat all as API calls
  hook_handle_error: ...        // JSON error responses
}
```

For more EXPRESS SWEET features, visit the [official documentation](https://www.npmjs.com/package/express-sweet).
