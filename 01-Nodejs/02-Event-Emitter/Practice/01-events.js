const EventEmitter = require("events");

class myEvent extends EventEmitter {}

const myE = new myEvent();

// Exercise-01
myE.on("greet", () => {
  console.log("Hello, Boss!");
});

myE.emit("greet");

// Exercise-02
myE.on("start", () => {
  console.log("Listener 1 started");
});
myE.on("start", () => {
  console.log("Listener 2 started");
});
myE.on("start", () => {
  console.log("Listener 3 started");
});

myE.emit("start");

// Exercise-03
myE.on("message", (msg) => console.log("Received: ", msg));

myE.emit("message", "Hello");

console.log("---------------------------------------");
// Exercise-04
myE.on("user", (name, age) => {
  console.log("user: ", name);
  console.log("age: ", age);
});

myE.emit("user", "Jane", 24);

// Exercise-05
myE.on("user", (user) => {
  console.log({ name: user.name, age: user.age, role: user.role });
});

myE.emit("user", {
  name: "Ayan",
  age: 23,
  role: "developer",
});
