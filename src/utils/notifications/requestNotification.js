/* eslint-disable class-methods-use-this */
import emitter from '../eventEmitters/emitter';
import NotificationService from '../../services/notificationService';
import userService from '../../services/userService';
import requestService from '../../services/requestService';
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
    const { id, firstName, lastName } = await userService.findUser({ id: request.user });
    return {
      id: manager.id,
      userId: id,
      firstName,
      lastName,
      emailAllowed: manager.emailAllowed,
      userEmail: manager.userEmail,
      manager: manager.firstName
    };
  }

  /**
   * sends notification
   * @param {string} notification message
   * @param {integer} userId owner of niotification
   * @param {string} type type of notification
   * @param {integer} requestId id of request
   * @return {function} create notifications
   */
  async notify(notification, userId, type, requestId) {
    const inAppNotification = await NotificationService.createNotification({
      notification,
      userId,
      type,
      requestId
    });
    // in app socket.io notification
    app.io.emit('created', inAppNotification);
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
      this.notify(notificationMessage, id, 'created', request.id);
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

  /**
   * works for both approve and reject
   * @return {function} create notifications
   */
  async requestUpdated() {
    await emitter.on('request update', async (request) => {
      const { userId } = await this.makeNotification(request);
      if (request.status !== 'Pending') {
        const notificationMessage = `Your Request has been ${request.status.toLowerCase()}`;
        this.notify(notificationMessage, userId, 'updated', request.id);
      }
    });
  }

  /**
   * works for both approve and reject
   * @return {function} create notifications
   */
  async newComment() {
    await emitter.on('new comment', async (comment) => {
      const commentOwner = await userService.findUser({ id: comment.user });
      const request = await requestService.findRequest({ id: comment.request });
      const requestOwner = await userService.findUser({ id: request.user });
      const manager = await userService.findUser({ userRoles: 'Manager' });
      let sendTo;
      let notificationMessage;
      if (commentOwner.id !== requestOwner.id) {
        notificationMessage = 'The manager commented on your travel request';
        sendTo = requestOwner;
      } else {
        notificationMessage = `${requestOwner.firstName} ${requestOwner.lastName} commented on their travel request`;
        sendTo = manager;
      }
      this.notify(notificationMessage, sendTo.id, 'comment', comment.request);
      if (sendTo.emailAllowed) {
        const requestUrl = `https://${process.env.baseUrl}/api/v1/requests/${request.id}`;
        const msg = RequestNotification.requestCreated(
          requestUrl,
          sendTo.firstName,
          notificationMessage
        );
        const header = Emails.header({
          to: sendTo.userEmail,
          subject: 'New travel request comment'
        });
        Emails.sendmail({ ...header, ...msg });
      }
    });
  }
}

export default new Notifications();
