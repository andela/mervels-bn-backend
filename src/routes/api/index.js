import express from 'express';

const router = express.Router();
router.use('/auth', require('./users'));
router.use('/requests', require('./requests'));
router.use('/accommodations', require('./accommodations'));

router.use('/auth', require('./users'));

router.use('/profile', require('./userProfile'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      message: 'Validation Failed',
      status: 422,
      errors: Object.keys(err.details).reduce((errors, key) => err.details[key].message, {})
    });
  }

  return next(err);
});
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
