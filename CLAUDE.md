# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development Commands
- `npm run start:dev` - Start development server with auto-reload using nodemon and babel-node
- `npm run build` - Build production version by transpiling src/ to build/ with Babel
- `npm start` - Run production server from build/ directory

### Node.js Version
- Requires Node.js ≥22.0.0 as specified in engines field

## Architecture Overview

This is a RESTful Todo List API service built with Node.js and Express, designed as a simple web service for managing todo items.

### Core Structure

**Three-layer architecture:**
1. **Application Layer (`src/index.js`)** - Express app configuration, middleware setup, static file serving
2. **Route Layer (`src/routes.js`)** - RESTful endpoint definitions and request handling logic
3. **Data Layer (`src/tododao.js`)** - Data access operations using in-memory LokiJS database

### Key Components

**Database Design:**
- Uses LokiJS in-memory database (no persistence between restarts)
- Single `todolist` collection with indices on `owner` and `id` fields
- Sample data auto-initialized for testing with two owners: `gdhong` and `mrlee`

**Data Model:**
```javascript
{
  id: number,      // Timestamp-based unique identifier
  owner: string,   // Owner identifier (email, username, etc.)
  todo: string,    // Todo item title
  desc: string,    // Description
  done: boolean    // Completion status
}
```

**Route Patterns:**
- Regular endpoints: `/todolist/:owner` paths
- Delayed endpoints: `/todolist_long/:owner` paths (1-second artificial delay for testing)
- All endpoints support full CRUD operations plus toggle functionality

### Frontend Integration

**Static Web Interface:**
- EJS template engine for main page (`views/index.ejs`)
- Bootstrap + Font Awesome for UI styling
- Complete API documentation embedded in the homepage
- Public assets served from `public/` directory

### Deployment Configuration

**Vercel Deployment:**
- Configured for Vercel platform via `vercel.json`
- All routes proxy to `build/index.js` after build process
- Includes Swagger UI support at `/swagger-ui.html`

### Development Features

**ES6+ Support:**
- Babel transpilation for modern JavaScript features
- Development hot-reload with nodemon
- Separate build and runtime configurations

**Testing Support:**
- Delayed endpoint variants for performance testing
- Sample data generation for new owners
- Built-in error handling and logging

## API Endpoints

Complete RESTful API with the following operations:
- `GET /todolist/:owner` - List all todos for owner
- `GET /todolist/:owner/:id` - Get specific todo
- `POST /todolist/:owner` - Create new todo
- `PUT /todolist/:owner/:id` - Update existing todo
- `PUT /todolist/:owner/:id/done` - Toggle completion status
- `DELETE /todolist/:owner/:id` - Delete todo
- `GET /todolist/:owner/create` - Generate sample data for new owner

All endpoints return JSON responses with consistent `{status, message, item}` format for operations.