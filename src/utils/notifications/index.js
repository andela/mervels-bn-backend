import requestNotification from './requestNotification';

module.exports = () => {
  requestNotification.requestCreatedNotification();
  requestNotification.requestUpdated();
  requestNotification.newComment();
  requestNotification.requestEdited();
};
