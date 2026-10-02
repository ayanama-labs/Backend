## 1. Introduction to Express.js

- **Express.js** → Minimal and flexible **web framework for Node.js**.
- Built on top of Node.js's **HTTP module**.
- Simplifies building **web servers and REST APIs**.
- Provides:
  - **Routing** → `app.get()`, `app.post()`, etc.
  - **Middleware** → `app.use()`
  - **Request/Response handling** → `req`, `res`
  - **Static file serving**
  - **Error handling**
- Express itself doesn't handle databases; it can work with MongoDB, PostgreSQL, MySQL, etc.

### Basic structure

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
```

### Behind the scenes

```text
Client
   ↓
Node.js HTTP Server
   ↓
Express
   ↓
Middleware
   ↓
Router
   ↓
Route Handler
   ↓
Response
```

**Key idea:**

> **Express = Node.js HTTP functionality + routing + middleware + convenient request/response APIs.**

---

### 2. Express.js — Behind the Scenes

- **Express is built on Node.js HTTP module**; it does not replace Node's HTTP server.
- `express()` creates an **Express application object**.
- `app.use()` and `app.get()` **register middleware/routes** in a stack.
- When a request arrives, Node creates **`req` (request)** and **`res` (response)** objects.
- Express passes the request through its **middleware stack sequentially**.
- `next()` tells Express to **continue to the next matching middleware/route**.
- Router checks **HTTP method + URL/path** to find the matching route.
- Route handler processes the request and uses `res` to send the response.
- Express adds convenient APIs such as `req.params`, `req.body`, `res.json()`, `res.send()`, etc.
- `app.listen()` ultimately creates/uses a **Node.js HTTP server**.

**Flow:**

```text
Client
  ↓
Node HTTP Server
  ↓
Express
  ↓
Middleware Stack
  ↓
Router
  ↓
Route Handler
  ↓
Response
  ↓
Client
```

**Core idea:** Express is essentially a **middleware + routing layer on top of Node's HTTP module**.

---

## 3. Middleware in Express

- **Middleware** → A function that runs **between receiving a request and sending the response**.
- Has access to:
  - `req` → Request object
  - `res` → Response object
  - `next` → Function to pass control to the next middleware
- Middleware can **modify `req`/`res`, perform logic, end the response, or call `next()`**.
- Multiple middleware functions execute **in sequence**.
- `next()` → Passes control to the **next matching middleware/route**.
- If middleware neither sends a response nor calls `next()`, the **request hangs**.

### Basic structure

```js
app.use((req, res, next) => {
  // middleware logic
  next();
});
```

### Flow

```text
Request
   ↓
Middleware 1
   ↓ next()
Middleware 2
   ↓ next()
Route Handler
   ↓
Response
```

**Key idea:**

> **Middleware is a chain of functions that processes a request before it reaches the final route handler.**

## 4. Handling Different HTTP Methods in Express

- HTTP methods define the **type/purpose of a request**.
- Express provides a method for handling each HTTP method:
  - `app.get()` → Retrieve data
  - `app.post()` → Create/send data
  - `app.put()` → Replace/update data
  - `app.patch()` → Partially update data
  - `app.delete()` → Delete data
- Route handler receives **`req` and `res`** objects.

### Example

```js
app.get("/users", (req, res) => {
  res.send("Get users");
});

app.post("/users", (req, res) => {
  res.send("Create user");
});

app.put("/users/:id", (req, res) => {
  res.send("Update user");
});

app.delete("/users/:id", (req, res) => {
  res.send("Delete user");
});
```

### Flow

```text
HTTP Request
     ↓
Method + URL
     ↓
Express Router
     ↓
Matching Route Handler
     ↓
Response
```

**Key idea:**

> Express uses HTTP methods to determine **which route handler should process a request**.

---

## 5. Route vs Request URL

- **Route** → The pattern defined by the server to handle a request.
- **Request URL** → The actual URL/path sent by the client.
- Express compares the **request method + URL** against registered routes.

### Example

```js
app.get("/users/:id", handler);
```

Here:

```text
Route:        /users/:id
Request URL:  /users/123
```

Express matches `/users/123` with `/users/:id` and extracts:

```js
req.params.id; // "123"
```

### Another example

```js
app.get("/products", handler);
```

```text
Route        → /products
Request URL  → /products
Method       → GET
```

**Key idea:**

> **Route = server-defined pattern; Request URL = actual path requested by the client.**

---

## 6. Global Middleware with `app.use()`

- `app.use()` is used to **register middleware** in Express.
- Middleware registered with `app.use()` is **global** → it can run for multiple/all routes.
- It executes when the request **matches its path**.
- `next()` passes control to the next middleware/route.

### Example

```js
app.use((req, res, next) => {
  console.log("Request received");
  next();
});
```

This middleware can run for:

```text
GET  /users
POST /users
GET  /products
DELETE /products/10
```

### Path-specific global middleware

```js
app.use("/api", (req, res, next) => {
  console.log("API request");
  next();
});
```

Runs for routes beginning with `/api`.

**Key idea:**

> `app.use()` registers middleware that applies **globally or to a specified path**, rather than to one specific HTTP method/route.

---

## 7. Route-Specific Middleware

- **Route-specific middleware** → Middleware that runs only for a **particular route**.
- Pass middleware directly between the **route path and route handler**.
- Useful for **authentication, authorization, validation, logging**, etc.
- Middleware must call `next()` to continue to the route handler.

### Example

```js
const auth = (req, res, next) => {
  console.log("Checking authentication");
  next();
};

app.get("/profile", auth, (req, res) => {
  res.send("Profile");
});
```

### Multiple middleware

```js
app.get("/profile", auth, validate, controller);
```

Flow:

```text
Request
   ↓
auth
   ↓ next()
validate
   ↓ next()
controller
   ↓
Response
```

**Key idea:**

> **Route-specific middleware runs only when its associated route is matched.**
