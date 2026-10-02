const EventEmitter = require("events");

const myE = new EventEmitter();

// Exercise-07
myE.once("connection", () => {
  console.log("Connection Intialized!");
});

myE.emit("connection");
myE.emit("connection");
myE.emit("connection");

// Exercise-08
function handleMessage() {
  console.log("Message received");
}

// Register the listener
myE.on("message", handleMessage);
myE.emit("message");
myE.off("message", handleMessage);
myE.emit("message");
