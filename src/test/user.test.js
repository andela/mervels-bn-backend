/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import passport from 'passport';
import '../config/passport';
import server from '../index';

const { expect } = chai;

const signupUrl = '/api/v1/auth/signup';

const signinUrl = '/api/v1/auth/signin';

const loginWithGoogle = '/api/v1/auth/google';
const loginWithFacebook = '/api/v1/auth/facebook';
const googleRedirect = '/api/v1/auth/google/redirect';
const facebookRedirect = '/api/v1/auth/facebook/redirect';
chai.use(chaiHttp);

const regData = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root1234@',
  userRoles: 'Travel Team Member'
};
const regDataWithWrongPassword = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root',
  userRoles: 'Travel Team Member'
};
const regDataWithWrongEmail = {
  userEmail: 'jonathanaurugaigmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root',
  userRoles: 'Travel Team Member'
};

describe('Users', () => {
  describe('create an account', () => {
    it('with vaild properties', (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regData)
        .end((_err, res) => {
          expect(res.body.message).to.eq('Account has been created successfully');
          expect(res.status).to.eq(201);
          done();
        });
    });
    it('with wrong password', (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWithWrongPassword)
        .end((_err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('with wrong Email', (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regDataWithWrongEmail)
        .end((_err, res) => {
          expect(res.status).to.eq(422);
          done();
        });
    });
  });

  describe('User Login', () => {
    it('with correct credentials', (done) => {
      const user = {
        userEmail: 'jonathanaurugai@gmail.com',
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

          done();
        });
    });
    it('with wrong email', (done) => {
      const user = {
        userEmail: 'whjghj@stations.com',
        userPassword: '123123'
      };
      chai
        .request(server)
        .post(signinUrl)
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(401);
          done();
        });
    });
    it('with wrong password', (done) => {
      const user = {
        userEmail: 'wi@stations.com',
        userPassword: '123123sajhgsd'
      };
      chai
        .request(server)
        .post(signinUrl)
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(401);
          done();
        });
    });

    it('with incorrect email field', (done) => {
      const user = {
        Email: 'whjghj@stations.com',
        userPassword: '123123'
      };
      chai
        .request(server)
        .post(signinUrl)
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(422);
          done();
        });
    });
    it('with incorrect password field', (done) => {
      const user = {
        userEmail: 'whjghj@stations.com',
        password: '123123'
      };
      chai
        .request(server)
        .post(signinUrl)
        .send(user)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(422);
          done();
        });
    });
  });
  describe('login through facebook', () => {
    it('redirects to facebook', (done) => {
      chai
        .request(server)
        .get(loginWithFacebook)
        .end((_err, res) => {
          res.redirects[0].should.contain(
            'api/v1/auth/facebook/redirect?__mock_strategy_callback=true'
          );
          done();
        });
    });
    it('Should add user', (done) => {
      const strategy = passport._strategies.facebook;
      strategy._token_response = {
        access_token: 'at-1234',
        expires_in: 3600
      };

      strategy._profile = {
        id: 1234,
        provider: 'facebook',
        _json: {
          first_name: 'Jonathan',
          last_name: 'Shyaka'
        },
        emails: [{ value: 'jonathanshyaka@example.com' }]
      };
      chai
        .request(server)
        .get(facebookRedirect)
        .end((_err, res) => {
          res.redirects[0].should.contain(
            'api/v1/auth/facebook/redirect?__mock_strategy_callback=true'
          );
          expect(res.status).to.eq(200);
          done();
        });
    });
  });
  describe('login through google', () => {
    it('redirects to google', (done) => {
      chai
        .request(server)
        .get(loginWithGoogle)
        .end((_err, res) => {
          res.redirects[0].should.contain(
            'api/v1/auth/google/redirect?__mock_strategy_callback=true'
          );
          done();
        });
    });
    it('Should add user', (done) => {
      const strategy = passport._strategies.google;
      strategy._token_response = {
        access_token: 'at-1234',
        expires_in: 3600
      };

      strategy._profile = {
        id: 1234,
        provider: 'google',
        _json: {
          given_name: 'Jonathan',
          family_name: 'Shyaka'
        },
        emails: [{ value: 'jonathanshyaka@example.com' }]
      };
      chai
        .request(server)
        .get(googleRedirect)
        .end((_err, res) => {
          res.redirects[0].should.contain(
            'api/v1/auth/google/redirect?__mock_strategy_callback=true'
          );
          expect(res.status).to.eq(200);
          done();
        });
    });
  });
});
