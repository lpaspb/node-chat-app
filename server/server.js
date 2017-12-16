const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('createEmail', (newEmail) => {
      console.log('new Email', newEmail);
  });

  socket.on('createMessage', (newMessage) => {
      console.log('new Message', newMessage);
  });

  socket.emit('newEmail', {
    from: 'mike@example.com',
    text: 'Hey. What is going on?',
    createAt: 123
  });
  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey. What is going on?',
    createAt: 123
  });

  socket.on('disconnect', () => {
      console.log('User was disconnected');
  });
});


/*app.get('/', (req, res) => {


})
*/

server.listen(port, () => {
  console.log('Server is up on ' + port);
})
