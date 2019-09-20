/* eslint-disable no-unused-vars */
import express from 'express';
import Requests from '../../controllers/requestController';
import requestsValidator from '../../validation/requestValidator';
import verify from '../../middlewares/auth';
import method from '../../utils/method';
import location from '../../middlewares/validLocation';

const router = express.Router();

router
  .route('/oneWay')
  .post(
    verify,
    requestsValidator.oneWay,
    location.validLocation,
    location.validAccomodation,
    Requests.trip
  )
  .all(method);

router
  .route('/returnTrip')
  .post(
    verify,
    requestsValidator.returnTrip,
    location.validLocation,
    location.validAccomodation,
    Requests.trip
  )
  .all(method);
router
  .route('/my-requests')
  .get(verify, Requests.getMyRequests)
  .all(method);

module.exports = router;
