/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
const signinUrl = '/api/v1/auth/signin';
const oneway = '/api/v1/requests/one-way';

let token, managerToken;

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

      managerToken = res.body.data;

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

      token = res.body.data;

      done();
    });
});
describe('Reject request', () => {
  // reject request tests
  let requestId;
  before('create a travel request', (done) => {
    const request = {
      from: 'Reins, Rwanda',
      to: [
        {
          travelDate: '2040-10-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'iam travelling cause the company allows us to, i mean the company finances everything',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
    };
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(request)
      .end((error, res) => {
        if (error) done(error);
        requestId = res.body.data.id;
        done();
      });
  });
  it('Manager should be able to reject a request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('Manager should be not be able to reject an already rejected request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('Manager should be not be able to reject a request that is not created', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('Manager should be not be able to reject a request if reason is not valid', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.error).to.eq('Validation Error');
        done();
      });
  });
  it('Manager should be not be able to reject a request if requestId an integer', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this irequestId is required and requestId is required and must bmust be an integer greater than zero'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.error).to.eq('Validation Error');

        done();
      });
  });
  it('should be not be able to reject a request if not manager', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'Manager should be not be able to reject a request if reason is not valid' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(403);
        done();
      });
  });
});
describe('Accept request', () => {
  // accept request tests
  let requestId;
  before('create a travel request', (done) => {
    const request = {
      from: 'watoto, Rwanda',
      to: [
        {
          travelDate: '2040-08-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason: 'travelling cause the company allows us to, i mean the company finances everything',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
    };
    chai
      .request(server)
      .post('/api/v1/requests/one-way')
      .set('Authorization', `Bearer ${token}`)
      .send(request)
      .end((error, res) => {
        if (error) done(error);
        requestId = res.body.data.id;
        done();
      });
  });
  it('user should be  able to get one request', (done) => {
    chai
      .request(server)
      .get(`/api/v1/requests/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('user should not be able to get one request without or with invalid id', (done) => {
    chai
      .request(server)
      .get('/api/v1/requests/abc')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('user should not be able to get one request if not found', (done) => {
    chai
      .request(server)
      .get('/api/v1/requests/200')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('Manager should be able to accept a request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('Manager should be not be able to accept an already accepted request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('Manager should be not be able to accept a request that is not created', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('Manager should be not be able to accept a request if reason is not valid', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.error).to.eq('Validation Error');
        done();
      });
  });
  it('Manager should be not be able to accept a request if requestId an integer', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this irequestId is required and requestId is required and must bmust be an integer greater than zero'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.error).to.eq('Validation Error');
        done();
      });
  });
  it('should be not be able to accept a request if not manager', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'Manager should be not be able to accept a request if reason is not valid' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(403);
        done();
      });
  });
});
