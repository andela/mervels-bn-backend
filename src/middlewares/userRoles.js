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
    if (!request) return Response.errorResponse(res, 404, 'Invalid request ID');
    if (req.user.userRoles !== 'Manager' && req.user.id !== request.user) {
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
  static async isCommentOwner(req, res, next) {
    const comment = await CommentService.getCommentById(req.params.id);
    if (!comment) return Response.errorResponse(res, 404, 'Invalid comment ID');
    if (req.user.id !== comment.user) {
      return Response.errorResponse(res, 403, "You don't have rights to complete this operation");
    }
    next();
  }
}

export default Access;
