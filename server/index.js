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
    const cur_room = io.sockets.adapter.rooms[room];
    if (!cur_room.players)
      cur_room.players = [];
    if (cur_room.players.indexOf(data.user.username) === -1)
      cur_room.players.push(data.user.username);
    io.to(room).emit('join game', cur_room.players);
    io.to(room).emit('get message', {
      text: `${data.user.username} has joined the chat`,
      user: data.user,
      to: 'system'
    });
  });

  socket.on('leave game', data => {
    const cur_room = io.sockets.adapter.rooms[room];
    if (cur_room && cur_room.players.indexOf(data.user.username) > -1) {
      cur_room.players.splice(cur_room.players.indexOf(data.user.username), 1);
    }
    io.to(room).emit('leave game', cur_room ? cur_room.players : []);
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
