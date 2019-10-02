import chai from 'chai';
import chaiHttp from 'chai-http';

import index from '../index';

const server = index.app;

chai.should();
chai.use(chaiHttp);

describe('server test', () => {
  it('should handle the unknown routes', (done) => {
    chai
      .request(server)
      .get('/unknownroute')
      .send({ data: 'nothing' })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.equal(404);
        return done();
      });
  });
});
