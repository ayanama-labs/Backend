# Express.js — Core Notes

## 0. First: What is Express?

**Express.js** is a web framework built on top of Node.js's HTTP capabilities.

Without Express:

```js
import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Users" }));
  }
});

server.listen(3000);
```

Express gives us abstractions for this:

```js
import express from "express";

const app = express();

app.get("/users", (req, res) => {
  res.json({ message: "Users" });
});

app.listen(3000);
```

### The fundamental idea

A web server receives:

```text
HTTP Request
     ↓
Express
     ↓
Middleware
     ↓
Route matching
     ↓
Route handler
     ↓
HTTP Response
```

You'll repeatedly see these three concepts:

- **Request (`req`)** → information coming from the client
- **Response (`res`)** → what the server sends back
- **Middleware** → functions that process a request before/around the final handler

---

# 1. Introduction to Express

## Installing Express

```bash
npm install express
```

Basic application:

```js
import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

If you're using CommonJS:

```js
const express = require("express");

const app = express();
```

---

## Creating routes

```js
app.get("/", (req, res) => {
  res.send("Hello World");
});
```

This means:

```text
HTTP METHOD = GET
PATH        = /
HANDLER     = (req, res) => ...
```

Another:

```js
app.get("/users", (req, res) => {
  res.send("Users");
});
```

---

## Common HTTP methods

Express provides methods corresponding to HTTP methods:

```js
app.get(...)
app.post(...)
app.put(...)
app.patch(...)
app.delete(...)
app.options(...)
app.head(...)
```

For example:

```js
app.post("/users", (req, res) => {
  res.send("Create user");
});

app.put("/users/:id", (req, res) => {
  res.send("Replace user");
});

app.patch("/users/:id", (req, res) => {
  res.send("Update part of user");
});

app.delete("/users/:id", (req, res) => {
  res.send("Delete user");
});
```

---

# 2. How Express Works

This is the **most important conceptual topic**.

Suppose you write:

```js
const app = express();

app.use(middleware1);
app.use(middleware2);

app.get("/users", handler1);
app.get("/products", handler2);
```

Think of Express as a **pipeline**.

```text
Incoming Request
       ↓
 middleware1
       ↓
 middleware2
       ↓
 route matching
       ↓
 handler1 / handler2
       ↓
 Response
```

Express processes middleware and routes in the order they are registered.

---

## Middleware

A middleware function generally looks like:

```js
(req, res, next) => {
  // do something

  next();
};
```

Example:

```js
app.use((req, res, next) => {
  console.log("Request received");

  next();
});
```

`next()` means:

> "I'm finished processing this request; continue to the next middleware."

---

## What happens without `next()`?

```js
app.use((req, res, next) => {
  console.log("Hello");
});
```

The request gets stuck here.

```text
Request
   ↓
middleware
   ↓
STOP
```

Because neither:

```js
next();
```

nor:

```js
res.send(...);
```

was called.

---

## Middleware can terminate the request

```js
app.use((req, res, next) => {
  res.send("Request terminated");
});
```

Now:

```text
Request
   ↓
Middleware
   ↓
Response
```

There is no reason to call `next()`.

---

## Middleware can modify request

```js
app.use((req, res, next) => {
  req.username = "Ayan";

  next();
});
```

Later:

```js
app.get("/", (req, res) => {
  res.send(`Hello ${req.username}`);
});
```

The middleware added information to the request object.

---

## Middleware can perform authentication

```js
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}
```

Then:

```js
app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Profile",
  });
});
```

Flow:

```text
GET /profile
     ↓
authenticate
     ↓
Token exists?
   ↙       ↘
 NO         YES
 ↓           ↓
401        next()
             ↓
         /profile
             ↓
          response
```

---

# 3. What Are Middlewares?

Middleware is simply a function that participates in processing an HTTP request.

General structure:

```js
function middleware(req, res, next) {
  // processing

  next();
}
```

Express middleware can:

1. Execute code
2. Modify `req`
3. Modify `res`
4. End the request
5. Call the next middleware

---

## Application-level middleware

Registered with:

```js
app.use(...)
```

Example:

```js
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
```

It applies broadly to requests.

---

## Built-in middleware

Express provides middleware itself.

### `express.json()`

Very important.

```js
app.use(express.json());
```

It parses JSON request bodies.

Client sends:

```json
{
  "name": "John",
  "age": 25
}
```

Without JSON parsing middleware, you can't simply expect:

```js
req.body;
```

to contain the parsed object.

With:

```js
app.use(express.json());
```

you can:

```js
app.post("/users", (req, res) => {
  console.log(req.body);

  res.json(req.body);
});
```

---

### `express.urlencoded()`

Used for URL-encoded form data.

```js
app.use(express.urlencoded({ extended: true }));
```

For example:

```text
name=John&age=25
```

---

### `express.static()`

Used to serve static files.

```js
app.use(express.static("public"));
```

If:

```text
public/
 ├── index.html
 ├── style.css
 └── image.png
```

Then Express can serve them.

---

# 4. Handling Different HTTP Methods

HTTP methods communicate the **intent of the request**.

### GET

Retrieve data.

```js
app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "John" }]);
});
```

---

### POST

Create a resource.

```js
app.post("/users", (req, res) => {
  const user = req.body;

  res.status(201).json(user);
});
```

Typical:

```text
POST /users

{
    "name": "John"
}
```

---

### PUT

Replace an existing resource.

```js
app.put("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: `Replace user ${id}`,
  });
});
```

---

### PATCH

Partially modify a resource.

```js
app.patch("/users/:id", (req, res) => {
  res.json({
    message: "User partially updated",
  });
});
```

For example:

Existing:

```json
{
  "name": "John",
  "age": 25,
  "email": "john@example.com"
}
```

PATCH:

```json
{
  "age": 26
}
```

Only age changes.

---

### DELETE

Delete a resource.

```js
app.delete("/users/:id", (req, res) => {
  res.sendStatus(204);
});
```

---

## CRUD mapping

A useful mental model:

| Operation        | HTTP method |
| ---------------- | ----------- |
| Create           | POST        |
| Read             | GET         |
| Replace          | PUT         |
| Partially update | PATCH       |
| Delete           | DELETE      |

---

# 5. Difference Between Route and URI

This distinction is subtle but important.

## URI

URI means **Uniform Resource Identifier**.

Example:

```text
/users/123
```

This identifies a resource.

---

## URL

URL means **Uniform Resource Locator**.

Example:

```text
https://example.com/users/123
```

A URL tells you where/how to access something.

---

## Route

A route is the **server-side rule** that determines what should happen for a particular request.

Example:

```js
app.get("/users/:id", (req, res) => {
  // ...
});
```

Here:

```text
/users/:id
```

is the route pattern.

A request:

```text
GET /users/123
```

matches it.

---

## Route parameters

```js
app.get("/users/:id", (req, res) => {
  console.log(req.params.id);
});
```

Request:

```text
GET /users/123
```

Result:

```js
req.params.id;
// "123"
```

Another:

```js
app.get("/users/:userId/posts/:postId", (req, res) => {
  console.log(req.params);
});
```

Request:

```text
/users/42/posts/100
```

Produces:

```js
{
  userId: "42",
  postId: "100"
}
```

---

# 6. Adding Global Middlewares Using `app.use()`

This is one of the most important Express APIs.

```js
app.use(middleware);
```

It registers middleware at the application level.

Example:

```js
app.use((req, res, next) => {
  console.log("Incoming request");
  next();
});
```

---

## Why "global"?

Suppose:

```js
app.use((req, res, next) => {
  console.log("Middleware");
  next();
});

app.get("/", handler);
app.get("/users", handler);
app.get("/products", handler);
```

The middleware can run for:

```text
GET /
GET /users
GET /products
```

---

## Middleware order matters

This:

```js
app.use(middleware1);
app.use(middleware2);

app.get("/", handler);
```

means:

```text
Request
 ↓
middleware1
 ↓
middleware2
 ↓
handler
```

But:

```js
app.get("/", handler);

app.use(middleware1);
```

The middleware won't get a chance to process that request because the route handler already ended it.

### Therefore:

> **Express executes middleware/routes in registration order.**

This principle explains many Express bugs.

---

# 7. Route-Specific Middleware

Global middleware isn't always desirable.

Suppose you only want authentication on:

```text
/profile
/admin
/settings
```

but not:

```text
/login
/register
```

You can attach middleware directly to a route.

```js
function authenticate(req, res, next) {
  console.log("Checking authentication");

  next();
}

app.get("/profile", authenticate, (req, res) => {
  res.send("Profile");
});
```

Flow:

```text
GET /profile
      ↓
authenticate
      ↓
profile handler
```

But:

```text
GET /login
      ↓
login handler
```

doesn't execute `authenticate`.

---

## Multiple route middleware

You can have:

```js
app.get("/admin", authenticate, authorize, audit, (req, res) => {
  res.send("Admin panel");
});
```

Flow:

```text
Request
  ↓
authenticate
  ↓
authorize
  ↓
audit
  ↓
handler
```

This is extremely common in production APIs.

---

# 8. Serving Static Files

Static files are files that don't require server-side computation.

Examples:

```text
HTML
CSS
JavaScript
Images
Fonts
Videos
```

Suppose:

```text
project/
│
├── server.js
│
└── public/
    ├── index.html
    ├── style.css
    └── logo.png
```

Use:

```js
app.use(express.static("public"));
```

Now:

```text
http://localhost:3000/index.html
```

can serve:

```text
public/index.html
```

And:

```text
http://localhost:3000/logo.png
```

serves:

```text
public/logo.png
```

---

## Mounting static directory under a path

You can define a URL prefix:

```js
app.use("/static", express.static("public"));
```

Now:

```text
/static/logo.png
```

maps to:

```text
public/logo.png
```

This is useful because your filesystem structure doesn't necessarily have to match your public URL structure.

---

# 9. Sending JSON and Status Codes

This topic connects your API to HTTP itself.

## `res.send()`

```js
res.send("Hello");
```

Can send:

- string
- Buffer
- object
- array
- etc.

---

## `res.json()`

Designed specifically for JSON responses.

```js
res.json({
  name: "John",
  age: 25,
});
```

Express handles serialization and appropriate content type.

---

## `res.status()`

Sets HTTP status code.

```js
res.status(201);
```

But this alone doesn't finish the response.

Usually:

```js
res.status(201).json({
  message: "User created",
});
```

---

## Common status codes

### 2xx — Success

#### `200 OK`

Normal successful request.

```js
res.status(200).json({
  message: "Success",
});
```

Usually `200` is the default for successful responses.

---

#### `201 Created`

A new resource was created.

```js
res.status(201).json({
  message: "User created",
});
```

Typical POST response.

---

#### `204 No Content`

Successful request but no response body.

```js
res.sendStatus(204);
```

Common for DELETE.

---

# 4xx — Client errors

### `400 Bad Request`

The request itself is invalid.

```js
res.status(400).json({
  message: "Invalid data",
});
```

---

### `401 Unauthorized`

The client isn't authenticated.

```js
res.status(401).json({
  message: "Authentication required",
});
```

Think:

> **Who are you?**

---

### `403 Forbidden`

The client is authenticated but isn't allowed to perform the action.

```js
res.status(403).json({
  message: "Access denied",
});
```

Think:

> **I know who you are, but you're not allowed to do this.**

---

### `404 Not Found`

Requested resource doesn't exist.

```js
res.status(404).json({
  message: "User not found",
});
```

---

### `409 Conflict`

Request conflicts with current server state.

Common example:

```text
Email already exists
```

```js
res.status(409).json({
  message: "Email already registered",
});
```

---

# 5xx — Server errors

### `500 Internal Server Error`

Something went wrong on the server.

```js
res.status(500).json({
  message: "Internal server error",
});
```

The important distinction:

```text
4xx → problem with request/client side
5xx → problem processing request on server
```

---

# Putting Everything Together

Here's a small Express application using nearly everything from these nine topics:

```js
import express from "express";

const app = express();

// -------------------------
// Global middleware
// -------------------------

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// -------------------------
// Authentication middleware
// -------------------------

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  next();
}

// -------------------------
// Public route
// -------------------------

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

// -------------------------
// GET
// -------------------------

app.get("/users", (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "John",
    },
  ]);
});

// -------------------------
// POST
// -------------------------

app.post("/users", (req, res) => {
  const user = req.body;

  res.status(201).json({
    message: "User created",
    user,
  });
});

// -------------------------
// Protected route
// -------------------------

app.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "Private profile",
  });
});

// -------------------------
// Route parameter
// -------------------------

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    userId: id,
  });
});

// -------------------------
// PATCH
// -------------------------

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  res.json({
    id,
    updates,
  });
});

// -------------------------
// DELETE
// -------------------------

app.delete("/users/:id", (req, res) => {
  res.sendStatus(204);
});

// -------------------------
// Static files
// -------------------------

app.use("/static", express.static("public"));

// -------------------------
// Start server
// -------------------------

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# The Mental Model You Should Keep

Don't memorize Express methods individually. Understand this:

```text
                    HTTP REQUEST
                         │
                         ▼
                ┌─────────────────┐
                │ Global Middleware│
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ More Middleware │
                └────────┬────────┘
                         │
                         ▼
                  ROUTE MATCHING
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        /users/:id              /products
              │                     │
              ▼                     ▼
       Route Middleware       Route Middleware
              │                     │
              ▼                     ▼
          Handler                Handler
              │                     │
              └──────────┬──────────┘
                         ▼
                     RESPONSE
```

And the three objects you should become extremely comfortable with are:

```js
req;
res;
next;
```

### `req`

"What did the client send?"

Examples:

```js
req.params;
req.query;
req.body;
req.headers;
req.cookies;
req.method;
req.url;
```

### `res`

"What should I send back?"

Examples:

```js
res.send();
res.json();
res.status();
res.redirect();
res.sendStatus();
```

### `next`

"Continue processing this request."

```js
next();
```

---

# One Important Distinction

You'll encounter these three things constantly:

```text
req.params
req.query
req.body
```

Don't confuse them.

### URL parameter

```text
GET /users/123
```

```js
req.params.id;
// "123"
```

### Query parameter

```text
GET /users?page=2&limit=10
```

```js
req.query.page;
// "2"

req.query.limit;
// "10"
```

### Request body

```http
POST /users
Content-Type: application/json

{
    "name": "John",
    "age": 25
}
```

```js
req.body.name;
// "John"
```

So:

```text
/users/123?page=2

         │
         ├── params → 123
         │
         └── query  → page=2

POST body
         │
         └── body → {"name":"John"}
```

This distinction becomes **extremely important** when you start building real REST APIs.

---

# What You Should Understand After These 9 Topics

By the end of this section, you should be able to explain this request:

```http
PATCH /users/42?notify=true

Authorization: Bearer xyz

{
    "name": "Alice"
}
```

And identify:

```text
HTTP method
     ↓
PATCH

Route
     ↓
/users/:id

Route parameter
     ↓
id = 42

Query parameter
     ↓
notify = true

Header
     ↓
Authorization: Bearer xyz

Body
     ↓
{ name: "Alice" }
```

Then Express can process it:

```text
Request
   ↓
express.json()
   ↓
authentication middleware
   ↓
authorization middleware
   ↓
route matching
   ↓
PATCH /users/:id
   ↓
handler
   ↓
database
   ↓
res.status(200).json(...)
   ↓
Client
```

**That pipeline is the foundation of Express.** Once this clicks, things like JWT authentication, routers, controllers, validation, error handling, file uploads, REST APIs, and eventually full backend architecture become much easier to understand.
