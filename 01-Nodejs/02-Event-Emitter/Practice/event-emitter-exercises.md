The exercises below deliberately stay focused on **EventEmitter itself**: listeners, emitters, arguments, `this`, listener management, event lifecycle, errors, inheritance, and building your own emitter.

---

# EventEmitter Practice Roadmap

## Level 1 — Basic `emit()` + listeners

### Exercise 1 — Your first event

Create an `EventEmitter`.

Create an event called `greet`.

When `greet` is emitted, print:

```text
Hello, Boss!
```

**Practice:** `on()` + `emit()`

---

### Exercise 2 — Multiple listeners

Create an event called `start`.

Register **three different listeners**:

```text
Listener 1 started
Listener 2 started
Listener 3 started
```

Emit `start` once.

**Question:** In what order do the listeners execute?

---

### Exercise 3 — Same event, multiple listeners

Create:

```js
emitter.on("message", ...)
```

three times.

Each listener should print something different.

Then:

```js
emitter.emit("message");
```

**Goal:** Understand that one event can have many listeners.

---

# Level 2 — Passing data through events

### Exercise 4 — Pass one argument

Emit:

```js
emitter.emit("message", "Hello");
```

Your listener should receive the message and print:

```text
Received: Hello
```

---

### Exercise 5 — Pass multiple arguments

Emit:

```js
emitter.emit("user", "Ayan", 23);
```

Listener should print:

```text
User: Ayan
Age: 23
```

**Practice:** How `emit()` arguments reach the listener.

---

### Exercise 6 — Pass an object

Emit:

```js
emitter.emit("user", {
  name: "Ayan",
  age: 23,
  role: "developer",
});
```

Listener should print the user's information.

Then add a **second listener** that prints only the role.

---

# Level 3 — Understanding listener behavior

### Exercise 7 — One listener, multiple emissions

Create one listener:

```text
Message received: ...
```

Then emit `message` **five times** with different messages.

Expected:

```text
Message received: Hello
Message received: How are you?
Message received: Good morning
...
```

**Question to answer yourself:**

> Does `on()` execute the callback immediately, or does it register it for later?

---

### Exercise 8 — `on()` vs `once()`

Create:

```js
emitter.on("login", ...)
```

and:

```js
emitter.once("login", ...)
```

Emit:

```js
emitter.emit("login");
emitter.emit("login");
emitter.emit("login");
```

Observe what happens.

Then explain **why**.

---

### Exercise 9 — `once()` challenge

Create a `connection` event.

The first time it happens:

```text
Connection initialized
```

It should **never print again**, even if the event is emitted 10 times.

---

# Level 4 — Removing listeners

### Exercise 10 — Remove a listener

Create a named function:

```js
function handleMessage() {
  console.log("Message received");
}
```

Register it.

Emit `message`.

Then remove it.

Emit `message` again.

Expected:

```text
Message received
```

Only once.

**Practice:** `off()` / `removeListener()`.

---

### Exercise 11 — Remove one of several listeners

Create three listeners:

```text
A
B
C
```

Attach all three to `message`.

Remove only `B`.

Emit `message`.

Expected:

```text
A
C
```

---

### Exercise 12 — Why anonymous functions can be troublesome

Try:

```js
emitter.on("message", () => {
  console.log("Hello");
});

emitter.off("message", () => {
  console.log("Hello");
});
```

See whether the listener is actually removed.

Then figure out **why**.

This is an important EventEmitter concept.

---

# Level 5 — Inspecting listeners

Now start learning how to **inspect the emitter itself**.

### Exercise 13 — Count listeners

Create five listeners for:

```text
message
```

Use:

```js
emitter.listenerCount("message");
```

Print the result.

Expected:

```text
5
```

---

### Exercise 14 — `eventNames()`

Register listeners for:

```text
login
logout
message
error
```

Use:

```js
emitter.eventNames();
```

Print the result.

---

### Exercise 15 — `listeners()`

Register three listeners for `message`.

Use:

```js
emitter.listeners("message");
```

Investigate what it returns.

Then print the function names.

---

# Level 6 — Event arguments + listener ordering

### Exercise 16 — Listener order

Register:

```js
emitter.on("test", () => console.log("A"));
emitter.on("test", () => console.log("B"));
emitter.on("test", () => console.log("C"));
```

Emit the event.

Then use:

```js
prependListener();
```

to add `D`.

Determine the output order.

---

### Exercise 17 — `prependOnceListener()`

Create:

```text
A
B
C
```

listeners.

Add a `prependOnceListener`.

Emit the event twice.

Determine the exact output order.

---

🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑

# Level 7 — The `this` behavior

This is worth practicing because it reveals how EventEmitter invokes listeners.

### Exercise 18 — Understand `this`

Create:

```js
emitter.on("test", function () {
  console.log(this);
});
```

Emit `test`.

Investigate what `this` refers to.

Then change the listener to an arrow function:

```js
emitter.on("test", () => {
  console.log(this);
});
```

Compare the results.

**Don't just memorize the difference. Figure out why it happens.**

---

# Level 8 — The special `error` event

This is important.

### Exercise 19 — Emit an error

Create:

```js
emitter.emit("error", new Error("Something went wrong"));
```

Run it **without an error listener**.

Observe what Node does.

Then add:

```js
emitter.on("error", ...)
```

and run it again.

Explain the difference.

---

### Exercise 20 — Error handler

Create an error listener that prints:

```text
ERROR: Something went wrong
```

Then emit three different errors.

---

# Level 9 — EventEmitter as a communication mechanism

Now build tiny systems.

### Exercise 21 — Download simulator

Create these events:

```text
start
progress
complete
```

Your code should emit:

```text
start
progress
progress
progress
complete
```

Create separate listeners for each.

Expected idea:

```text
Download started
Download 25%
Download 50%
Download 75%
Download complete
```

Don't use EventEmitter to implement the actual timing logic yet. Focus on **communication through events**.

---

### Exercise 22 — Multiple subscribers

Create:

```text
orderPlaced
```

When the event occurs, three independent listeners should react:

```text
Send confirmation email
Update inventory
Create invoice
```

The important part:

**The code that emits `orderPlaced` should not directly call these functions.**

Use the event system.

This exercise teaches you **why EventEmitter exists**.

---

# Level 10 — Build your own mini EventEmitter

Now stop using Node's implementation.

### Exercise 23 — Implement `on()`

Create:

```js
class MyEventEmitter {}
```

Implement:

```js
on(eventName, listener);
```

Your goal:

```js
const emitter = new MyEventEmitter();

emitter.on("hello", () => {
  console.log("Hello");
});
```

---

### Exercise 24 — Implement `emit()`

Now implement:

```js
emit(eventName, ...args);
```

It should execute every listener associated with that event.

You should now be able to do:

```js
emitter.emit("hello");
```

---

### Exercise 25 — Arguments

Make your implementation support:

```js
emitter.emit("user", "Ayan", 23);
```

Listeners should receive:

```js
(name, age);
```

---

### Exercise 26 — Implement `once()`

Add:

```js
once(eventName, listener);
```

The listener should automatically disappear after its first execution.

---

### Exercise 27 — Implement `off()`

Add:

```js
off(eventName, listener);
```

It should remove the **specific function**.

---

### Exercise 28 — Implement `listenerCount()`

Add:

```js
listenerCount(eventName);
```

---

### Exercise 29 — Implement `eventNames()`

Return all event names currently registered.

---

# Level 11 — Debugging challenges

Now I'll give you broken code and you figure out why.

### Exercise 30

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("message", () => {
  console.log("Message received");
});

emitter.emit("Message");
```

**Why doesn't anything print?**

---

### Exercise 31

```js
function handler() {
  console.log("Hello");
}

emitter.on("test", handler);

emitter.off("test", () => {
  console.log("Hello");
});
```

Why wasn't the listener removed?

---

### Exercise 32

```js
emitter.once("login", () => {
  console.log("Logged in");
});

emitter.emit("login");
emitter.emit("login");
```

Explain exactly why the output happens only once.

---

### Exercise 33

```js
emitter.on("error", (err) => {
  console.log(err.message);
});

emitter.emit("error", new Error("Database failed"));
```

Explain the complete flow:

```text
emit()
   ↓
error event
   ↓
listener
   ↓
err argument
   ↓
err.message
```

---

# Final Challenge — Build a Mini Event System

Build a simple **User Event System**.

Your emitter should support:

```text
userCreated
userLoggedIn
userLoggedOut
userDeleted
error
```

When:

```js
userCreated;
```

is emitted, different listeners should independently:

```text
Send welcome email
Create profile
Log activity
```

When:

```js
userLoggedIn;
```

is emitted:

```text
Log login
Update last-seen time
```

When:

```js
userDeleted;
```

is emitted:

```text
Delete profile
Log deletion
```

Then add:

- `once()` for a first-time login notification
- `off()` to unsubscribe a listener
- `listenerCount()` to inspect subscriptions
- an `error` listener
- multiple arguments
- object payloads

---

# The order I'd actually do them

Don't try to do all 33 at once.

Do them in this sequence:

```text
1–6    → Understand events
   ↓
7–9    → on vs once
   ↓
10–12  → Removing listeners
   ↓
13–17  → Inspecting & ordering
   ↓
18     → this
   ↓
19–20  → error
   ↓
21–22  → Why EventEmitter is useful
   ↓
23–29  → Build EventEmitter yourself
   ↓
30–33  → Debugging
   ↓
Final  → Mini Event System
```

**Most important:** for each exercise, don't just make the output match. Before running the code, **predict what will happen**. Then run it. If your prediction is wrong, figure out _why_. That's what will turn EventEmitter from something you can use into something you actually understand.
