const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: "Vedaz Backend Running 🔥" });
});

// SOCKET.IO KA MAIN KAAM YAHAN HAI
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Frontend se 'slot-booked' event aayega
  socket.on('slot-booked', (data) => {
    console.log('Slot booked:', data);
    // Sab dusre tabs ko broadcast kar de
    socket.broadcast.emit('slot-booked', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});