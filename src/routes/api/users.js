/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';
import Users from '../../controllers/userController';
import '../../config/passport';
import userValidator from '../../validation/userValidator';
import verify from '../../middlewares/auth';
import Access from '../../middlewares/userRoles';
import method from '../../utils/method';

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router
  .route('/signup')
  .post(userValidator.validateSignup, Users.createUser)
  .all(method);
router
  .route('/signin')
  .post(userValidator.validateSignIn, Users.logIn)
  .all(method);
router
  .route('/createLink')
  .post(userValidator.validateSendLink, Users.sendLink)
  .all(method);
router
  .route('/verify')
  .patch(userValidator.validateVerifyLink, Users.verify)
  .all(method);
router
  .route('/signout')
  .post(verify, Users.logout)
  .all(method);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

router.get('/google/redirect', passport.authenticate('google'), Users.socialLogin);

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router
  .route('/updateRole')
  .put(userValidator.validateUserRole, verify, Access.isAdmin, Users.updateUserRole)
  .all(method);

router
  .route('/facebook/redirect')
  .get(passport.authenticate('facebook'), Users.socialLogin)
  .all(method);
router
  .route('/requestPasswordReset')
  .post(Users.requestPasswordReset)
  .all(method);
router
  .route('/resetPassword/:userId/:token')
  .put(userValidator.resetPassword, Users.resetPassword)
  .all(method);
router
  .route('/forgotPassword')
  .post(Users.requestPasswordReset)
  .all(method);
router
  .route('/add-user')
  .post(verify, userValidator.userByAdmin, Access.isAdmin, Users.addSupplier)
  .all(method);

router
  .route('/email-preferences')
  .patch(verify, Users.emailPreferences)
  .all(method);
router
  .route('/unsubscribe')
  .patch(userValidator.validateUnsubscribe, Users.unsubscribe)
  .all(method);

export default router;
