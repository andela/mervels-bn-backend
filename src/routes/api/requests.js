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
  .route('/trip-stats')
  .post(verify, requestsValidator.statistics, Requests.statistics)
  .all(method);

router
  .route('/one-way')
  .post(
    verify,
    requestsValidator.oneWay,
    location.validDate,
    location.validLocation,
    location.validAccomodation,
    Requests.trip
  )
  .all(method);

router
  .route('/return-trip')
  .post(
    verify,
    requestsValidator.returnTrip,
    location.validDate,
    location.validLocation,
    location.validAccomodation,
    Requests.trip
  )
  .all(method);

router
  .route('/multi-city')
  .post(
    verify,
    requestsValidator.multiCity,
    location.validDate,
    location.validLocation,
    location.validAccomodation,
    Requests.trip
  )
  .all(method);

router
  .route('/my-requests')
  .get(verify, Requests.getMyRequests)
  .all(method);
router
  .route('/reject/:requestId')
  .patch(verify, Access.managerRole, requestsValidator.requestApproval, Requests.rejectRequest)
  .all(method);
router
  .route('/approve/:requestId')
  .patch(verify, Access.managerRole, requestsValidator.requestApproval, Requests.acceptRequest)
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
router
  .route('/pending')
  .get(verify, Access.managerRole, Requests.getPendingApprovals)
  .all(method);
router.delete(
  '/comments/:id',
  verify,
  commentsValidator.deleteComment,
  Access.isCommentOwner,
  Comments.deleteComment
);
router
  .route('/:id')
  .put(
    verify,
    Access.isOwner,
    requestsValidator.validateEditRequest,
    location.validLocation,
    location.validAccomodation,
    location.validDate,
    Requests.EditRequest
  )
  .all(method);

export default router;
