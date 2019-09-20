import Response from '../utils/response';

/** Class representing accommodation controller. */
class Privilege {
  /**
   * Creates a new room.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  static travelAdmin(req, res, next) {
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
}
export default Privilege;
