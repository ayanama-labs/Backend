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
