import express from 'express';
import notificationController from '../../controllers/notificationController';
import verify from '../../middlewares/auth';

const router = express.Router();

router.get('/', verify, notificationController.getNotifications);

module.exports = router;
