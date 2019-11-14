/* eslint-disable class-methods-use-this */
import cron from 'node-cron';
import chat from './chatService';

/** schedule class  */
class Schedule {
  /**
   * @param {string} pattern schedule time
   */
  constructor(pattern) {
    this.pattern = pattern;
  }

  /**
   *  deletes message from database
   * @returns {void}
   */
  deleteSchedule() {
    cron.schedule(this.pattern, this.callback);
  }

  /**
   *  deletes message from database
   * @returns {void}
   */
  async callback() {
    await chat.deleteMessages();
  }
}
export default Schedule;
