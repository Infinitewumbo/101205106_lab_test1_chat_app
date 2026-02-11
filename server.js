const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
const User = require('./models/User');
const GroupMessage = require('./models/GroupMessage');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(express.json());
app.use(express.static('views')); 
app.use(express.static('public')); 

// MongoDB Connection
mongoose.connect('mongodb+srv://<YOUR_CONNECTION_STRING>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

//  REST API Routes (Signup/Login) 
app.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: "Login successful", username: user.username });
    } else {
        res.status(400).json({ error: "Invalid Credentials" });
    }
});


// Socket.io  (Real-time Chat) 
io.on('connection', (socket) => {
    console.log('New user connected: ' + socket.id);

    // 1. Join Room
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined ${room}`);
        
        // Notify others in the room
        socket.broadcast.to(room).emit('message', {
            from_user: 'System',
            message: `${username} has joined the chat.`
        });
    });

    // 2. Handle Chat Messages
    socket.on('chatMessage', async ({ from_user, room, message }) => {
        const newMessage = new GroupMessage({ from_user, room, message });
        await newMessage.save();

        io.to(room).emit('message', { from_user, message });
    });

    // 3. Typing Indicator 
    socket.on('typing', ({ username, room }) => {
        socket.broadcast.to(room).emit('typing', `${username} is typing...`);
    });
    
    // 4. Leave Room / Disconnect
    socket.on('leaveRoom', ({ username, room }) => {
         socket.leave(room);
         socket.broadcast.to(room).emit('message', {
            from_user: 'System',
            message: `${username} has left the chat.`
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));