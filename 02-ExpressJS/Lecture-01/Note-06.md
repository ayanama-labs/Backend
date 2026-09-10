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
