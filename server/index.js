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
    if (!io.sockets.adapter.rooms[room].players)
      io.sockets.adapter.rooms[room].players = [];
    if (io.sockets.adapter.rooms[room].players.indexOf(data.user.username) === -1)
      io.sockets.adapter.rooms[room].players.push(data.user.username);
    io.to(room).emit('join game', io.sockets.adapter.rooms[room].players);
    io.to(room).emit('get message', {
      text: `${data.user.username} has joined the chat`,
      user: data.user,
      to: 'system'
    });
  });

  socket.on('leave game', data => {
    if (io.sockets.adapter.rooms[room] &&
        io.sockets.adapter.rooms[room].players.indexOf(data.user.username) > -1) {
      io.sockets.adapter.rooms[room].players.splice(
        io.sockets.adapter.rooms[room].players.indexOf(data.user.username), 1
      );
    }
    io.to(room).emit('leave game', io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].players : []);
    io.to(room).emit('get message', {
      text: `${data.user.username} has left the chat`,
      user: data.user,
      to: 'system'
    });
  });

  socket.on('send message', message => {
    io.to(room).emit('get message', message);
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
