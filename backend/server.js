// Import the Express.js framework and assign it to the 'express' variable
const express = require("express");

// Create a new Express.js application instance and assign it to the 'app' variable
const app = express();

// Import the HTTP module and create a new HTTP server instance, passing the 'app' instance as a request handler
const server = require("http").createServer(app);

// Import the Socket.IO library and create a new Socket.IO instance, passing the 'server' instance and configuration options
const io = require("socket.io")(server, {
  // Configure Socket.IO to allow cross-origin requests from any origin
  cors: {
    origin: "*",
  }
});

// Set up an event listener for the 'connection' event, which is emitted when a new client connects to the server
io.on("connection", (socket) => {
  // Log a message to the console when a new client connects
  console.log("a user connected");

  // Set up an event listener for the 'chat' event, which is emitted when a client sends a chat message
  socket.on("chat", (payload) => {
    // Log the received chat message payload to the console
    console.log("what's payload: ", payload);

    // Broadcast the received chat message to all connected clients
    io.emit("chat", payload);
  });
});