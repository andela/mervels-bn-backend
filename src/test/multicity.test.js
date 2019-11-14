import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import Requests from '../controllers/requestController';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token;
const signinUrl = '/api/v1/auth/signin';
const multiCity = '/api/v1/requests/multi-city';

const req = {
  user: {
    id: 1
  },
  body: {
    from: 'Central, Cental',
    to: [1, 2],
    accommodations: ['hotel', 'Sheraton'],
    travelDate: [4, 'date'],
    returnDate: '2040-12-02',
    reason: 'jormi joromi i want you to joromi joromi kilode kilode wo why treat me o baby joromi',
    passportNumber: '121HU3H3U32',
    passportName: 'Robben Bahati',
    gender: 'MALE'
  }
};
const multi = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    },
    {
      travelDate: '2040-11-22',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  returnDate: '2040-12-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const wrongAccomodation = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    },
    {
      travelDate: '2040-11-22',
      location: 1,
      accommodation: 'rental'
    }
  ],
  returnDate: '2040-12-02',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE',
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything'
};

describe('Multicity Request', () => {
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
        token = res.body.data;
        done();
      });
  });
  it('User should post a request multicity', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(multi)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('User should not request multicity with accomodation not exisiting', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongAccomodation)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
});

describe('Database Validation', () => {
  it('Should allow only valid travel dates in database', (done) => {
    const res = {};
    Requests.trip(req, res, (error) => {
      expect(error.errors[0].message).to.eq('Date of format YYYY-MM-DD allowed.');
    });
    done();
  });
});
