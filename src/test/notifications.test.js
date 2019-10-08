/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let managerToken;

const signinUrl = '/api/v1/auth/signin';
const getNotifications = '/api/v1/notifications';
const markOneAsRead = '/api/v1/notifications/mark-as-read?id=1';
const markAllAsRead = '/api/v1/notifications/mark-as-read';

before('Log In manager correct credentials', (done) => {
  const user = {
    userEmail: 'marveldev53@gmail.com',
    userPassword: 'Root1123#'
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

      managerToken = res.body.data.userToken;

      done();
    });
});

describe('Notifications', () => {
  it('should retrieve all', (done) => {
    chai
      .request(server)
      .get(getNotifications)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should mark one notification as read', (done) => {
    chai
      .request(server)
      .patch(markOneAsRead)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should not mark as read if already marked', (done) => {
    chai
      .request(server)
      .patch(markAllAsRead)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
});
