/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import passport from 'passport';
import '../config/passport';
import index from '../index';

const server = index.app;
const { expect } = chai;

const signupUrl = '/api/v1/auth/signup';
const requestReset = '/api/v1/auth/forgotPassword';

const signinUrl = '/api/v1/auth/signin';
const sendLinkUrl = '/api/v1/auth/createLink';
const updateRole = '/api/v1/auth/updateRole';
const profileUrl = '/api/v1/profile';
const profilePictureUrl = '/api/v1/profile/picture';

let token1;
let superToken;

const loginWithGoogle = '/api/v1/auth/google';
const loginWithFacebook = '/api/v1/auth/facebook';
const googleRedirect = '/api/v1/auth/google/redirect';
const facebookRedirect = '/api/v1/auth/facebook/redirect';
const signout = '/api/v1/auth/signout';
const emailPreferences = '/api/v1/auth/email-preferences';

chai.use(chaiHttp);

const regData = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root1234@'
};
const regDataWithWrongPassword = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root'
};
const regDataWithWrongEmail = {
  userEmail: 'jonathanaurugaigmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root'
};
const existUser = { email: regData.userEmail };
const notUser = { email: 'joneuuuuuathanaurugai@gmail.com' };

let token;

describe('create an account', () => {
  it('with valid properties and send an email with verification link', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send(regData)
      .end((_err, res) => {
        token1 = res.body.data.userToken;
        expect(res.body.message).to.eq('Account has been created successfully');
        expect(res.status).to.eq(201);
        expect(res.body.data.verification.message).to.eq('Verification link sent');
        done();
      });
  });
  it('should not login if the email is not verified', (done) => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: 'Root1234@'
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((_err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should send a verification link to a registered email', (done) => {
    chai
      .request(server)
      .post(sendLinkUrl)
      .send({ userEmail: regData.userEmail })
      .end((_err, res) => {
        expect(res.body.message).to.eq('email sent with verification link');
        expect(res.status).to.eq(200);
        expect(res.body.data.link).to.be.a('string');
        done();
      });
  });
  it('should not send a verification link to a unregistered email', (done) => {
    chai
      .request(server)
      .post(sendLinkUrl)
      .send({ userEmail: 'unkown@barefoot.to' })
      .end((_err, res) => {
        expect(res.body.message).to.eq('this email is not registered');
        expect(res.status).to.eq(404);
        done();
      });
  });
  it('should not send a verification if no email is provided', (done) => {
    chai
      .request(server)
      .post(sendLinkUrl)
      .send({})
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not send a verification there is invalid email', (done) => {
    chai
      .request(server)
      .post(sendLinkUrl)
      .send({ userEmail: 'bahat.ghassd.com' })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should not send a verification the email is empty', (done) => {
    chai
      .request(server)
      .post(sendLinkUrl)
      .send({ userEmail: ' ' })
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should verify an email via verification link', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/verify/?token=${token1}`)
      .end((_err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should give an error if an email is already verified', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/verify/?token=${token1}`)
      .end((_err, res) => {
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('should give error when the token is not provided', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/verify/?token=')
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });

  it('should give error when the token is invalid or expired', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/verify/?token=invalidorexpiredtoken')
      .end((_err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should give error when the secret key is invalid', (done) => {
    process.env.TOKEN = 'ASGDKASJHD';
    chai
      .request(server)
      .patch(`/api/v1/auth/verify/?token=${token1}`)
      .end((_err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('with wrong password', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send(regDataWithWrongPassword)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('with wrong Email', (done) => {
    chai
      .request(server)
      .post(signupUrl)
      .send(regDataWithWrongEmail)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
});

describe('User Login', () => {
  it('with correct credentials', (done) => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
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
  it('with wrong email', (done) => {
    const user = {
      userEmail: 'whjghj@stations.com',
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
        expect(res).to.have.status(401);
        done();
      });
  });

  it('with wrong password', (done) => {
    const user = {
      userEmail: 'wi@stations.com',
      userPassword: 'R@123123sajhgsd'
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(401);
        done();
      });
  });

  it('with incorrect email field', (done) => {
    const user = {
      Email: 'whjghj@stations.com',
      userPassword: '123123'
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(422);
        done();
      });
  });
  it('with incorrect password field', (done) => {
    const user = {
      userEmail: 'whjghj@stations.com',
      password: '123123'
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(422);
        done();
      });
  });

  it('with empty fields', (done) => {
    const user = {
      email: 'whjghj@stations.com',
      password: ' '
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(422);
        done();
      });
  });
});

describe('login through facebook', () => {
  it('redirects to facebook', (done) => {
    chai
      .request(server)
      .get(loginWithFacebook)
      .end((_err, res) => {
        res.redirects[0].should.contain(
          'api/v1/auth/facebook/redirect?__mock_strategy_callback=true'
        );
        done();
      });
  });
  it('Should add user', (done) => {
    const strategy = passport._strategies.facebook;
    strategy._token_response = {
      access_token: 'at-1234',
      expires_in: 3600
    };

    strategy._profile = {
      id: 1234,
      provider: 'facebook',
      _json: {
        first_name: 'Jonathan',
        last_name: 'Shyaka'
      },
      emails: [{ value: 'jonathanshyaka@example.com' }]
    };
    chai
      .request(server)
      .get(facebookRedirect)
      .end((_err, res) => {
        res.redirects[0].should.contain(
          'api/v1/auth/facebook/redirect?__mock_strategy_callback=true'
        );
        expect(res.status).to.eq(200);
        done();
      });
  });
});
describe('login through google', () => {
  it('redirects to google', (done) => {
    chai
      .request(server)
      .get(loginWithGoogle)
      .end((_err, res) => {
        res.redirects[0].should.contain(
          'api/v1/auth/google/redirect?__mock_strategy_callback=true'
        );
        done();
      });
  });
  it('Should add user', (done) => {
    const strategy = passport._strategies.google;
    strategy._token_response = {
      access_token: 'at-1234',
      expires_in: 3600
    };

    strategy._profile = {
      id: 1234,
      provider: 'google',
      _json: {
        given_name: 'Jonathan',
        family_name: 'Shyaka'
      },
      emails: [{ value: 'jonathanshyaka@example.com' }]
    };
    chai
      .request(server)
      .get(googleRedirect)
      .end((_err, res) => {
        res.redirects[0].should.contain(
          'api/v1/auth/google/redirect?__mock_strategy_callback=true'
        );
        expect(res.status).to.eq(200);
        done();
      });
  });
});

describe('Reset Password via Email', () => {
  it('Sends reset password email', (done) => {
    chai
      .request(server)
      .post(requestReset)
      .send(existUser)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.eq('If email is found, check your email for the link');
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('Sends reset password email', (done) => {
    chai
      .request(server)
      .post(requestReset)
      .send(notUser)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).to.eq('If email is found, check your email for the link');
        expect(res.status).to.eq(200);
        done();
      });
  });
});

describe('Test Access', () => {
  describe('Super Administrator', () => {
    before((done) => {
      const superUser = {
        userEmail: 'johndoe@gmail.com',
        userPassword: 'Root1123#'
      };

      chai
        .request(server)
        .post(signinUrl)
        .send(superUser)
        .end((err, res) => {
          superToken = res.body.data.userToken;
          done();
        });
    });
    it('with valid properties', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'jonathanaurugai@gmail.com', userRole: 'Manager' })
        .end((_err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('with valid properties and transfering Manager rights', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'josephdoe@gmail.com', userRole: 'Manager' })
        .end((_err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('with different email', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'josephdoe@gmail.com', userRole: 'Manager' })
        .end((_err, res) => {
          expect(res.status).to.eq(409);
          expect(res.body.message).to.eq(
            'The user already has the rights you are trying to assign'
          );
          done();
        });
    });
    it('remove manager right', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'josephdoe@gmail.com', userRole: 'Requester' })
        .end((_err, res) => {
          expect(res.status).to.eq(404);
          done();
        });
    });
    it('create new manger', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'jonathanaurugai@gmail.com', userRole: 'Manager' })
        .end((_err, res) => {
          expect(res.status).to.eq(200);
          done();
        });
    });
    it('with wrong email', (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'josephdoe12gmail.com', userRole: 'Travel Administrator' })
        .end((_err, res) => {
          expect(res.status).to.eq(422);
          expect(res.body.error).to.eq('Validation Error');
          done();
        });
    });
    it("with valid properties while trying to update super admin's role", (done) => {
      chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'johndoe@gmail.com', userRole: 'Manager' })
        .end((_err, res) => {
          expect(res.status).to.eq(400);
          done();
        });
    });
  });
});

describe('User Profile', () => {
  it('should get user Profile', (done) => {
    chai
      .request(server)
      .get(profileUrl)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(200);
        expect(res.body.data).to.have.property('userEmail');
        expect(res.body.data).to.have.property('userProfile');

        done();
      });
  });

  it('should update user Profile', (done) => {
    const profileData = {
      gender: 'MALE',
      language: 'English',
      currency: 'Francs',
      department: 'Operations'
    };

    chai
      .request(server)
      .patch(profileUrl)
      .set('Authorization', `Bearer ${token}`)
      .send(profileData)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(200);
        expect(res.body.data.userProfile.gender).to.eq('MALE');
        expect(res.body.data.userProfile.language).to.eq('English');
        expect(res.body.data.userProfile.currency).to.eq('Francs');

        done();
      });
  });
  it('should not update user Profile if wrong field in phoneNumber', (done) => {
    const profileData = {
      phoneNumber: '1232asdasds'
    };
    chai
      .request(server)
      .patch(profileUrl)
      .set('Authorization', `Bearer ${token}`)
      .send(profileData)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(422);

        done();
      });
  });
  it('should not update user Profile if wrong field in birthDate', (done) => {
    const profileData = {
      birthDate: '20-10-2019'
    };
    chai
      .request(server)
      .patch(profileUrl)
      .set('Authorization', `Bearer ${token}`)
      .send(profileData)
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.status).to.eq(422);

        done();
      });
  });
});

describe('User Profile Picture', () => {
  it('should get user Profile Picture', (done) => {
    chai
      .request(server)
      .get(profilePictureUrl)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should update user Profile Picture', (done) => {
    chai
      .request(server)
      .patch(profilePictureUrl)
      .set('Authorization', `Bearer ${token}`)
      .attach('image', 'src/test/testData/marvel.png', 'marvel.png')
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);

        done();
      });
  });
});

describe('Email Preference', () => {
  it('can opt out of email nofitications from email', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/unsubscribe/?token=${token}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        expect(res.body.data.emailAllowed).to.eq(false);
        done();
      });
  });
  it('should not opt out of email nofitications if already opted out', (done) => {
    chai
      .request(server)
      .patch(`/api/v1/auth/unsubscribe/?token=${token}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(409);
        done();
      });
  });
  it('should not opt out of email nofitications if value is not false', (done) => {
    chai
      .request(server)
      .patch('/api/v1/auth/unsubscribe/?value=12')
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(422);
        done();
      });
  });
  it('should update user email preference', (done) => {
    chai
      .request(server)
      .patch(emailPreferences)
      .set('Authorization', `Bearer ${token}`)
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        expect(res.body.data.emailAllowed).to.eq(true);
        done();
      });
  });
});

describe('Users Logout', () => {
  it('when they are logged In', (done) => {
    chai
      .request(server)
      .post(signout)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.body.message).to.eq('User logged out successfully');
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('when they are not logged In', (done) => {
    chai
      .request(server)
      .post(signout)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.body.message).to.eq('User not logged In');
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('by passing incorrect token', (done) => {
    chai
      .request(server)
      .post(signout)
      .set('Authorization', 'WrongToken sadasdasdasd')
      .send()
      .end((_err, res) => {
        if (_err) done(_err);

        expect(res.body.message).to.eq('Invalid or expired token used');
        expect(res.status).to.eq(401);
        done();
      });
  });
});
