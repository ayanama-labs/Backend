# JSON — Short Master Notes

## 1. What is JSON?

**JSON (JavaScript Object Notation)** is a **text-based format for representing and exchanging structured data**.

> JSON text ≠ JavaScript object.

```text
JSON text ──parse──> JS value
JS value ──stringify──> JSON text
```

---

## 2. JSON Data Types

JSON has **6 types**:

```text
1. String
2. Number
3. Object
4. Array
5. Boolean
6. null
```

No:

```text
undefined, function, Date, BigInt, Symbol, NaN, Infinity
```

---

## 3. Object

Objects contain **key-value pairs**.

```json
{
  "name": "Ayan",
  "age": 23
}
```

Rules:

- Keys **must be double-quoted strings**.
- `:` separates key and value.
- `,` separates members.
- No trailing comma.
- Objects can be nested.

---

## 4. Array

Arrays contain ordered values.

```json
["JavaScript", "Node.js", "MongoDB"]
```

Rules:

- Values separated by commas.
- Can contain different JSON types.
- Can contain objects/arrays.
- Empty array: `[]`.

---

## 5. Strings

JSON strings **must use double quotes**.

```json
"name": "Ayan"
```

Single quotes are invalid.

Common escape sequences:

```text
\"  quote
\\  backslash
\n  newline
\t  tab
\uXXXX  Unicode
```

---

## 6. Numbers

JSON has **one number type**.

Valid:

```text
10
-10
3.14
1e6
```

JSON doesn't distinguish:

```text
integer / float / double / long
```

Also:

```text
NaN       ❌
Infinity  ❌
-Infinity ❌
```

### JavaScript warning

Very large integers can lose precision because JavaScript `Number` has a safe integer limit:

```js
Number.MAX_SAFE_INTEGER;
// 9007199254740991
```

For larger IDs, APIs often use strings.

---

## 7. Boolean

Only:

```text
true
false
```

They are lowercase.

---

## 8. `null`

Represents an explicitly absent/empty value.

```json
{
  "phone": null
}
```

JSON has **no `undefined`**.

---

# 9. Important JSON Syntax Rules

Remember:

```text
Keys           → double quotes
Strings        → double quotes
Boolean        → true / false
Empty value    → null
Trailing comma → ❌
Comments       → ❌
Single quotes  → ❌
```

Whitespace/newlines are generally insignificant.

---

# 10. Nested Data

Objects and arrays can be combined arbitrarily:

```json
{
  "user": {
    "name": "Ayan",
    "skills": ["JS", "Node"]
  }
}
```

Think of JSON as a **tree of values**.

---

# 11. `JSON.parse()`

Converts **JSON text → JavaScript value**.

```js
const user = JSON.parse('{"name":"Ayan"}');
```

```text
JSON string → JavaScript object
```

Invalid JSON causes a `SyntaxError`.

---

# 12. `JSON.stringify()`

Converts **JavaScript value → JSON text**.

```js
const json = JSON.stringify(user);
```

```text
JavaScript object → JSON string
```

Important serialization behavior:

```text
undefined/function → usually omitted from objects
undefined in arrays → null
NaN/Infinity      → null
```

Circular references cause `JSON.stringify()` to fail.

---

# 13. JSON + HTTP

JSON is commonly used as the body of API requests/responses.

Header:

```http
Content-Type: application/json
```

Typical flow:

```text
Client
  ↓
JSON text
  ↓
HTTP
  ↓
Express
  ↓
JSON.parse()
  ↓
req.body
```

---

# 14. JSON + Express

To parse incoming JSON:

```js
app.use(express.json());
```

Then:

```js
app.post("/users", (req, res) => {
  console.log(req.body);
});
```

To send JSON:

```js
res.json({ name: "Ayan" });
```

Express handles serialization and the appropriate content type.

---

# 15. Parsing ≠ Validation

These are different:

```text
Parsing
↓
Is this valid JSON?

Validation
↓
Does the data satisfy my application's rules?
```

For example, this can be valid JSON:

```json
{
  "age": "hello"
}
```

but your application can reject it because `age` should be a number.

---

# 16. JSON vs JavaScript Object

| JSON               | JavaScript              |
| ------------------ | ----------------------- |
| Text               | Runtime value           |
| Double-quoted keys | Keys can be unquoted    |
| No functions       | Functions allowed       |
| No `undefined`     | `undefined` allowed     |
| No Date            | Date available          |
| No BigInt          | BigInt available        |
| No comments        | Comments allowed        |
| No trailing commas | Trailing commas allowed |

---

# 17. JSON vs BSON

**JSON** → text-based interchange format.

**BSON** → binary document format used internally by MongoDB.

BSON supports additional types such as:

```text
ObjectId
Date
Binary
Decimal128
Int32 / Int64
```

So:

```text
JSON ≠ BSON
```

---

# 18. JSON Schema

JSON itself doesn't define your application's structure.

**JSON Schema** can define rules such as:

```text
name → required string
age  → required integer
```

Therefore:

```text
JSON        → represents data
JSON Schema → describes/validates data
```

---

# 19. Important Limitations

JSON cannot directly represent:

```text
functions
undefined
Date
BigInt
binary data
object references
comments
```

Dates are usually represented as strings:

```json
{
  "createdAt": "2026-10-03T02:30:00Z"
}
```

The receiving application decides to interpret that string as a date.

---

# 20. JSON Mental Model

Keep this one diagram in your notes:

```text
             JSON
              │
      ┌───────┴────────┐
      │                │
  Primitive        Structured
      │                │
 ┌────┼────┐       ┌───┴───┐
 │    │    │       │       │
string number bool object  array
                  │
                 null
```

And for Node/Express:

```text
Client
  │
  │ JSON
  ▼
HTTP request
  │
  ▼
express.json()
  │
  ▼
req.body
  │
  ▼
JavaScript value
  │
  ▼
res.json()
  │
  ▼
JSON
  │
  ▼
Client
```

### ⭐ Final revision

> **JSON is a text-based data format with 6 types: string, number, object, array, boolean, and null. `JSON.parse()` converts JSON text to a JavaScript value; `JSON.stringify()` does the reverse. JSON is commonly used in HTTP APIs, while Express uses `express.json()` to parse request bodies and `res.json()` to send JSON responses.**
