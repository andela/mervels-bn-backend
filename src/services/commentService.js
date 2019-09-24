/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Comment } = database;

/** Class representing a Comment service */
class CommentService {
  /**
   * Creates a new comment.
   * @param {object} comment The first number.
   * @returns {object} The User object.
   */
  static async addComment(comment) {
    try {
      return await Comment.create(comment);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comment by id.
   * @param {object} id The id would be easier..
   * @returns {object} The comment object.
   */
  static async getCommentById(id) {
    try {
      return await Comment.findOne({
        where: [
          {
            id,
            deleted: false
          }
        ],
        attributes: ['id', 'user', 'comment', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comments by request.
   * @param {object} request The id would be easier..
   * @returns {object} The comment object.
   */
  static async getCommentsByRequest(request) {
    try {
      return await Comment.findAll({
        where: [
          {
            request,
            deleted: false
          }
        ],
        order: [['createdAt', 'ASC']],
        attributes: ['id', 'user', 'comment', 'createdAt', 'updatedAt']
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comments by request.
   * @param {object} id The id of the comment
   * @param {object} comment The new comment
   * @returns {object} The response object.
   */
  static async updateComment(id, comment) {
    try {
      return await Comment.update(comment, {
        returning: true,
        where: [{ id }]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets comments by request.
   * @param {object} id The id of the comment
   * @param {object} comment The new comment
   * @returns {object} The response object.
   */
  static async deleteComment(id) {
    try {
      return await Comment.update(
        {
          deleted: true
        },
        {
          where: [{ id }]
        }
      );
    } catch (error) {
      throw error;
    }
  }
}
export default CommentService;
