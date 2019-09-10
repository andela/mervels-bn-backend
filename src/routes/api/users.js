import express from 'express';
import Users from '../../controllers/userController';

const router = express.Router();
const users = new Users();
router.post('/signup', users.createUser);

module.exports = router;
