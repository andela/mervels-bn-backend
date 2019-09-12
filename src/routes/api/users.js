import express from 'express';
import Users from '../../controllers/userController';
import userValidator from '../../validation/userValidator';

const router = express.Router();

router.post('/signup', userValidator.validateSignup, Users.createUser);
router.post('/signin', userValidator.validateSignIn, Users.logIn);

module.exports = router;
