import express from 'express';
import fileupload from 'express-fileupload';
import Accommodations from '../../controllers/accommodationController';
import verify from '../../middlewares/auth';
import accommodationValidator from '../../validation/accommodationValidation';
import Review from '../../controllers/reviewController';
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
  Access.isAllowedUser,
  accommodationValidator.validateCreateRoom,
  Accommodations.createRoom
);
router.post(
  '/',
  verify,
  Access.isAllowedUser,
  accommodationValidator.validateCreateAccommodation,
  Accommodations.createAccommodation
);
router.get('/', verify, Accommodations.getAllAccommodations);
router.get('/most-travelled-destination', verify, Accommodations.getMostTravelledDestination);
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

router.post('/:id/feedback', verify, accommodationValidator.validateFeedback, Review.addedFeedback);

router.post('/:id/ratings', verify, accommodationValidator.validateRating, Review.rateCenter);

export default router;
