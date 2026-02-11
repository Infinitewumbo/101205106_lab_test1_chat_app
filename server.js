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