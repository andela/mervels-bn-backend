import express from 'express';
import usersRouter from './users';
import requestRouter from './requests';
import accommodationRouter from './accommodations';
import userProfileRouter from './userProfile';
import searchRouter from './search';
import notificationRouter from './notifications';

const router = express.Router();
router.use('/auth', usersRouter);
router.use('/requests', requestRouter);
router.use('/accommodations', accommodationRouter);

router.use('/profile', userProfileRouter);

router.use('/search', searchRouter);

router.use('/notifications', notificationRouter);

router.use((err, req, res, next) => {
  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      status: 400,
      errors: 'bad request'
    });
  }

  return next(err);
});

module.exports = router;

// export default router;
