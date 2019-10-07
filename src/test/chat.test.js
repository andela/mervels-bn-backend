/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token;

const signinUrl = '/api/v1/auth/signin';
const postMessage = '/api/v1/chat';

const correctMsg = {
  message: 'this is home what is home'
};

const wrongMsg = {
  message: 11223334
};

describe('Chat message', () => {
  before('Log In normal users correct credentials', (done) => {
    const user = {
      userEmail: 'jonashyaka2@gmail.com',
      userPassword: 'Root1234@'
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property('userToken');

        token = res.body.data.userToken;

        done();
      });
  });
  it('should add message', (done) => {
    chai
      .request(server)
      .post(postMessage)
      .set('Authorization', `Bearer ${token}`)
      .send(correctMsg)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should not add message', (done) => {
    chai
      .request(server)
      .post(postMessage)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongMsg)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
});
