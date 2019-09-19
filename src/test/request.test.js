/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import Requests from '../controllers/requestController';

const { expect } = chai;
chai.use(chaiHttp);

let token;

const signinUrl = '/api/v1/auth/signin';
const getMyRequestUrl = '/api/v1/requests/my-requests';
const oneway = '/api/v1/requests/oneWay';
const returnTrip = '/api/v1/requests/returnTrip';

const oneWay = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const wrongLocation = {
  from: 'Kigali, Rwanda',
  to: 90,
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const WrongDate = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '02-12-2019', // wrong date format should be yyyy-mm-dd
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const WrongAccomodation = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'Serene'
};
const wrongTo = {
  from: 'Kigali, Rwanda',
  to: 'Rwanda',
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const Wrongfrom = {
  from: 'Rwanda',
  to: 'kigali, Rwanda',
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const WrongDescription = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  reason: 'iam travelling cause',
  accommodation: 1
};

const returnTripData = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  returnDate: '2019-11-20',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};
const wrongreturnDate = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  returnDate: '2019-11-00',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 1
};

describe('Get Requests', () => {
  before('with correct credentials', (done) => {
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
  it('when they are logged In', (done) => {
    chai
      .request(server)
      .get(getMyRequestUrl)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('shouldnt allow a patch on this route', (done) => {
    chai
      .request(server)
      .patch(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(oneWay)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(405);
        done();
      });
  });
  it('User should request for a one way trip', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(oneWay)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('User should not request one trip with wrong location', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongLocation)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('User should not request one trip with wrong Date', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(WrongDate)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip with wrong destination', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongTo)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip with wrong place of origin', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(Wrongfrom)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip with wrong Accommodation', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(WrongAccomodation)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip with short description', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(WrongDescription)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });

  it('User should request a return trip with correct fields', (done) => {
    chai
      .request(server)
      .post(returnTrip)
      .set('Authorization', `Bearer ${token}`)
      .send(returnTripData)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('User should not request a return trip withwrong returnDate', (done) => {
    chai
      .request(server)
      .post(returnTrip)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongreturnDate)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
});
