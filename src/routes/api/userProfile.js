import express from 'express';
import fileupload from 'express-fileupload';
import userProfileController from '../../controllers/userProfileController';
import auth from '../../middlewares/auth';
import userProfileValidator from '../../validation/userProfileValidator';

const router = express.Router();

router.use(fileupload({ useTempFiles: true }));

router.patch('/', auth, userProfileValidator.checkUpdate, userProfileController.updateProfile);
router.get('/', auth, userProfileController.userProfile);
router.patch('/picture', auth, userProfileController.updatePicture);
router.get('/picture', auth, userProfileController.getPicture);

export default router;
