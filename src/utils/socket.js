const io = require('socket.io')();

const users = {};
const socketFunction = {};
socketFunction.socketStartUp = (server) => {
  io.attach(server);
  io.on('connection', (client) => {
    console.log('socket connected', client.id);
    const isOnline = () => {
      io.emit('online-users', Object.values(users));
    };
    client.on('new-user', (name) => {
      users[client.id] = name;
      isOnline();
    });
    client.on('send-message', (data) => {
      client.broadcast.emit('chat-message', `${data.userName}: ${data.message}`);
    });
    client.on('disconnect', () => {
      delete users[client.id];
      isOnline();
    });
  });
};
export default { socketFunction, io };
