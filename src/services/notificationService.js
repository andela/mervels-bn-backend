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
   * @param {object} param notification
   * @returns {object} The notification object.
   */
  static async getNotifications(param) {
    const results = await Notifications.findAll({
      where: param,
      order: [['read', 'ASC'], ['createdAt', 'DESC']]
    });
    const unread = await Notifications.count({
      where: {
        ...param,
        read: false
      }
    });
    return {
      unread,
      notifications: results
    };
  }

  /**
   * Creates a new notification.
   * @param {object} param notification
   * @returns {object} The notification object.
   */
  static async markAsRead(param) {
    const deleted = await Notifications.update(
      { read: true },
      {
        where: param
      }
    );
    return deleted;
  }
}
export default NotificationService;
