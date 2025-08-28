# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Express Sweet is a powerful Express.js extension library that streamlines web development with utilities and enhancements. It's built as a TypeScript library that compiles to both ESM and CommonJS formats for broad compatibility.

## Build Commands

- **Build**: `npm run build` - Compiles TypeScript source to dist/ (ESM/CJS) and generates types/
- **Watch**: `npm run watch` - Builds in watch mode for development
- **Clean**: Automatically runs `rm -rf dist types` before build/watch via prebuild/prewatch scripts

## Architecture Overview

### Core Mount System
The library uses a centralized mounting system (`src/mount.ts`) that initializes all middleware in a specific order:
1. Global variables setup
2. Environment loading  
3. Database models initialization
4. HTTP middleware
5. View engine (Handlebars)
6. CORS
7. Local variables
8. Authentication
9. URL routing
10. Error handling

### Key Directories

- **`src/middlewares/`** - Express middleware components (Authentication, CORS, Error handling, etc.)
- **`src/database/`** - Sequelize-based ORM with DatabaseManager singleton and custom Model classes
- **`src/services/`** - Business logic services (Authentication service)
- **`src/routing/`** - Dynamic router that auto-loads route files
- **`src/handlebars_helpers/`** - Custom Handlebars template helpers (comparison, date, math, string, etc.)
- **`src/utils/`** - Utility functions and config loaders
- **`src/interfaces/`** - TypeScript interface definitions

### Configuration System
The library expects configuration files in a consuming application:
- `config/config.js` - Basic application config
- `config/database.js` - Database connection settings  
- `config/authentication.js` - User auth configuration
- `config/view.js` - Handlebars view engine settings

### Database Layer
- `DatabaseManager` singleton class manages a single Sequelize instance across all models
- Provides connection testing with `isConnected()`, configuration access with `getConfig()`, and graceful shutdown with `close()`
- Custom `Model` class extends Sequelize.Model with transaction helpers like `begin()` and shared database instance
- Automatic model loading from `models/` directory with efficient resource usage
- Built-in association support
- All models share the same database connection pool for optimal performance

### Authentication System
- Passport.js integration with username/password strategy
- Session management with Redis or memory store options
- Configurable authentication hooks and redirects
- Automatic route protection with `allow_unauthenticated` patterns

## TypeScript Configuration

Uses path mapping with `~/*` alias pointing to `src/*` for clean imports. Targets ESNEXT with strict type checking enabled.

## Build System

Rollup-based build with:
- TypeScript compilation
- Terser minification
- CommonJS and ESM dual output
- External dependencies (express, sequelize) not bundled
- Type declaration generation

## Development Notes

- The library is designed to be consumed, not developed as a standalone application
- No test scripts are configured - testing happens in consuming applications
- Uses semantic versioning with comprehensive changelog
- MIT licensed with active maintenance