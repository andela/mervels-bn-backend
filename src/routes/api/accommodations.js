import express from 'express';
import fileupload from 'express-fileupload';
import Accommodations from '../../controllers/accommodationController';
import verify from '../../middlewares/auth';
import accommodationValidator from '../../validation/accommodationValidation';
import Access from '../../middlewares/userRoles';

const router = express.Router();
router.use(
  fileupload({
    useTempFiles: true
  })
);

router.post(
  '/rooms',
  verify,
  Access.travelAdmin,
  accommodationValidator.validateCreateRoom,
  Accommodations.createRoom
);
router.post(
  '/',
  verify,
  Access.travelAdmin,
  accommodationValidator.validateCreateAccommodation,
  Accommodations.createAccommodation
);
router.get('/', verify, Accommodations.getAllAccommodations);
router.get(
  '/:accommodationId',
  verify,
  accommodationValidator.validateGetOneAccommodation,
  Accommodations.getAccommodationById
);
router.patch(
  '/:accommodationId/like',
  verify,
  accommodationValidator.validateGetOneAccommodation,
  Accommodations.likeOrUnlike
);

module.exports = router;
