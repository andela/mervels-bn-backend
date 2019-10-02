/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Feedbacks, Ratings } = database;

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

  /**
   * Add or update Rating.
   * @param {object} rating object.
   * @param {id} id feedback id.
   * @returns {object} The feedback object.
   */
  static async updateOrCreate(data) {
    try {
      let rating = await this.getUserAccommodationRating(data.userId, data.accommodationId);

      if (rating === null) return await Ratings.create(data);

      rating = await Ratings.update({ rating: data.rating }, { where: { id: rating.id } });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get accommodation Rating by user.
   * @param {id} userId user id.
   * @param {id} accommodationId accommodation id.
   * @returns {object} The rating object.
   */
  static async getUserAccommodationRating(userId, accommodationId) {
    try {
      const rating = await Ratings.findOne({ where: { userId, accommodationId } });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get accommodation rating.
   * @param {id} accommodationId accommodationId .
   * @returns {object} The feedback object.
   */
  static async getAccommodationRating(accommodationId) {
    try {
      const accommRating = await Ratings.findAll({
        where: { accommodationId }
      });
      return accommRating;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete accommodation rating.
   * @param {id} ratingId ratingId .
   * @returns {object} The deleted object.
   */
  static async deleteRating(ratingId) {
    try {
      return await Ratings.destroy({ where: { id: ratingId } });
    } catch (error) {
      throw error;
    }
  }
}
export default FeedbackService;
