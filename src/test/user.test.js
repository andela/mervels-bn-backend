import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;

const signupUrl = '/api/v1/auth/signup';

chai.use(chaiHttp);

const regData = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root1234'
};

describe('Users', () => {
  describe('create an account', () => {
    it('with vaild properties', (done) => {
      chai
        .request(server)
        .post(signupUrl)
        .send(regData)
        .end((_err, res) => {
          expect(res.body.message).to.eq('Account has been created successfully');
          expect(res.status).to.eq(201);
          done();
        });
    });
  });
});
