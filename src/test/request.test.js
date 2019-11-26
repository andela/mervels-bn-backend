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
const autofill = '/api/v1/requests/one-way?autofill=true';
const returnTrip = '/api/v1/requests/return-trip';
const getRequestCommentsUrl = '/api/v1/requests/1/comments';
const addRequestCommentUrl = '/api/v1/requests/1/comment';
const invalidRequestIdUrl = '/api/v1/requests/a/comment';
const invalidRequestIdUrlGet = '/api/v1/requests/a/comments';
const updateComment = '/api/v1/requests/comments/1';
const InvalidUpdateUrl = '/api/v1/requests/comments/a';
const pendingApprovals = '/api/v1/requests/pending';
const updateResquest = '/api/v1/requests/1';
const deleteRequest = '/api/v1/requests/13';
const markAllAsRead = '/api/v1/notifications/mark-as-read';

const oneWay = {
  from: 'Kigali, Rwanda',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    }
  ],
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything'
};
const invalidLocation = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 400,
      accommodation: 'sheraton'
    }
  ],
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const oneWayAutofill = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2031-11-26',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const noPassportNumber = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2019-11-26',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const noPassportName = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2019-11-26',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  gender: 'MALE'
};

const noGender = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2019-11-26',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati'
};

const wrongLocation = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 'wrong',
      accommodation: 'sheraton'
    }
  ],
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};
const WrongDate = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '11-12-2040',
      location: 2,
      accommodation: 'sheraton'
    }
  ],
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};
const WrongAccomodation = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 333
    }
  ],
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};
const wrongTo = {
  from: 'Kigali, Rwanda',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};
const Wrongfrom = {
  from: 'Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    }
  ],
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const WrongDescription = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    }
  ],
  reason: 'iam',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};
const comment = {
  comment: 'This is a sample comment'
};
const invalidComment = {
  comment: null
};

const returnTripData = {
  from: 'North, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  returnDate: '2040-11-20',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const wrongreturnDate = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    }
  ],
  returnDate: '2030-12-02',
  reason: 'iam travelling cause the company allows us to, i mean the company finances everything',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
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
      token = res.body.data;

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
      managerToken = res.body.data;

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
  it('User should post a one way trip', (done) => {
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
  it('User should request for a one way trip using autofill', (done) => {
    chai
      .request(server)
      .post(autofill)
      .set('Authorization', `Bearer ${token}`)
      .set('Cookie', 'passportNumber=1234WDFS3D5F;passportName=Jonathan%20Shyaka;gender=MALE')
      .send(oneWayAutofill)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('User should not request autofill without cookies set', (done) => {
    chai
      .request(server)
      .post(autofill)
      .set('Authorization', `Bearer ${token}`)
      .send(oneWayAutofill)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(400);
        done();
      });
  });
  it('User should not request one trip without passport number', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(noPassportNumber)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip without passport name', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(noPassportName)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip without gender', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(noGender)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('User should not request one trip with wrong location', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(invalidLocation)
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
  it('User should not request one trip with wrong location id', (done) => {
    chai
      .request(server)
      .post(oneway)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongLocation)
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
        expect(res.status).to.eq(400);
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
    it('should add comment as manager', (done) => {
      chai
        .request(server)
        .post(addRequestCommentUrl)
        .set('Authorization', `Bearer ${managerToken}`)
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
      to: [
        {
          travelDate: '2040-10-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'I am travelling cause the company allows us to, i mean the company finances everything so why not?',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
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
        expect(res.body.error).to.eq('Validation Error');
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
        expect(res.body.error).to.eq('Validation Error');

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
      to: [
        {
          travelDate: '2040-10-13',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'I am travelling cause the company allows us to, i mean the company finances everything so why not?',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
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
  it('user should be  able to get one request', (done) => {
    chai
      .request(server)
      .get(`/api/v1/requests/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('user should not be able to get one request without or with invalid id', (done) => {
    chai
      .request(server)
      .get('/api/v1/requests/abc')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('user should not be able to get one request if not found', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/email-preferences')
      .set('Authorization', `Bearer ${managerToken}`)
      .end((_err, res) => {
        if (_err) done(_err);
        done();
      });
  });
  it('with all invalid location', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'Kigali, Rwanda',
        to: [
          {
            travelDate: '2020-11-12',
            location: 'rest',
            accommodation: 'sheraton'
          }
        ],
        reason: 'iam travelling cause the company allows us to, i mean the that'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with invalid departure', (done) => {
    chai
      .request(server)
      .put(updateResquest)
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 400,
        to: [
          {
            travelDate: '2020-11-12',
            location: 2,
            accommodation: 'sheraton'
          }
        ],
        reason: 'iam travelling cause the company allows us to, i mean the that'
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
        to: 'destination',
        reason: 'iam travelling cause the company allows us to, i mean the that'
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
        to: [
          {
            travelDate: '2020-11-12-34',
            location: 2,
            accommodation: 'sheraton'
          }
        ],
        reason: 'iam travelling cause the company allows us to, i mean the that',
        passportNumber: '121HU3H3U32',
        passportName: 'Robben Bahati',
        gender: 'MALE'
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
        to: [
          {
            travelDate: '2020-11-12',
            location: 2,
            accommodation: 'sheraton'
          }
        ],
        returnDate: '20-11-12',
        reason: 'iam travelling cause the company allows us to, i mean the that',
        passportNumber: '121HU3H3U32',
        passportName: 'Robben Bahati',
        gender: 'MALE'
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
        to: [
          {
            travelDate: '2020-11-12',
            location: 2,
            accommodation: 'sheraton'
          }
        ],
        returnDate: '2029-12-12',
        reason: 'ia'
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
        to: [
          {
            travelDate: '2020-11-12',
            location: 2,
            accommodation: 8
          }
        ],
        returnDate: '2029-12-12',
        reason: 'iam travelling cause the company allows us to, i mean the that',
        passportNumber: '121HU3H3U32',
        passportName: 'Robben Bahati',
        gender: 'MALE'
      })
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should delete the request', (done) => {
    chai
      .request(server)
      .delete(deleteRequest)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
});
describe('Notifications', () => {
  it('should mark all as read', (done) => {
    chai
      .request(server)
      .patch(markAllAsRead)
      .set('Authorization', `Bearer ${managerToken}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
});
