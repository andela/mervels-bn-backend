import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

const { expect } = chai;
chai.use(chaiHttp);
chai.should();
let adminToken;
let accommodationId;
const travelAdmin = {
  userEmail: 'bahatiroben@gmail.com',
  userPassword: 'Root1123#'
};
let requesterToken;

before((done) => {
  chai
    .request(server)
    .post('/api/v1/auth/signin')
    .send({
      userEmail: 'requester@gmail.com',
      userPassword: 'Root1123#'
    })
    .end((err, res) => {
      requesterToken = res.body.data.userToken;
      done();
    });
});

describe('Travel Administrator', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(travelAdmin)
      .end((err, res) => {
        adminToken = res.body.data.userToken;
        done();
      });
  });
  it('should create an accommodation with all properties', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('image', 'src/test/testData/marvel.png', 'marvel.png')
      .field('name', 'Muhabura')
      .field('locationId', 1)
      .end((_err, res) => {
        accommodationId = res.body.data.id;
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should create a room with all properties', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ngorongoro', type: 'flat', accommodationId })
      .end((_err, res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Room created successfully');
        done();
      });
  });
  it('should not create a room if not Travel admin', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send({ name: 'Ngorongoro', type: 'flat', accommodationId })
      .end((_err, res) => {
        expect(res.status).to.eq(403);
        expect(res.body.message).to.eq('You are not allowed to perform this task');
        done();
      });
  });
  it('should not create a room without all accommodationId', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ngorongoro', type: 'flat' })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not create a room without  name', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ type: 'flat', accommodationId: 1 })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not create a room without  type', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'flat', accommodationId: 1 })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not create a room for an non existing accommodation', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Ngorongoro', type: 'flat', accommodationId: 500 })
      .end((_err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('Accommodation not found');
        done();
      });
  });
  it('should not create an accommodation without name', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        location: 'Kigali'
      })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not create an accommodation without location', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Bujumbura'
      })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not create an accommodation with a non existing location', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Bujumbura',
        locationId: 45635
      })
      .end((_err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.message).to.eq('Location not found');
        done();
      });
  });
  it('should get all accommodations', (done) => {
    chai
      .request(server)
      .get('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((_err, res) => {
        expect(res.body.message).to.eq('Accommodations fetched successfully');
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should get one accommodation by id', (done) => {
    chai
      .request(server)
      .get(`/api/v1/accommodations/${accommodationId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Accommodation fetched successfully');
        done();
      });
  });
  it('should not get accommodation id is not valid', (done) => {
    chai
      .request(server)
      .get('/api/v1/accommodations/abcd')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('validations failed');
        done();
      });
  });
  it('should not get accommodation if not creared', (done) => {
    chai
      .request(server)
      .get('/api/v1/accommodations/90')
      .set('Authorization', `Bearer ${adminToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('Accommodation not found');
        done();
      });
  });
});
