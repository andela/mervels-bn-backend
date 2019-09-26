import express from 'express';

const router = express.Router();
router.use('/auth', require('./users'));
router.use('/requests', require('./requests'));
router.use('/accommodations', require('./accommodations'));

router.use('/auth', require('./users'));

router.use('/profile', require('./userProfile'));

router.use('/search', require('./search'));

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
