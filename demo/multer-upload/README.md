# EXPRESS SWEET Multer Upload Demo

A demonstration of EXPRESS SWEET's dynamic file upload configuration using Multer with route-specific middleware configuration.

## Features

- **Dynamic Upload Configuration** - Route-specific Multer middleware via `config/upload.js`
- **6 Upload Patterns** - Different combinations of file uploads and data submission
- **Sidebar Navigation** - Clean UI with pattern selection
- **Disk Storage** - Files saved to `public/uploads/` with unique filenames

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start
```

Server runs at **http://localhost:3000**

## Upload Patterns

### 1. Single File Upload (`/multipart-single-file`)
- **Content-Type:** `multipart/form-data`
- **What to test:** Upload a single file without additional data
- **Field name:** `avatar`

### 2. Single File + Form Data (`/multipart-single-file-with-form`)
- **Content-Type:** `multipart/form-data`
- **What to test:** Upload a single file with form fields (username, email)
- **Field name:** `avatar`

### 3. Multiple Files (`/multipart-multiple-files`)
- **Content-Type:** `multipart/form-data`
- **What to test:** Upload multiple files using the same field name
- **Field name:** `photos`

### 4. Multiple File Form (`/multipart-multiple-file-form`)
- **Content-Type:** `multipart/form-data`
- **What to test:** Upload multiple files with different field names
- **Field names:** `logo`, `banner`

### 5. URL-encoded Form (`/urlencoded-form`)
- **Content-Type:** `application/x-www-form-urlencoded`
- **What to test:** Submit form data without files
- **Fields:** `username`, `email`, `message`

### 6. JSON + Base64 Image (`/json-file-with-form`)
- **Content-Type:** `application/json`
- **What to test:** Upload Base64-encoded image with JSON data
- **Fields:** `username`, `email`, `avatar` (data URL), `filename`, `mimetype`

## Project Structure

```
.
├── app.js                   # Express application setup
├── bin/
│   └── www                  # Server startup script
├── config/
│   ├── config.js            # Basic configuration
│   ├── logging.js           # HTTP request logging
│   ├── upload.js            # Upload middleware configuration
│   └── view.js              # Handlebars view engine
├── routes/
│   ├── multipart-single-file.js
│   ├── multipart-single-file-with-form.js
│   ├── multipart-multiple-files.js
│   ├── multipart-multiple-file-form.js
│   ├── urlencoded-form.js
│   ├── json-file-with-form.js
│   └── api/                 # API endpoints (POST handlers)
│       ├── multipart-single-file.js
│       ├── multipart-single-file-with-form.js
│       ├── multipart-multiple-files.js
│       ├── multipart-multiple-file-form.js
│       ├── urlencoded-form.js
│       └── json-file-with-form.js
├── views/
│   ├── layout/
│   │   └── default.hbs      # Layout with sidebar navigation
│   ├── multipart-single-file.hbs
│   ├── multipart-single-file-with-form.hbs
│   ├── multipart-multiple-files.hbs
│   ├── multipart-multiple-file-form.hbs
│   ├── urlencoded-form.hbs
│   └── json-file-with-form.hbs
├── public/
│   └── uploads/             # Uploaded files directory
├── package.json
└── README.md
```

## Upload Configuration

The dynamic upload middleware is configured in [`config/upload.js`](config/upload.js). The `resolve_middleware` function returns different Multer configurations based on the request path and method.

For more EXPRESS SWEET features, visit the [official documentation](https://www.npmjs.com/package/express-sweet).
