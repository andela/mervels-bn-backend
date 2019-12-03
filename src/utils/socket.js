// import emitter from './eventEmitters/emitter';

const io = require('socket.io')();

const users = {};
const socketFunction = {};
let newClient = null;
socketFunction.socketStartUp = (server) => {
  io.attach(server);
  io.on('connection', async (client) => {
    newClient = client;
    const isOnline = () => {
      io.emit('online-users', Object.values(users));
    };
    client.on('new-user', (name) => {
      users[client.id] = name;
      isOnline();
    });
    client.on('disconnect', () => {
      delete users[client.id];
      isOnline();
    });
  });
};
export default { socketFunction, io, newClient };
