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
