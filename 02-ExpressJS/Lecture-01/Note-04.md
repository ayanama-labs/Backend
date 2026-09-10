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
