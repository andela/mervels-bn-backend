/* eslint-disable no-restricted-globals */
import Response from '../utils/response';
import RequestService from '../services/requestService';
import CommentService from '../services/commentService';
import NotificationService from '../services/notificationService';
/** Class representing a UserRole. */
class Access {
  /**
   * Creates a new chek.
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next next task.
   * @returns {object} The User object.
   */
  static async isAllowedUser(req, res, next) {
    const { userRoles } = req.user;
    const allowedUsers = ['Travel Administrator', 'Accommodation Supplier'];
    if (allowedUsers.includes(userRoles) === false) {
      return Response.authorizationError(res, 'You are not allowed to perform this task');
    }
    next();
  }

  /**
   * Checks if the user is an Admin.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static async isAdmin(req, res, next) {
    if (req.user.userRoles !== 'Super Administrator') {
      return Response.authorizationError(res, "You don't have rights to complete this operation");
    }
    next();
  }

  /**
   * Checks if the user is the request owner or manager.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static async isOwnerOrManager(req, res, next) {
    const request = await RequestService.findRequest({ id: req.params.id });
    if (!request) {
      return Response.notFoundError(res, 'request not found');
    }
    if (req.user.userRoles !== 'Manager' && req.user.id !== request.user) {
      return Response.authorizationError(res, "You don't have rights to complete this operation");
    }
    next();
  }

  /**
   * Checks if the user is the request owner or manager.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static async isCommentOwner(req, res, next) {
    const comment = await CommentService.getCommentById(req.params.id);
    if (!comment) {
      return Response.notFoundError(res, 'Please use a valid comment ID');
    }
    if (req.user.id !== comment.user) {
      return Response.authorizationError(res, "You don't have rights to complete this operation");
    }
    next();
  }

  /**
   * Checks if the user is the request owner or manager.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static async isNotificationOwner(req, res, next) {
    if (req.query.id) {
      const data = await NotificationService.getNotifications({ id: req.query.id });
      if (data.notifications.length === 0) {
        return Response.notFoundError(res, 'Please use a valid notification ID');
      }
      if (req.user.id !== data.notifications[0].dataValues.userId) {
        return Response.authorizationError(res, "You can't mark this notification as read");
      }
    }
    next();
  }

  /**
   * Checks if the user is the request owner or manager.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static managerRole(req, res, next) {
    if (req.user.userRoles !== 'Manager') {
      return Response.authorizationError(res, 'You are not allowed to perform this task');
    }
    next();
  }

  /**
   * Checks if the user is the owner.
   *@param {string} req  data.
   * @param {string} res  data.
   * @param {string} next data.
   * @returns {string} object.
   */
  static async isOwner(req, res, next) {
    const { id } = req.params;
    // check id the id sent is not a number
    if (isNaN(id)) {
      return Response.errorResponse(res, 400, 'A bad request was sent', 'enter a valid request');
    }
    const data = await RequestService.findRequest({ id });
    if (data === null) {
      return Response.notFoundError(res, 'enter a valid request');
    }
    const { user, status } = data.dataValues;
    if (user !== req.user.id) {
      return Response.authorizationError(res, "You don't have rights to edit this request");
    }
    if (status !== 'Pending') {
      return Response.authorizationError(
        res,
        "You can't edit a request that has either been rejected or Approved"
      );
    }
    next();
  }
}

export default Access;
