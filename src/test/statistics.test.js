import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);

const signinUrl = '/api/v1/auth/signin';
const stats = '/api/v1/requests/trip-stats';
let token;
const timeFrame = {
  parameter: 'months',
  value: 8
};
const wrongParameter = {
  parameter: 'start',
  value: 8
};
const wrongValue = {
  parameter: 'months',
  value: 'string value'
};

describe('Trip Statistics', () => {
  before('login user with id 3', (done) => {
    const user = {
      userEmail: 'jamesdoe@gmail.com',
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
        token = res.body.data.userToken;
        done();
      });
  });
  it('User should get trip stats', (done) => {
    chai
      .request(server)
      .post(stats)
      .set('Authorization', `Bearer ${token}`)
      .send(timeFrame)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('User should not get trip stats with wrong params', (done) => {
    chai
      .request(server)
      .post(stats)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongParameter)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not get trip stats with wrong value', (done) => {
    chai
      .request(server)
      .post(stats)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongValue)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
});
