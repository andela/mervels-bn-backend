/* eslint-disable class-methods-use-this */
import emitter from '../eventEmitters/emitter';
import NotificationService from '../../services/notificationService';
import userService from '../../services/userService';
import app from '../../index';
import Emails from '../mails/email';
import RequestNotification from '../mails/requestNotification.email';

/** Class representing a Notifications . */
class Notifications {
  /**
   * @param {object} request
   * @return {function} create notifications
   */
  async makeNotification(request) {
    const manager = await userService.findUser({ userRoles: 'Manager' });
    const { firstName, lastName } = await userService.findUser({ id: request.user });
    return {
      id: manager.id,
      firstName,
      lastName,
      emailAllowed: manager.emailAllowed,
      userEmail: manager.userEmail,
      manager: manager.firstName
    };
  }

  /**
   * @return {function} create notifications
   */
  async requestCreatedNotification() {
    await emitter.on('request created', async (request) => {
      const {
        id,
        firstName,
        lastName,
        userEmail,
        emailAllowed,
        manager
      } = await this.makeNotification(request);
      const notificationMessage = `${firstName} ${lastName} requested a new trip`;
      const inAppNotification = await NotificationService.createNotification({
        notification: notificationMessage,
        userId: id,
        type: 'created',
        requestId: request.id
      });
      // in app socket.io notification
      app.io.emit('created', inAppNotification);
      // email nofitication
      if (emailAllowed) {
        const requestUrl = `https://${process.env.baseUrl}/api/v1/requests/${request.id}`;
        const msg = RequestNotification.requestCreated(requestUrl, manager, notificationMessage);
        const header = Emails.header({
          to: userEmail,
          subject: 'New travel request'
        });
        Emails.sendmail({ ...header, ...msg });
      }
    });
  }
}

export default new Notifications();
