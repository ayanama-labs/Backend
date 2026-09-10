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
