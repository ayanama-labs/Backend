# The Mental Model You Should Keep

Don't memorize Express methods individually. Understand this:

```text
                    HTTP REQUEST
                         │
                         ▼
                ┌─────────────────┐
                │ Global Middleware│
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ More Middleware │
                └────────┬────────┘
                         │
                         ▼
                  ROUTE MATCHING
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
        /users/:id              /products
              │                     │
              ▼                     ▼
       Route Middleware       Route Middleware
              │                     │
              ▼                     ▼
          Handler                Handler
              │                     │
              └──────────┬──────────┘
                         ▼
                     RESPONSE
```

And the three objects you should become extremely comfortable with are:

```js
req;
res;
next;
```

### `req`

"What did the client send?"

Examples:

```js
req.params;
req.query;
req.body;
req.headers;
req.cookies;
req.method;
req.url;
```

### `res`

"What should I send back?"

Examples:

```js
res.send();
res.json();
res.status();
res.redirect();
res.sendStatus();
```

### `next`

"Continue processing this request."

```js
next();
```

---

# One Important Distinction

You'll encounter these three things constantly:

```text
req.params
req.query
req.body
```

Don't confuse them.

### URL parameter

```text
GET /users/123
```

```js
req.params.id;
// "123"
```

### Query parameter

```text
GET /users?page=2&limit=10
```

```js
req.query.page;
// "2"

req.query.limit;
// "10"
```

### Request body

```http
POST /users
Content-Type: application/json

{
    "name": "John",
    "age": 25
}
```

```js
req.body.name;
// "John"
```

So:

```text
/users/123?page=2

         │
         ├── params → 123
         │
         └── query  → page=2

POST body
         │
         └── body → {"name":"John"}
```

This distinction becomes **extremely important** when you start building real REST APIs.

---

# What You Should Understand After These 9 Topics

By the end of this section, you should be able to explain this request:

```http
PATCH /users/42?notify=true

Authorization: Bearer xyz

{
    "name": "Alice"
}
```

And identify:

```text
HTTP method
     ↓
PATCH

Route
     ↓
/users/:id

Route parameter
     ↓
id = 42

Query parameter
     ↓
notify = true

Header
     ↓
Authorization: Bearer xyz

Body
     ↓
{ name: "Alice" }
```

Then Express can process it:

```text
Request
   ↓
express.json()
   ↓
authentication middleware
   ↓
authorization middleware
   ↓
route matching
   ↓
PATCH /users/:id
   ↓
handler
   ↓
database
   ↓
res.status(200).json(...)
   ↓
Client
```

**That pipeline is the foundation of Express.** Once this clicks, things like JWT authentication, routers, controllers, validation, error handling, file uploads, REST APIs, and eventually full backend architecture become much easier to understand.
