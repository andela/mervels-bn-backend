import chai from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import server from '../index';

const { expect } = chai;

const requestReset = '/api/v1/auth/requestPasswordReset';
let Url;
const resetUrlWrong = '/api/v1/auth/resetPassword/1/eyJhbGciOiJIUzI1';

const regData = {
  userEmail: 'jonasssthanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root1234'
};

chai.use(chaiHttp);

const correctPassword = {
  password: '11AAwwwwww',
  newPassword: '11AAwwwwww'
};
const wrongPassword = {
  password: 'wwwwwwwwww',
  newPassword: 'wwwwwwwwww'
};
const nonMatchPassword = {
  password: '11AAwwwwww',
  newPassword: 'wwwwQQ111wwwwww'
};
const emptyPassword = {
  password: '11AAwwwwww'
};
const existUser = { email: 'jonasssthanaurugai@gmail.com' };
let resetUrl;
let token;

describe('Reset new Password', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(regData)
      .end((_err, res) => {
        done();
      });
  });

  beforeEach((done) => {
    chai
      .request(server)
      .post(requestReset)
      .send(existUser)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Url = res.body.data;
        resetUrl = Url.slice(21);
        token = resetUrl.slice(29);
        done();
      });
  });
  it('Changes new password', (done) => {
    chai
      .request(server)
      .patch(resetUrl)
      .send(correctPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.eq('Password has been sucessfully changed. Proceed to login');
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('Doesnot Change new password if password format is wrong', (done) => {
    chai
      .request(server)
      .patch(resetUrl)
      .send(wrongPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('Doesnot Change to new password if password doenot match', (done) => {
    chai
      .request(server)
      .patch(resetUrl)
      .send(nonMatchPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(400);
        done();
      });
  });
  it('Doesnot Change to new password if one password entry is empty', (done) => {
    chai
      .request(server)
      .patch(resetUrl)
      .send(emptyPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('Doesnot Change Password if userId is corrupted with an non userID', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/resetPassword/8/${token}`)
      .send(nonMatchPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(403);
        done();
      });
  });
  it('Doesnot Change Password if userId is corrupted with an non userID', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/resetPassword/8/${token}`)
      .send(nonMatchPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(403);
        done();
      });
  });
  it('Doesnot Change Password if token is corrupted', (done) => {
    chai
      .request(server)
      .patch(resetUrlWrong)
      .send(nonMatchPassword)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.status).to.eq(500);
        done();
      });
  });
});
