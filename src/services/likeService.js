/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Like } = database;

/** Class representing a Comment service */
class LikeService {
  /**
   * Gets comment by id.
   * @param {object} like The id would be easier..
   * @returns {object} The comment object.
   */
  static async checkLiked(like) {
    try {
      return await Like.count({
        where: [like]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new comment.
   * @param {object} like The first number.
   * @returns {object} The User object.
   */
  static async like(like) {
    try {
      return await Like.create(like);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comment by id.
   * @param {object} like The id would be easier..
   * @returns {object} The comment object.
   */
  static async unlike(like) {
    try {
      return await Like.destroy({
        where: [like]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default LikeService;
