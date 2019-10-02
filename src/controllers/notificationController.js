/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import notificationService from '../services/notificationService';
import Response from '../utils/response';
/** Class representing a password util. */
class Notifcations {
  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} requests
   */
  async getNotifications(req, res, next) {
    try {
      const data = await notificationService.getNotifications({ userId: req.user.id });
      return Response.customResponse(
        res,
        200,
        'Your Notifications have been retrieved successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }
}
export default new Notifcations();
