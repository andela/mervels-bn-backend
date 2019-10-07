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
    this.job = cron.schedule(this.pattern, async () => {
      await chat.deleteMessages();
    });
  }
}
export default Schedule;
