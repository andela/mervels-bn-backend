import express from 'express';
import userProfileController from '../../controllers/userProfileController';
import auth from '../../middlewares/auth';
import userProfileValidator from '../../validation/userProfileValidator';

const router = express.Router();

router.patch('/', auth, userProfileValidator.checkUpdate, userProfileController.updateProfile);
router.get('/', auth, userProfileController.userProfile);

module.exports = router;
