import Response from "../utils/response";
/** Class representing accommodation controller. */
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
    if (userRoles !== "Travel Administrator") {
      return Response.errorResponse(
        res,
        403,
        "You are not allowed to perform this task",
        "Authorization error"
      );
    }
    next();
  }
}
export default Access;
