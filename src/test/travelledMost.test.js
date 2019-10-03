import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

let userToken;

describe('Most travel destinations', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        userEmail: 'jamesdoe@gmail.com',
        userPassword: 'Root1123#'
      })
      .end((err, res) => {
        userToken = res.body.data.userToken;
        done();
      });
  });
  it('should Most travelled destination', (done) => {
    chai
      .request(server)
      .get('/api/v1/accommodations/most-travelled-destination')
      .set('Authorization', `Bearer ${userToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should Most travelled destination with no previous trips', (done) => {
    chai
      .request(server)
      .get('/api/v1/accommodations/most-travelled-destination')
      .set('Authorization', `Bearer ${userToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
});
