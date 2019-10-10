import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
chai.should();

describe('Locations', () => {
  it('should fetch all locations', (done) => {
    chai
      .request(server)
      .get('/api/v1/locations')
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
});
