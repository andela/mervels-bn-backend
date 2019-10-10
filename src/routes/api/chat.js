/* eslint-disable no-unused-vars */
import express from 'express';
import Chat from '../../controllers/chatController';
import verify from '../../middlewares/auth';
import method from '../../utils/method';
import chatValid from '../../validation/chatValidation';

const router = express.Router();

router
  .route('/')
  .post(verify, chatValid.message, Chat.saveMessage)
  .get(verify, Chat.getMessages)
  .all(method);

export default router;
