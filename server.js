const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log(` Cliente conectado: ${socket.id}`);

  socket.on('frame', (data) => {
    console.log(` Frame recebido`);
  });

  socket.on('disconnect', () => {
    console.log(` Cliente desconectado`);
  });
});

server.listen(PORT, () => {
  console.log(` Servidor a rodar em http://localhost:${PORT}`);
});