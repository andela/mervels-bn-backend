/* eslint-disable no-restricted-globals */
import Response from '../utils/response';
import RequestService from '../services/requestService';
import CommentService from '../services/commentService';
/** Class representing a UserRole. */
class Access {
  /**
   * Creates a new chek.
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next next task.
   * @returns {object} The User object.
   */
  static async travelAdmin(req, res, next) {
    const { userRoles } = req.user;
    if (userRoles !== 'Travel Administrator') {
      return Response.errorResponse(
        res,
        403,
        'You are not allowed to perform this task',
        'Authorization error'
      );
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
      return Response.errorResponse(res, 403, "You don't have rights to complete this operation");
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
    const request = await RequestService.findRequestByID(req.params.id);
    if (!request) {
      return Response.errorResponse(
        res,
        404,
        'Please use a valid request ID',
        'Invalid request ID'
      );
    }
    if (req.user.userRoles !== 'Manager' && req.user.id !== request.user) {
      return Response.errorResponse(
        res,
        403,
        "You don't have rights to complete this operation",
        'Access Denied'
      );
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
      return Response.errorResponse(
        res,
        404,
        'Please use a valid comment ID',
        'Invalid comment ID'
      );
    }
    if (req.user.id !== comment.user) {
      return Response.errorResponse(
        res,
        403,
        "You don't have rights to complete this operation",
        'Access Denied'
      );
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
      return Response.errorResponse(
        res,
        403,
        'You are not allowed to perform this task',
        'Authorization error'
      );
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
    const data = await RequestService.findRequestsById(id);
    if (data === null) {
      return Response.errorResponse(
        res,
        404,
        'Request not found',
        'enter a valid request',
        'enter a valid request'
      );
    }
    const { user, status } = data.dataValues;
    if (user !== req.user.id) {
      return Response.errorResponse(
        res,
        403,
        "You don't have rights to edit this request",
        'Insufficient Privileges'
      );
    }
    if (status !== 'Pending') {
      return Response.errorResponse(
        res,
        403,
        "You can't edit a request that has either been rejected or Approved"
      );
    }
    next();
  }
}

export default Access;
