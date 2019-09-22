/* eslint-disable no-unused-vars */
import express from 'express';
import Requests from '../../controllers/requestController';
import Comments from '../../controllers/commentController';
import requestsValidator from '../../validation/requestValidator';
import commentsValidator from '../../validation/commentValidator';
import verify from '../../middlewares/auth';
import method from '../../utils/method';
import location from '../../middlewares/validLocation';
import Access from '../../middlewares/userRoles';

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

router.get(
  '/:id/comments',
  verify,
  commentsValidator.getComments,
  Access.isOwnerOrManager,
  Comments.getCommentsByRequest
);
router.post(
  '/:id/comment',
  verify,
  commentsValidator.addComment,
  Access.isOwnerOrManager,
  Comments.addComment
);
router.put(
  '/comments/:id',
  verify,
  commentsValidator.updateComment,
  Access.isCommentOwner,
  Comments.updateComment
);

module.exports = router;
