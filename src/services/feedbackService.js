/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Feedbacks } = database;

/** Class representing a Feedback service */
class FeedbackService {
  /**
   * Creates a new feedback.
   * @param {object} feedback object.
   * @param {id} id feedback id.
   * @returns {object} The feedback object.
   */
  static async addFeeback(feedback) {
    try {
      return await Feedbacks.create(feedback);
    } catch (error) {
      throw error;
    }
  }
}
export default FeedbackService;
