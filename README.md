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

### 2. Login
- **URL:** `/api/v1/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "message": "Login successful",
    "token": "your.jwt.token",
    "user": {
      "id": "...",
      "fullname": "John Doe",
      "email": "john@example.com"
    }
  }
  ```

## Health Check
- **URL:** `/api/v1/health`
- **Method:** `GET`
- **Description:** Verifies that the API is running.
