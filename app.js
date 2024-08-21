const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Create HTTP server

const io = socketIo(server, {
  cors: {
    origin: "https://azharul-location.vercel.app", // Frontend URL
    methods: ["GET", "POST"]
  }
});

// Middleware to handle CORS
app.use(cors({
  origin: "https://azharul-location.vercel.app" // Frontend URL
}));

// Handle socket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle location data
  socket.on("send-location", (data) => {
    io.emit("receive-data", { id: socket.id, ...data });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log("User disconnected");
    io.emit("user-disconnect", socket.id);
  });
});

// Default route (for testing)
app.get("/", (req, res) => {
  res.send('WebSocket server is running');
});

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
})
