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
