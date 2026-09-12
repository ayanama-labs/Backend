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
