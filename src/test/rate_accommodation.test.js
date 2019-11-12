import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

chai.use(chaiHttp);

const { expect } = chai;

const signInUrl = '/api/v1/auth/signin';
const rateUrl = '/api/v1/accommodations';

let user1Token, user2Token;

const user1 = {
  userEmail: 'jonashyaka2@gmail.com',
  userPassword: 'Root1234@'
};

const user2 = {
  userEmail: 'johndoe@gmail.com',
  userPassword: 'Root1123#'
};
before('LogIn user1', (done) => {
  chai
    .request(server)
    .post(signInUrl)
    .send(user1)
    .end((_err, res) => {
      if (_err) return done(_err);

      user1Token = res.body.data;

      done();
    });
});

before('LogIn user2', (done) => {
  chai
    .request(server)
    .post(signInUrl)
    .send(user2)
    .end((_err, res) => {
      if (_err) return done(_err);

      user2Token = res.body.data;

      done();
    });
});

describe('Rate accommodation', () => {
  it('User has stayed in facility', (done) => {
    const rating = {
      rating: 4
    };
    chai
      .request(server)
      .post(`${rateUrl}/2/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(201);
        expect(res.body.data.rating).eq(4);
        done();
      });
  });

  it('User has has not stayed in facility', (done) => {
    const rating = {
      rating: 4
    };
    chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user2Token}`)
      .send(rating)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(403);
        done();
      });
  });

  it('User rates a facility not available', (done) => {
    const rating = {
      rating: 4
    };
    chai
      .request(server)
      .post(`${rateUrl}/1021/ratings`)
      .set('Authorization', `Bearer ${user2Token}`)
      .send(rating)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(404);
        done();
      });
  });

  it('User enters string as  rating', (done) => {
    const rating = {
      rating: 'sadsada'
    };
    chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(422);
        done();
      });
  });

  it('User enters decimal as  rating', (done) => {
    const rating = {
      rating: 1.22
    };
    chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(422);
        done();
      });
  });
});
