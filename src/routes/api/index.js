import express from 'express';
import usersRouter from './users';
import requestRouter from './requests';
import accommodationRouter from './accommodations';
import locationRouter from './locations';
import userProfileRouter from './userProfile';
import searchRouter from './search';
import notificationRouter from './notifications';
import chatRouter from './chat';
import bookingRouter from './booking';
import roomsRouter from './rooms';

const router = express.Router();
router.use('/auth', usersRouter);
router.use('/requests', requestRouter);
router.use('/accommodations', accommodationRouter);
router.use('/chat', chatRouter);

router.use('/profile', userProfileRouter);

router.use('/search', searchRouter);

router.use('/notifications', notificationRouter);
router.use('/booking', bookingRouter);
router.use('/locations', locationRouter);
router.use('/rooms', roomsRouter);

router.use((err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      status: 400,
      errors: "Server can't handle the request currently"
    });
  }

  return next(err);
});

module.exports = router;

// export default router;
