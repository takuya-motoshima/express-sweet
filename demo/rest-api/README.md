# EXPRESS SWEET REST API Demo

A minimal REST API demonstrating EXPRESS SWEET's CORS support for cross-origin requests. This demo focuses on showcasing CORS functionality with simple CRUD endpoints.

## Features

- **CORS Enabled** - Allows cross-origin requests from any domain
- **JSON API** - RESTful endpoints with JSON responses
- **In-Memory Storage** - No database required for quick testing
- **Standard HTTP Methods** - GET, POST, PUT, DELETE
- **Error Handling** - Consistent JSON error responses

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Server

```bash
npm start
```

The API will be available at **http://localhost:3002**

### 3. Test CORS

The server runs on port **3002** to demonstrate cross-origin requests. You can test CORS by:
- Opening http://localhost:3002 in your browser
- Making requests from a different origin (e.g., port 3000)
- Using curl examples below

## API Endpoints

### Get All Items

```bash
curl http://localhost:3002/api/items
```

**Response:**
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
curl http://localhost:3002/api/items/1
```

**Response:**
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
curl -X POST http://localhost:3002/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"A new item"}'
```

**Response:**
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
curl -X PUT http://localhost:3002/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","description":"Updated description"}'
```

**Response:**
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
curl -X DELETE http://localhost:3002/api/items/1
```

**Response:**
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

## Testing CORS with Authorization Header

```bash
# Send request with Authorization header
curl http://localhost:3002/api/items \
  -H "Authorization: Bearer sample-token-123"

# Preflight request (OPTIONS)
curl -X OPTIONS http://localhost:3002/api/items \
  -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Authorization" \
  -v
```

## CORS Configuration

The demo enables CORS with the following headers (configured in EXPRESS SWEET):

- `Access-Control-Allow-Origin`: Request origin
- `Access-Control-Allow-Methods`: GET, POST, PUT, DELETE, OPTIONS
- `Access-Control-Allow-Headers`:
  - Authorization (Bearer tokens, API keys)
  - Content-Type
  - X-Requested-With
  - Cache-Control
  - If-None-Match
  - If-Modified-Since
  - And more...
- `Access-Control-Allow-Credentials`: true

## Error Responses

All errors return consistent JSON format:

**404 Not Found:**
```json
{
  "success": false,
  "error": {
    "status": 404,
    "message": "Item with ID 99 not found"
  }
}
```

**400 Bad Request:**
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
│   └── config.js         # EXPRESS SWEET configuration (CORS enabled)
├── routes/
│   └── api/
│       └── items.js      # CRUD endpoints for items
├── package.json
└── README.md
```

## Development

### Watch Mode

```bash
npm run dev
```

### Configuration

Edit `config/config.js` to customize:
- CORS settings
- Request body size limits
- Error handling behavior
- Default routes

## Key Configuration Highlights

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

## Next Steps

1. **Explore Endpoints** - Try all CRUD operations with curl
2. **Test CORS** - Make cross-origin requests from browser
3. **Modify Routes** - Add custom endpoints in `routes/api/`
4. **Add Validation** - Implement request validation logic

For more EXPRESS SWEET features, visit the [official documentation](https://www.npmjs.com/package/express-sweet).
