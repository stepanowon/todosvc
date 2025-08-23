# Todo List Service (todosvc)

This is a simple RESTful web service for managing todo lists, built with Node.js, Express, and LokiJS.

## Features

*   Manage todo items (Create, Read, Update, Delete)
*   Mark todo items as done/incomplete
*   View todo lists for different owners
*   In-memory database (LokiJS) for development and testing

## Prerequisites

*   Node.js (version 22.0.0 or higher)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd todosvc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run start:dev
    ```
    This will start the server using `babel-node` and `nodemon` for automatic restarts on code changes.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    This will transpile the code from `src` to `build` using Babel.

5.  **Start the production server:**
    ```bash
    npm start
    ```
    This will start the server using the transpiled code in the `build` directory.

## API Endpoints

The service provides the following RESTful endpoints:

*   `GET /` : Returns the main page.
*   `GET /todolist/:owner/create` : Creates a new owner with sample data.
*   `GET /todolist/:owner` : Retrieves the todo list for a specific owner.
*   `GET /todolist/:owner/:id` : Retrieves a specific todo item by owner and ID.
*   `POST /todolist/:owner` : Adds a new todo item for a specific owner.
*   `PUT /todolist/:owner/:id` : Updates an existing todo item by owner and ID.
*   `PUT /todolist/:owner/:id/done` : Toggles the 'done' status of a todo item.
*   `DELETE /todolist/:owner/:id` : Deletes a todo item by owner and ID.

There are also endpoints with `_long` in the path (e.g., `GET /todolist_long/:owner`) that introduce a 1-second delay before processing the request. These are likely for testing purposes.

## Data Model

Each todo item has the following properties:

*   `id`: A unique identifier (number).
*   `owner`: The owner of the todo list (string).
*   `todo`: The title of the todo item (string).
*   `desc`: A description of the todo item (string).
*   `done`: A boolean indicating whether the item is completed.

## Deployment

This service is configured for deployment on Vercel. The `vercel.json` file defines the build process and routing rules.

## Dependencies

*   **express**: Web framework
*   **body-parser**: Middleware for parsing request bodies
*   **cors**: Middleware for enabling CORS
*   **ejs**: Templating engine for the main page
*   **lokijs**: In-memory database
*   **shortid**: Library for generating short IDs (Note: Currently uses timestamp-based IDs instead)
*   **sleep-promise**: Utility for introducing delays (used in `_long` endpoints)

## Dev Dependencies

*   **@babel/cli**, **@babel/core**, **@babel/node**, **@babel/preset-env**: Babel for transpiling ES6+ code
*   **nodemon**: Utility for automatically restarting the development server
