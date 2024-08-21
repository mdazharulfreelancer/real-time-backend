const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const cors = require('cors')

const app = express();
const server = http.createServer(app); // Attach express app to the HTTP server

const io = socketIo(server, {
    cors: {
      origin: "https://azharul-location.vercel.app", // Your frontend URL
      methods: ["GET", "POST"]
    }
  });
 // Attach Socket.IO to the HTTP server

app.use(cors(
     {
         origin: "https://azharul-location.vercel.app"
     }
));
  

io.on('connection', (socket) => {
 console.log('a user connected');
app.get("/", (req,res) =>{
    res.send('a user connected')
})
    socket.on("send-location" , function(data){
        io.emit("recive-data", {id:socket.id, ...data})
    })
    socket.on('disconnect', () => {
        console.log("user-disconnetced")
       io.emit("user-disconnect", socket.id)
    });
});
// Start the server using server.listen, not app.listen
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
