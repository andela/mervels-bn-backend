import express from 'express';
import notificationController from '../../controllers/notificationController';
import verify from '../../middlewares/auth';
import Access from '../../middlewares/userRoles';
import Validator from '../../validation/notificationValidator';

const router = express.Router();

router.get('/', verify, notificationController.getNotifications);
router.patch(
  '/mark-as-read',
  verify,
  Validator.markAsRead,
  Access.isNotificationOwner,
  notificationController.markAsRead
);

export default router;
