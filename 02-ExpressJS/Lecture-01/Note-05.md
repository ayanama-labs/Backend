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
