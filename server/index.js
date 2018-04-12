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
  let room = '';

  socket.on('join game', data => {
    room = data.game + '';
    socket.join(room);
  });

  socket.on('send message', message => {
    io.to(room).emit('get message', message);
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
