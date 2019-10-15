import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
let managerToken;
let userToken;

const signinUrl = '/api/v1/auth/signin';
const searchUrl = '/api/v1/search/requests';

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

      userToken = res.body.data.userToken;

      done();
    });
});

describe('Search Requests', () => {
  it('search with no params 2', (done) => {
    chai
      .request(server)
      .get(searchUrl)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('search by requestId', (done) => {
    const search = `${searchUrl}?id=1`;
    chai
      .request(server)
      .get(search)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('search request by status', (done) => {
    const search = `${searchUrl}?status=pending`;
    chai
      .request(server)
      .get(search)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('search request by travelDate', (done) => {
    const search = `${searchUrl}?travelDate=2019/11/02`;
    chai
      .request(server)
      .get(search)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res.status).to.eq(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('search request by return Date', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?returnDate=2019/11/20`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('search request by firstName', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?requester=Jonathan`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('search request by lastName', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?requester=Shyaka`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('search request by accommodation', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?accommodations=Hotel`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });
  it('search request by destination', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?destination=kigali`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        expect(res.body.data.length).to.greaterThan(0);
        done();
      });
  });

  it('return no results when not found', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?id=100`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(404);

        done();
      });
  });

  it('return error when invalid query param', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?ids=100`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(422);

        done();
      });
  });

  it('return result search requests by user', (done) => {
    chai
      .request(server)
      .get(`${searchUrl}?id=1`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((_err, res) => {
        if (_err) return done(_err);

        expect(res).to.have.status(200);

        done();
      });
  });
});
