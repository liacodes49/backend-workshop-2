# Backend Workshop 2

A simple Node.js + Express REST API featuring JWT-based authentication, role-based user management, and MongoDB (via Mongoose) for data storage. Passwords are hashed with bcrypt, and request bodies are validated with `express-validator`.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **Auth:** JSON Web Tokens (`jsonwebtoken`)
- **Password hashing:** bcrypt
- **Validation:** express-validator
- **Dev tooling:** nodemon

## Project Structure

```
.
├── app.js                     # App entry point, mounts routes, connects to DB
├── config/
│   └── db.js                  # Mongoose connection setup
├── controllers/
│   ├── user.js                # User CRUD, login, logout logic
│   └── role.js                # Role CRUD logic
├── middlewares/
│   └── auth.js                # JWT verification middleware (used by routes)
├── middleware/
│   └── checkAuth.js           # Alternate auth middleware (currently unused/unwired)
├── models/
│   ├── user.js                # User schema (name, email, password, role, version)
│   └── role.js                # Role schema (name, description)
├── routes/
│   ├── user.js                # /user endpoints
│   └── role.js                # /role endpoints
├── validators/
│   ├── user.js                # express-validator rules for user creation
│   └── validateInput.js       # Generic validation-result handler middleware
└── .env                       # Environment variables (not committed)
```

> **Note:** There are two auth middleware files — `middlewares/auth.js` (active, wired into `routes/user.js`) and `middleware/checkAuth.js` (not currently used by any route). You may want to consolidate these.

## Prerequisites

- Node.js (v18+ recommended)
- A running MongoDB instance (defaults to `mongodb://localhost:27017/myapp`)

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root with:
   ```
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Start MongoDB** locally (or update the connection string in `config/db.js` to point to your instance).

4. **Run the server**
   ```bash
   npm start
   ```
   This runs `nodemon app.js`. The server listens on **port 3000**.

## API Endpoints

### User Routes — `/user`

| Method | Endpoint        | Auth Required | Description                          |
|--------|-----------------|----------------|--------------------------------------|
| POST   | `/user/create`  | No             | Create a new user (validated input)  |
| POST   | `/user/login`   | No             | Log in, returns a JWT                |
| GET    | `/user/all`     | Yes            | Get all users (password excluded)    |
| GET    | `/user/:id`     | No             | Get a user by ID *(not yet implemented — placeholder response)* |
| PUT    | `/user/update/:id` | Yes         | Update a user *(placeholder response)* |
| DELETE | `/user/delete/:id` | No          | Delete a user *(placeholder response)* |
| POST   | `/user/logout`  | Yes            | Log out (invalidates token by bumping `version`) |

### Role Routes — `/role`

| Method | Endpoint     | Auth Required | Description          |
|--------|--------------|----------------|-----------------------|
| POST   | `/role/create` | No           | Create a new role     |
| GET    | `/role/all`    | No           | Get all roles         |

### Auth

Protected routes expect a header:
```
Authorization: Bearer <token>
```

Tokens are signed with `JWT_SECRET` and expire after 1 hour. Logging out increments the user's `version` field, which invalidates any previously issued tokens for that user.

## Known Gaps / TODO

- `getUserById`, `updateUser`, and `deleteUser` controllers currently return placeholder messages and don't perform real DB operations yet.
- `/user/:id`, `/user/update/:id`, and `/user/delete/:id` are not protected by auth middleware.
- The MongoDB connection string in `config/db.js` is hardcoded rather than read from `.env`.
- `middleware/checkAuth.js` appears to be leftover/duplicate code and isn't referenced anywhere.
