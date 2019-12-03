import requestNotification from './requestNotification';
import { newMessage, addOnline } from '../chat/index';

module.exports = () => {
  requestNotification.requestCreatedNotification();
  requestNotification.requestUpdated();
  requestNotification.newComment();
  requestNotification.requestEdited();
  newMessage();
  addOnline();
};
