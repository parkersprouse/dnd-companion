// eslint-disable-next-line
'use strict';

require('dotenv').config();

const socketIO = require('socket.io');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 9000;
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('User connected: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });

  socket.on('send message', message => {
    console.log('Message received: ' + JSON.parse(JSON.stringify(message)));
    io.sockets.emit('get message', message);
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
