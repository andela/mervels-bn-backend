import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
chai.should();
let adminToken;
let supplierToken;
let accommodationId;
const travelAdmin = {
  userEmail: 'bahatiroben@gmail.com',
  userPassword: 'Root1123#'
};

const addUser = '/api/v1/auth/add-user';
let requesterToken;
let superToken;
let token;
const superUser = {
  userEmail: 'johndoe@gmail.com',
  userPassword: 'Root1123#'
};

const supplier = {
  firstName: 'Chill',
  lastName: 'Hotel',
  userEmail: 'test@gmail.com'
};

const wrongSupplier = {
  firstName: 'Chill',
  lastName: 'Hotel',
  userEmail: 1
};

const wrongAmenities = {
  name: 'Great',
  locationId: 1,
  amenities: [1, 2],
  description: 'this is the best you can ever find in your lifetime trust me',
  services: ['Breakfast', 'Free wifi']
};

const wrongServices = {
  name: 'Best',
  locationId: 1,
  amenities: ['Breakfast', 'Free wifi'],
  description: 'this is the best you can ever find in your lifetime trust me',
  services: [1, 2]
};

const wrongImage = {
  name: 'Best',
  locationId: 1,
  amenities: ['Breakfast', 'Free wifi'],
  description: 'this is the best you can ever find in your lifetime trust me',
  services: ['Breakfast', 'Free wifi'],
  image: 12345
};

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

describe('Travel Administrator', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send(superUser)
      .end((err, res) => {
        superToken = res.body.data.userToken;
        done();
      });
  });
  it('should create an accommodation with all properties', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Muhabura')
      .field('locationId', 1)
      .field('amenities', ['GYM', 'SPA'])
      .field('description', 'this is the best you can ever find in your lifetime trust me')
      .field('services', ['Breakfast', 'Free wifi'])
      .end((_err, res) => {
        accommodationId = res.body.data.id;
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should not create an accommodation with wrong description', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('image', 'src/test/testData/marvel.png', 'marvel.png')
      .field('name', 'Muhabura')
      .field('locationId', 1)
      .field('amenities', ['GYM', 'SPA'])
      .field('description', 1)
      .field('services', ['Breakfast', 'Free wifi'])
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not create an accommodation with wrong amenities', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(wrongAmenities)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not create an accommodation with wrong services', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(wrongServices)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not create an accommodation with wrong image url', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(wrongImage)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not create an accommodation if already existing in that location', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${adminToken}`)
      .attach('image', 'src/test/testData/marvel.png', 'marvel.png')
      .field('name', 'Muhabura')
      .field('locationId', 1)
      .end((_err, res) => {
        expect(res.status).to.eq(409);
        expect(res.body.message).to.eq('this accommodation already exist in this location');
        done();
      });
  });

  it('should create a room with all properties', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ngorongoro',
        type: 'flat',
        accommodationId,
        price: 200
      })
      .end((_err, res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Room created successfully');
        done();
      });
  });
  it('should create a room with wrong price format', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ngorongoro',
        type: 'flat',
        accommodationId,
        price: 'were'
      })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not create a room if the room alredy exist in that accommodation', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ngorongoro',
        type: 'flat',
        accommodationId,
        price: 200
      })
      .end((_err, res) => {
        expect(res.status).to.eq(409);
        expect(res.body.message).to.eq('this room already exist in this accommodation');
        done();
      });
  });
  it('should not create a room if not Travel admin', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${requesterToken}`)
      .send({
        name: 'Ngorongoro',
        type: 'flat',
        accommodationId,
        price: 200
      })
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Validation Error');
        done();
      });
  });
  it('should not create a room for an non existing accommodation', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Ngorongoro',
        type: 'flat',
        accommodationId: 500,
        price: 200
      })
      .end((_err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.error).to.eq('Not Found');
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Not Found');
        done();
      });
  });
  it('should like an accommodation', (done) => {
    chai
      .request(server)
      .patch('/api/v1/accommodations/1/like')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.likes).to.eq(1);
        done();
      });
  });
  it('should unlike the liked accommodation', (done) => {
    chai
      .request(server)
      .patch('/api/v1/accommodations/1/like')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.data.likes).to.eq(0);
        done();
      });
  });
  it('should like or unlike an accommodation if it exists', (done) => {
    chai
      .request(server)
      .patch('/api/v1/accommodations/124/like')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('should like or unlike an accommodation with a valid id', (done) => {
    chai
      .request(server)
      .patch('/api/v1/accommodations/a/like')
      .set('Authorization', `Bearer ${requesterToken}`)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('SUPER ADMIN should be able to add new supplier account', (done) => {
    chai
      .request(server)
      .post(addUser)
      .set('Authorization', `Bearer ${superToken}`)
      .send(supplier)
      .end((err, res) => {
        expect(res.body.status).to.eq(201);
        done(err);
      });
  });
  it('SUPER ADMIN should not be able to add new supplier with wrong values', (done) => {
    chai
      .request(server)
      .post(addUser)
      .set('Authorization', `Bearer ${superToken}`)
      .send(wrongSupplier)
      .end((err, res) => {
        expect(res.body.status).to.eq(422);
        done(err);
      });
  });
});
describe('Accommodation Supplier', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        userEmail: 'davis.kabiswa@andela.com',
        userPassword: '792dmgT2W8_0'
      })
      .end((err, res) => {
        supplierToken = res.body.data.userToken;
        done();
      });
  });
  it('should create an accommodation with all properties', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations')
      .set('Authorization', `Bearer ${supplierToken}`)
      .attach('image', 'src/test/testData/marvel.png', 'marvel.png')
      .field('name', 'PARTY')
      .field('locationId', 2)
      .field('amenities', ['GYM', 'SPA'])
      .field('description', 'this is the best you can ever find in your lifetime trust me')
      .field('services', ['Breakfast', 'Free wifi'])
      .end((_err, res) => {
        accommodationId = res.body.data.id;
        expect(res.status).to.eq(201);
        done();
      });
  });
});
describe('Accommodation feedback', () => {
  before((done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signin')
      .send({
        userEmail: 'requester@gmail.com',
        userPassword: 'Root1123#'
      })
      .end((err, res) => {
        token = res.body.data.userToken;
        done();
      });
  });
  it('should add feedback to accommodation', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/1/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send({
        feedback: 'Please clarify the travel reason'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(201);
        done();
      });
  });
  it(' with no feedback', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/1/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send({
        feedback: ''
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with in valid id', (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/sadf/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send({
        feedback: 'Please clarify the travel reason'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it("with an accomodation that doesn't exist", (done) => {
    chai
      .request(server)
      .post('/api/v1/accommodations/400/feedback')
      .set('Authorization', `Bearer ${token}`)
      .send({
        feedback: 'Please clarify the travel reason'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
});
