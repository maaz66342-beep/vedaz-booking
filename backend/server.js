const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// VEDAZ Voice Assistant Routes - For Internship
app.get('/welcome', (req, res) => {
    res.json({ reply: "Welcome sir! VEDAZ v2.0 Node.js backend online." });
});

app.get('/ask', (req, res) => {
    const query = req.query.query.toLowerCase();
    console.log('Voice Command:', query);
    
    if(query.includes('chrome')) {
        exec('start chrome');
        return res.json({ reply: "Chrome khol diya sir", action: "" });
    }
    if(query.includes('notepad')) {
        exec('start notepad');
        return res.json({ reply: "Notepad khol diya sir", action: "" });
    }
    if(query.includes('band') || query.includes('stop')) {
        io.emit('vedaz-stop'); // Real-time stop signal to frontend
        return res.json({ reply: "VEDAZ offline ja raha hai", action: "stop" });
    }
    res.json({ reply: `Command received: ${query} - Processing`, action: "" });
});

// Socket.io for Real-time Updates - Internship brownie points
io.on('connection', (socket) => {
    console.log('VEDAZ Client connected:', socket.id);
    
    // Real-time voice command broadcast
    socket.on('voice-command', (data) => {
        console.log('Voice command via socket:', data);
        socket.broadcast.emit('command-executed', data);
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(5000, () => console.log('VEDAZ Node.js + Socket.io running on http://localhost:5000'));
