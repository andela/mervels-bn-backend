import express from 'express';
import roomsController from '../../controllers/roomsController';
import verify from '../../middlewares/auth';
import method from '../../utils/method';

const router = express.Router();

router
  .route('/')
  .get(verify, roomsController.getAllRooms)
  .all(method);

export default router;
