// eslint-disable-next-line
'use strict';

require('dotenv').config();

const axios = require('axios');
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

  socket.on('send message', msg => {
    io.to(room).emit('get message', msg);
    // if (msg.to !== 'system') {
    //   const to = msg.to !== 'group' && msg.to !== 'table' ? 'private' : msg.to;
    //   axios.post('/api/messages', { message: msg.text,
    //                                 game_id: msg.game.id,
    //                                 sender_id: msg.user.id,
    //                                 type: to,
    //                                 receiver_ids: [] })
    //   .then((response) => {
    //     io.to(room).emit('get message', msg);
    //   })
    //   .catch((error) => {
    //     console.log('Message failed to save to database');
    //     console.log(error);
    //   });
    // }
    // else {
    //   io.to(room).emit('get message', msg);
    // }
  });

  socket.on('ping', () => {
    console.log('got ping from client');
    io.to(room).emit('pong')
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
