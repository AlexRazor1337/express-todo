# ToDo App

A simple ToDo app built using Node.js, Express.js, Passport for authentication, and an SQLite database. Users can create and manage their tasks with ease.

## Description

This project is a ToDo app that allows users to create, manage, and organize their tasks. It is built using Node.js and Express.js for the backend, Passport for authentication, and stores data in an SQLite database. Users can log in using Google OAuth or a local username and password.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:


2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   SESSION_SECRET=testetest
   G_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   G_SECRET=YOUR_GOOGLE_SECRET
   ```

   Replace `YOUR_GOOGLE_CLIENT_ID` and `YOUR_GOOGLE_SECRET` with your Google OAuth credentials.

4. Start the application:

   ```bash
   npm start
   ```

The app should now be running locally on port 3000. You can access it in your web browser at `http://localhost:3000`.

## API Endpoints

### TODO Group

#### `GET /`

- **Auth Required**: No
- **Description**: Renders the home page. If a user is not logged in, they are directed to the home page.

#### `GET /active`

- **Auth Required**: Yes
- **Description**: Renders the home page with active tasks filter applied.

#### `GET /completed`

- **Auth Required**: Yes
- **Description**: Renders the home page with completed tasks filter applied.

#### `POST /`

- **Auth Required**: Yes
- **Description**: Creates a new task. Expects a JSON body with `title` and `completed` properties.

#### `POST /:id(\\d+)`

- **Auth Required**: Yes
- **Description**: Updates a task's title and completion status. Expects a JSON body with `title` and `completed` properties.

#### `POST /:id(\\d+)/delete`

- **Auth Required**: Yes
- **Description**: Deletes a task by ID.

#### `POST /toggle-all`

- **Auth Required**: Yes
- **Description**: Toggles the completion status of all tasks for the logged-in user.

#### `POST /clear-completed`

- **Auth Required**: Yes
- **Description**: Clears all completed tasks for the logged-in user.

### Auth Group

#### `GET /login`

- **Auth Required**: No
- **Description**: Renders the login page.

#### `GET /login/federated/google`

- **Auth Required**: No
- **Description**: Initiates Google OAuth login.

#### `GET /oauth2/redirect/google`

- **Auth Required**: No
- **Description**: Callback URL for Google OAuth login. Handles successful and failed login attempts.

#### `POST /login/password`

- **Auth Required**: No
- **Description**: Authenticates a user with a username and password. Expects a JSON body with `username` and `password` properties.

#### `POST /logout`

- **Auth Required**: Yes
- **Description**: Logs out the currently authenticated user.

#### `GET /signup`

- **Auth Required**: No
- **Description**: Renders the signup page.

#### `POST /signup`

- **Auth Required**: No
- **Description**: Creates a new user account. Expects a JSON body with `username` and `password` properties.
