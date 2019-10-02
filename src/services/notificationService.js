/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Notifications } = database;

/** Class representing a Notification Service  */
class NotificationService {
  /**
   * Creates a new notification.
   * @param {object} notification notification
   * @returns {object} The notification object.
   */
  static async createNotification(notification) {
    const results = await Notifications.create(notification);
    return results;
  }

  /**
   * Creates a new notification.
   * @param {object} userId notification
   * @returns {object} The notification object.
   */
  static async getNotifications(userId) {
    const results = await Notifications.findAll({
      where: userId
    });
    return results;
  }
}
export default NotificationService;
