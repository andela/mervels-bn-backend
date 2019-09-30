/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token, managerToken;

const signinUrl = '/api/v1/auth/signin';
const getMyRequestUrl = '/api/v1/requests/my-requests';
const oneway = '/api/v1/requests/one-way';
const returnTrip = '/api/v1/requests/return-trip';
const getRequestCommentsUrl = '/api/v1/requests/1/comments';
const addRequestCommentUrl = '/api/v1/requests/1/comment';
const invalidRequestIdUrl = '/api/v1/requests/a/comment';
const invalidRequestIdUrlGet = '/api/v1/requests/a/comments';
const updateComment = '/api/v1/requests/comments/1';
const InvalidUpdateUrl = '/api/v1/requests/comments/a';
const pendingApprovals = '/api/v1/requests/pending';
const updateResquest = '/api/v1/requests/1';

const oneWay = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'hotel'
};
const wrongLocation = {
  from: 'Kigali, Rwanda',
  to: 90,
  travelDate: '2019-11-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'Hotel'
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
  accommodation: 2
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
const comment = {
  comment: 'This is a sample comment'
};
const invalidComment = {
  comment: null
};

const returnTripData = {
  from: 'North, Rwanda',
  to: 1,
  travelDate: '2019-11-12',
  returnDate: '2019-11-20',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'hotel'
};
const wrongreturnDate = {
  from: 'Kigali, Rwanda',
  to: 1,
  travelDate: '2019-11-02',
  returnDate: '2010-01-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  accommodation: 'hotel'
};

before('Log In normal users correct credentials', (done) => {
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

before('Log In manager correct credentials', (done) => {
  const user = {
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
      expect(res).to.have.status(200);
      expect(res.body.data).to.have.property('userToken');

      managerToken = res.body.data.userToken;

      done();
    });
});

describe('Get Requests', () => {
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
  it('should change user email preferences', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/email-preferences')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
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
  describe('Request Comments', () => {
    it('should retrieve comments', (done) => {
      chai
        .request(server)
        .get(getRequestCommentsUrl)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('should have valid request url', (done) => {
      chai
        .request(server)
        .get(invalidRequestIdUrlGet)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should add comment', (done) => {
      chai
        .request(server)
        .post(addRequestCommentUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(201);
          done();
        });
    });
    it('should have a valid comment', (done) => {
      chai
        .request(server)
        .post(addRequestCommentUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidComment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should have a valid request id', (done) => {
      chai
        .request(server)
        .post(invalidRequestIdUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should update comment', (done) => {
      chai
        .request(server)
        .put(updateComment)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('should have a valid comment id', (done) => {
      chai
        .request(server)
        .put(InvalidUpdateUrl)
        .set('Authorization', `Bearer ${token}`)
        .send(comment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should be a valid comment', (done) => {
      chai
        .request(server)
        .put(updateComment)
        .set('Authorization', `Bearer ${token}`)
        .send(invalidComment)
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
    it('should delete comment', (done) => {
      chai
        .request(server)
        .delete(updateComment)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('should have a valid comment id', (done) => {
      chai
        .request(server)
        .delete(InvalidUpdateUrl)
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((_err, res) => {
          if (_err) done(_err);
          expect(res.status).to.eq(422);
          done();
        });
    });
  });
});
describe('Manager get Pending requests', () => {
  it('When user is manager', (done) => {
    chai
      .request(server)
      .get(pendingApprovals)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(200);

        done();
      });
  });

  it('When user is requester', (done) => {
    chai
      .request(server)
      .get(pendingApprovals)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(403);
        done();
      });
  });
});
describe('Reject request', () => {
  // reject request tests
  let requestId;
  before('create a travel request', (done) => {
    const request = {
      from: 'Kigali, Rwanda',
      to: 1,
      travelDate: '2019-11-04',
      reason:
        'I am travelling cause the company allows us to, i mean the company finances everything so why not?',
      accommodation: 'hotel'
    };
    chai
      .request(server)
      .post('/api/v1/requests/one-way')
      .set('Authorization', `Bearer ${token}`)
      .send(request)
      .end((error, res) => {
        if (error) done(error);
        requestId = res.body.data.id;
        done();
      });
  });
  it('Manager should be able to reject a request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
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
  it('Manager should be not be able to reject an already rejected request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('Manager should be not be able to reject a request that is not created', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('Manager should be not be able to reject a request if reason is not valid', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('Validation failed');
        done();
      });
  });
  it('Manager should be not be able to reject a request if requestId an integer', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/reject/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this irequestId is required and requestId is required and must bmust be an integer greater than zero'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('Validation failed');
        expect(res.body.error).to.eq('"requestId" must be an integer');
        done();
      });
  });
  it('should be not be able to reject a request if not manager', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'Manager should be not be able to reject a request if reason is not valid' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(403);
        done();
      });
  });
});
describe('Accept request', () => {
  // accept request tests
  let requestId;
  before('create a travel request', (done) => {
    const request = {
      from: 'Kigali, Rwanda',
      to: 1,
      travelDate: '2019-11-03',
      reason:
        'I am travelling cause the company allows us to, i mean the company finances everything so why not?',
      accommodation: 'hotel'
    };
    chai
      .request(server)
      .post('/api/v1/requests/one-way')
      .set('Authorization', `Bearer ${token}`)
      .send(request)
      .end((error, res) => {
        if (error) done(error);
        requestId = res.body.data.id;
        done();
      });
  });
  it('Manager should be able to accept a request', (done) => {
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
  it('Manager should be not be able to accept an already accepted request', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('Manager should be not be able to accept a request that is not created', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('Manager should be not be able to accept a request if reason is not valid', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('Validation failed');
        done();
      });
  });
  it('Manager should be not be able to accept a request if requestId an integer', (done) => {
    chai
      .request(server)
      .patch('/api/v1/requests/approve/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this irequestId is required and requestId is required and must bmust be an integer greater than zero'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        expect(res.body.message).to.eq('Validation failed');
        expect(res.body.error).to.eq('"requestId" must be an integer');
        done();
      });
  });
  it('should be not be able to accept a request if not manager', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'Manager should be not be able to accept a request if reason is not valid' })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(403);
        done();
      });
  });
});
describe('Update Requests', () => {
  it('with all valid properties', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 1,
        travelDate: '2019-11-02',
        returnDate: '2019-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('with invalid departure', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 2,
        to: 1,
        travelDate: '2019-11-02',
        returnDate: '2019-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid destination', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 'r',
        travelDate: '2019-11-02',
        returnDate: '2019-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid travelDate', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 1,
        travelDate: '2019-11-2',
        returnDate: '2019-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid returnDate', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 1,
        travelDate: '2019-11-02',
        returnDate: '2002-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid reason', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 1,
        travelDate: '2019-11-02',
        returnDate: '2019-11-04',
        reason: 'hey the ',
        accommodation: 'Hotel'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid accommodation', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: 1,
        travelDate: '2019-11-02',
        returnDate: '2019-11-04',
        reason: 'hey the nklnk;joihnbyugvytgtfredersg;lklmnjnbvytfyfjo',
        accommodations: ' '
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
});
