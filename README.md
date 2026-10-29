# Prepnivo Backend API Documentation

This backend service provides RESTful API endpoints for user authentication and management.

## Authentication Endpoints

### 1. Signup
- **URL:** `/api/v1/signup`
- **Method:** `POST`
- **Description:** Creates a new user account.
- **Request Body:**
  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "...",
      "fullname": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.4.2. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
