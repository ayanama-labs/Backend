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
