## 8. Serving Static Files using Express

- **Static files** → Files that are served directly to the client without server-side processing.
- Examples: **HTML, CSS, JavaScript, images, fonts, PDFs**, etc.
- Express provides `express.static()` middleware to serve them.
- the path should be relative to root working directory
- Syntax:

```js
app.use(express.static("public"));
```

- Files inside `public` become accessible through their **URL path**.

### Example

```text
project/
├── server.js
└── public/
    ├── index.html
    └── style.css
```

```js
app.use(express.static("public"));
```

Then:

```text
/public/index.html → /index.html
/public/style.css  → /style.css
```

**Key idea:**

> `express.static()` exposes a directory so Express can **serve its files directly to clients**.

---

## 9. Sending JSON using Express

- JSON is commonly used to **exchange data between client and server**.
- `res.json()` sends a JavaScript value/object as a **JSON HTTP response**.
- It automatically:
  - Converts the value to JSON.
  - Sets the appropriate `Content-Type`.
  - Sends the response.

### Example

```js
app.get("/user", (req, res) => {
  res.json({
    name: "Ayan",
    age: 23,
  });
});
```

Client receives:

```json
{
  "name": "Ayan",
  "age": 23
}
```

### JSON Request Body

To parse incoming JSON:

```js
app.use(express.json());
```

Then:

```js
app.post("/user", (req, res) => {
  console.log(req.body);
});
```

**Key idea:**

> `express.json()` parses incoming JSON; `res.json()` sends JSON in the response.

---

## 11. Dynamic Routing in Express

- **Dynamic routing** → Creating routes where part of the URL can **change dynamically**.
- Use `:` before a parameter to define a **route parameter**.
- Parameter values are available through **`req.params`**.

### Example

```js
app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

Request:

```text
GET /users/123
```

Result:

```js
req.params.id; // "123"
```

### Multiple parameters

```js
app.get("/users/:userId/posts/:postId", (req, res) => {
  console.log(req.params);
});
```

```text
/users/10/posts/25
```

```js
{
  userId: "10",
  postId: "25"
}
```

**Key idea:**

> **Dynamic routes use `:parameter` placeholders to match variable parts of a URL, accessible through `req.params`.**
