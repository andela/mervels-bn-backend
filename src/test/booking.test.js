import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token, managerToken, requestId, requestId2;
const signinUrl = '/api/v1/auth/signin';
const oneway = '/api/v1/requests/one-way';
const booking = '/api/v1/booking/';
const multiCity = '/api/v1/requests/multi-city';
const cancelBooking = '/api/v1/booking/cancel/';

const book = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongBooking = {
  booking: 'booking'
};
const wrongRoomValue = {
  booking: [
    {
      room: 'redis',
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongCheckinValue = {
  booking: [
    {
      room: 1,
      checkIn: '2030',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongCheckoutValue = {
  booking: [
    {
      room: 1,
      checkIn: '2030-09-12',
      checkOut: '2030'
    }
  ]
};
const wrongAccommodationValue = {
  booking: [
    {
      accommodation: 6,
      room: 1,
      checkIn: '2030-09-12',
      checkOut: '2030-09-13'
    }
  ]
};
const alreadyBooked = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-12',
      checkOut: '2030-09-12'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};
const alreadyBooked2 = {
  booking: [
    {
      room: 1,
      checkIn: '2030-08-11',
      checkOut: '2030-08-22'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};
const book2 = {
  booking: [
    {
      room: 4,
      checkIn: '2030-08-11',
      checkOut: '2030-09-12'
    },
    {
      room: 2,
      checkIn: '2030-10-13',
      checkOut: '2030-11-12'
    }
  ]
};
const wrongRoom = {
  booking: [
    {
      room: 2,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const notRoom = {
  booking: [
    {
      room: 200,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const bookedRoom = {
  booking: [
    {
      room: 3,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const wrongCheckin = {
  booking: [
    {
      room: 1,
      checkIn: '2030-02-13',
      checkOut: '2030-09-12'
    }
  ]
};
const notAccomodation = {
  booking: [
    {
      accommodation: 'Rental',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const bookedAccomodation = {
  booking: [
    {
      accommodation: 'mariot',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};
const newAccomodation = {
  booking: [
    {
      accommodation: 'hotel',
      room: 1,
      checkIn: '2030-08-13',
      checkOut: '2030-09-12'
    }
  ]
};

describe('Room Booking', () => {
  before('Log In normal users and manager correct credentials', (done) => {
    const user = {
      userEmail: 'jonashyaka2@gmail.com',
      userPassword: 'Root1234@'
    };
    const manager = {
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
        token = res.body.data;
        chai
          .request(server)
          .post(signinUrl)
          .send(manager)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            managerToken = res.body.data;
            done();
          });
      });
  });
  before('create a travel request', (done) => {
    const request = {
      from: 'Rainbow, Rwanda',
      to: [
        {
          travelDate: '2030-08-12',
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
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(request)
      .end((error, res) => {
        if (error) done(error);
        requestId = res.body.data.id;
        done();
      });
  });
  it('should not book a request not yet approved', (done) => {
    chai
      .request(server)
      .post(`${booking}${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(book)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(400);
        done();
      });
  });
  it('should not book for a request doesnot exist', (done) => {
    chai
      .request(server)
      .post(`${booking}1000`)
      .set('Authorization', `Bearer ${token}`)
      .send(book)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('should not book for a request you donot own', (done) => {
    chai
      .request(server)
      .post(`${booking}${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send(book)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(403);
        done();
      });
  });
  describe('Booking After Approving', () => {
    before('Approve Request', (done) => {
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
    it('should not book a request accommodation doesnot exist', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(notAccomodation)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('should not book a request accommodation which is unavaliable', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(bookedAccomodation)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('should not book a request when new accommodationis not in same location', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newAccomodation)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('should not book a request when room isnot in Accommodation', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongRoom)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('should not book a request when room doesnot exist', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(notRoom)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('should not book a request when room doesnot exist', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(bookedRoom)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(409);
          done();
        });
    });
    it('should not book a request when checkin date is before travel date', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckin)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(400);
          done();
        });
    });
  });
  let bookingId;
  describe('Allow Booking', () => {
    it('should not book a room with wrong Values', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongBooking)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should not book a room with wrong room Value', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongRoomValue)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should not book a room with wrong accommodation Value', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongAccommodationValue)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should not book a room with wrong checkin Value', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckinValue)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should not book a room with wrong checkout Value', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(wrongCheckoutValue)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should book a room', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          bookingId = res.body.data.id;
          done();
        });
    });
    it('should book a room twice', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(409);
          done();
        });
    });
  });
  describe('Book Another Request', () => {
    before('create a travel request', (done) => {
      const multi = {
        from: 'Wesley, Rwanda',
        to: [
          {
            travelDate: '2030-08-10',
            location: 2,
            accommodation: 'sheraton'
          },
          {
            travelDate: '2030-10-12',
            location: 1,
            accommodation: 'hotel'
          }
        ],
        returnDate: '2040-12-02',
        reason:
          'iam travelling cause the company allows us to, i mean the company finances everything',
        passportNumber: '121HU3H3U32',
        passportName: 'Robben Bahati',
        gender: 'MALE'
      };
      chai
        .request(server)
        .post(multiCity)
        .set('Authorization', `Bearer ${token}`)
        .send(multi)
        .end((error, res) => {
          if (error) done(error);
          requestId2 = res.body.data.id;
          chai
            .request(server)
            .patch(`/api/v1/requests/approve/${requestId2}`)
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
    });
    it('should not book a request when some accomodations are not booked', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(400);
          done();
        });
    });
    it('should not book a request when room is booked in that period', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(alreadyBooked)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(409);
          done();
        });
    });
    it('should not book a request when room is booked in that period', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(alreadyBooked2)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(409);
          done();
        });
    });
    it('should book a room ', (done) => {
      chai
        .request(server)
        .post(`${booking}${requestId2}`)
        .set('Authorization', `Bearer ${token}`)
        .send(book2)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          done();
        });
    });
  });
  describe('Cancel Booking', () => {
    it('should not cancel booking', (done) => {
      chai
        .request(server)
        .post(`${cancelBooking}${requestId}`)
        .set('Authorization', `Bearer ${managerToken}`)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(403);
          done();
        });
    });
    it('should not cancel booking doesnot exist', (done) => {
      chai
        .request(server)
        .post(`${cancelBooking}200`)
        .set('Authorization', `Bearer ${token}`)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('should cancel booking ', (done) => {
      chai
        .request(server)
        .post(`${cancelBooking}${requestId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          done();
        });
    });
  });
});
