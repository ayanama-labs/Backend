# Serialization & Deserialization

## 1. Serialization

**Serialization** = converting an **in-memory data structure/object → a format suitable for storage or transmission**.

```text
JavaScript object
       ↓
   Serialization
       ↓
JSON / bytes / etc.
```

Example:

```js
const user = {
  name: "Ayan",
  age: 23,
};

const data = JSON.stringify(user);
```

Result:

```json
{ "name": "Ayan", "age": 23 }
```

Here, the JavaScript object was **serialized into JSON text**.

---

## 2. Deserialization

**Deserialization** = converting serialized data back into an **in-memory data structure**.

```text
JSON / bytes
     ↓
Deserialization
     ↓
JavaScript object
```

Example:

```js
const data = '{"name":"Ayan","age":23}';

const user = JSON.parse(data);
```

Now:

```js
user.name;
// "Ayan"
```

---

# 3. The Core Relationship

Memorize:

```text
Serialization:
Object → transferable/storable representation

Deserialization:
transferable/stored representation → Object
```

With JSON:

```text
JavaScript object
       │
       │ JSON.stringify()
       ▼
    JSON text
       │
       │ JSON.parse()
       ▼
JavaScript object
```

---

# 4. Why do we need serialization?

An in-memory JavaScript object isn't directly suitable for many forms of:

- network transmission
- file storage
- database storage
- caching
- message queues
- inter-process communication

For example:

```js
const user = {
  name: "Ayan",
  age: 23,
};
```

You can't simply send the JavaScript object's memory structure over HTTP.

Instead:

```text
Object
  ↓
serialize
  ↓
JSON text
  ↓
network
```

The receiver then:

```text
JSON text
  ↓
deserialize
  ↓
object
```

---

# 5. Serialization is NOT always JSON

JSON is just **one serialization format**.

Other formats include:

```text
JSON
XML
CSV
MessagePack
Protocol Buffers
BSON
binary formats
```

So:

```text
Serialization ≠ JSON
```

Rather:

```text
JSON = one possible serialization format
```

---

# 6. Serialization vs Encoding

These are related but different concepts.

### Serialization

Converts **structured data → structured representation**.

```text
Object → JSON
```

### Encoding

Converts **data representation → bytes according to an encoding scheme**.

```text
Text → UTF-8 bytes
```

A typical network process can therefore look like:

```text
JavaScript object
      ↓
Serialization
      ↓
JSON text
      ↓
UTF-8 encoding
      ↓
Bytes
      ↓
Network
```

And the reverse:

```text
Bytes
  ↓
UTF-8 decoding
  ↓
JSON text
  ↓
Deserialization
  ↓
JavaScript object
```

---

# 7. Serialization in HTTP APIs

### Client → Server

```text
JavaScript object
       ↓
JSON.stringify()
       ↓
JSON
       ↓
HTTP request
       ↓
Express
       ↓
JSON.parse()
       ↓
req.body
```

### Server → Client

```text
req.body / JS object
       ↓
JSON.stringify()
       ↓
JSON
       ↓
HTTP response
       ↓
Client
       ↓
JSON.parse()
       ↓
JS object
```

Express hides much of this process.

```js
app.use(express.json());
```

handles incoming JSON parsing.

And:

```js
res.json(user);
```

handles JSON serialization for the response.

---

# 8. Serialization and Storage

Suppose you want to store an object in a text file:

```js
const user = {
  name: "Ayan",
  age: 23,
};

const data = JSON.stringify(user);
```

You can store `data`.

Later:

```js
const user = JSON.parse(data);
```

The serialized representation has been **deserialized**.

---

# 9. Important Data Loss

Serialization doesn't necessarily preserve every property of the original JavaScript value.

For example:

```js
const user = {
  name: "Ayan",
  age: undefined,
};
```

After:

```js
JSON.stringify(user);
```

the `undefined` property is omitted.

Similarly, JSON doesn't natively represent:

```text
undefined
function
Symbol
BigInt
Date
NaN
Infinity
```

So serialization can involve **conversion or loss of information**.

---

# 10. Serialization vs Deserialization

| Serialization                  | Deserialization                 |
| ------------------------------ | ------------------------------- |
| Object → representation        | Representation → object         |
| Usually before sending/storing | Usually after receiving/loading |
| `JSON.stringify()`             | `JSON.parse()`                  |
| Produces JSON text             | Consumes JSON text              |

---

# 11. Key Terminology

```text
Original data
    ↓
Serialization
    ↓
Serialized data
    ↓
Storage / transmission
    ↓
Deserialization
    ↓
Reconstructed data
```

The serialized representation is often called a:

- serialized form
- wire format
- data representation
- payload (when transmitted)

---

# 12. The Most Important Mental Model

Think of serialization as **packing data for transport/storage**:

```text
        SERIALIZATION
Object ─────────────────→ JSON
                           │
                           │ Network / Storage
                           ▼
        DESERIALIZATION
JSON ───────────────────→ Object
```

### ⭐ One-line revision

> **Serialization converts in-memory data into a storable/transmittable representation; deserialization reconstructs usable data from that representation. In JavaScript, `JSON.stringify()` and `JSON.parse()` are the common JSON serialization/deserialization pair.**
