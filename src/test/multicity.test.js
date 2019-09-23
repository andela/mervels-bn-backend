import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import Requests from '../controllers/requestController';

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
    reason: 'jormi joromi i want you to joromi joromi kilode kilode wo why treat me o baby joromi'
  }
};
const multi = {
  from: 'Kigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  returnDate: '2040-12-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'Sheraton']
};
const nonMatch = {
  from: 'Kigali, Rwanda',
  to: [1, 2, 3],
  travelDate: ['2040-11-02', '2040-11-12'],
  returnDate: '2040-12-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'Sheraton']
};
const multiDate = {
  from: 'Kiigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11', '2040-11-12'],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'Sheraton']
};
const wrongAcc = {
  from: 'Kiigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'excess']
};
const wrongAccommodation = {
  from: 'Kiigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 2
};
const wrongReason = {
  from: 'Kiigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  reason: 'y not',
  accommodation: 'sheraton'
};
const wrongTo = {
  from: 'Kiigali, Rwanda',
  to: 'to',
  travelDate: ['2040-11-02', '2040-11-12'],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'hotel'
};
const wrongfrom = {
  from: 1,
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'Sheraton']
};
const wrongReturn = {
  from: 'Kigali, Rwanda',
  to: [1, 2],
  travelDate: ['2040-11-02', '2040-11-12'],
  returnDate: '2010-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: ['hotel', 'Sheraton']
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
        token = res.body.data.userToken;
        done();
      });
  });
  it('User should request for a multiCity trip', (done) => {
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
  it('User shouldnot request for a duplicate multiCity trip', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(multi)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(400);
        done();
      });
  });
  it('User shouldnot request for a non matching fields', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(nonMatch)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(400);
        done();
      });
  });
  it('User should not request multicity with wrong Date', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(multiDate)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with wrong Accommodation', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongAccommodation)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with wrong Reason', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongReason)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with wrong location', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongTo)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with wrong return Date', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongReturn)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with wrong from', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongfrom)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request multicity with accomodation not exisiting', (done) => {
    chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongAcc)
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
