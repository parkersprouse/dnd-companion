// eslint-disable-next-line
'use strict';

require('dotenv').config();

const socketIO = require('socket.io');
const _ = require('lodash');
const http = require('http');
const app = require('./app');
const Messages = require('./models/messages');

const PORT = process.env.PORT || 9000;
const server = http.createServer(app);
const io = socketIO(server);
io.set('heartbeat timeout', 10000);
io.set('heartbeat interval', 5000);

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
    if (msg.to !== 'system') {
      const to = msg.to !== 'group' && msg.to !== 'table' ? 'private' : msg.to;
      let receiver_ids = null;
      if (to === 'table')
        receiver_ids = _.uniqBy(msg.players.map((player) => player.id).concat([msg.game.owner_id]), (id) => id);
      else if (to === 'group')
        receiver_ids = _.difference(_.uniqBy(msg.players.map((player) => player.id), (id) => id), [msg.game.owner_id]);
      else
        if (_.find(msg.players, { username: msg.to }))
          receiver_ids = [_.find(msg.players, { username: msg.to }).id];
        else
          receiver_ids = [msg.game.owner_id];
      Messages.create({ message: msg.text, game_id: msg.game.id, sender_id: msg.user.id, type: to, receiver_ids })
        .then((data) => {
          io.to(room).emit('get message', msg);
        })
        .catch((err) => {
          console.log('Message failed to save to database');
          console.log(error);
        });
    }
    else {
      io.to(room).emit('get message', msg);
    }
  });
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
