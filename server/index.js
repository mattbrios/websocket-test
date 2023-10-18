const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: process.env.APP_URL || 'http://localhost:3000'}})

const PORT = 3001
let participants = [];

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
    participants = participants.filter((user) => user.id !== socket.id);
    io.emit('update_participants', participants);
  });

  socket.on('set_username', username => {
    socket.data.username = username
    participants.push({
      id: socket.id,
      username: socket.data.username
    });
    
    io.emit('update_participants', participants);
  });

  socket.on('get_participants', () => {
    io.emit('update_participants', participants);
  });

  socket.on('get_me', () => {
    io.emit('me', {
      id: socket.id,
      username: socket.data.username
    })
  })

  socket.on('draw', () => {
    const winner = participants[Math.floor(Math.random() * participants.length)];
    io.emit('get_winner', winner);
  })
})

server.listen(PORT, () => console.log('Server running...' + process.env.APP_URL))