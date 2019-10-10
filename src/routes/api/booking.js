import express from 'express';
import Booking from '../../controllers/bookingController';
import BookingValidator from '../../validation/bookingValidation';
import verify from '../../middlewares/auth';
import Valid from '../../middlewares/booking';

import method from '../../utils/method';

const router = express.Router();

router
  .route('/:id')
  .post(
    verify,
    BookingValidator.booking,
    Valid.isRequestValid,
    Valid.isAccommodationInLocation,
    Valid.validCheckInOut,
    Valid.isValidRoom,
    Valid.isRoomFree,
    Booking.bookRooms
  )
  .all(method);

router
  .route('/cancel/:id')
  .post(verify, BookingValidator.cancel, Booking.cancelBooking)
  .all(method);

export default router;
