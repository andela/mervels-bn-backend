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

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} requests
   */
  async markAsRead(req, res, next) {
    try {
      const param = req.query.id ? { id: req.query.id } : { userId: req.user.id };
      const data = await notificationService.markAsRead({ ...param, ...{ read: false } });
      let message = data > 1 ? 'Notifications' : 'Notification';
      message += ' successfully marked as read';
      if (data[0] === 0) message = 'No Notifications marked as read';
      return Response.customResponse(res, 200, message, `${data} marked as read`);
    } catch (error) {
      return next(error);
    }
  }
}
export default new Notifcations();
