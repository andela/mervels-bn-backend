import swagger from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';

const router = require('express').Router();

router.use('/api', require('./api'));

router.use('/api/docs', swagger.serve, swagger.setup(swaggerDoc));

module.exports = router;
