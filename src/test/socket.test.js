import chai from 'chai';
import io from 'socket.io-client';
import SocketTester from 'socket-tester';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const socketUrl = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};
const socketTester = new SocketTester(io, socketUrl, options);

describe('Sockets', () => {
  it('should check if a function is called with a given value', (done) => {
    const client1 = {
      on: {
        'online-users': socketTester.shouldBeCalledWith(['room'])
      },
      emit: {
        'new-user': 'room'
      }
    };
    socketTester.run([client1], done);
  });
  it('should check if message is sent', (done) => {
    const client1 = {
      on: {
        'chat-message': socketTester.shouldBeCalledWith('Davis: hi')
      }
    };
    const client2 = {
      emit: {
        'send-message': {
          userName: 'Davis',
          message: 'hi'
        }
      }
    };

    socketTester.run([client1, client2], done);
  });
});
