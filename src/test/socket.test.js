import chai from 'chai';
import io from 'socket.io-client';

const { expect } = chai;

describe('Suite of unit tests', () => {
  let socket;

  beforeEach((done) => {
    // Setup
    socket = io.connect('http://localhost:4000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    });
    socket.on('connect', () => {
      done();
    });
    socket.on('disconnect', () => {});
  });

  afterEach((done) => {
    // Cleanup
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  describe('First (hopefully useful) test', () => {
    it('test new user', (done) => {
      socket.emit('new-user', 'davis kabiswa');
      socket.on('online-users', (user) => {
        // Check that the message matches
        expect(user).to.equal(['davis kabiswa']);
        done();
      });
      done();
    });

    it('test sending data', (done) => {
      const data = {
        userName: 'davis',
        message: 'Hi'
      };
      socket.emit('send-message', data);
      socket.on('chat-message', (message) => {
        // Check that the message matches
        expect(message).to.equal('davis: Hi');
        done();
      });
      done();
    });
  });
});
