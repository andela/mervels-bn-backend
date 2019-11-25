/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import CommentService from '../services/commentService';
import UserService from '../services/userService';

/** Class representing comments controller. */
class CommentController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  async addComment(req, res, next) {
    try {
      const comment = req.body;
      comment.request = req.params.id;
      const requester = await UserService.findUser({ id: req.user.id });
      comment.user = req.user.id;
      const addedComment = await CommentService.addComment(comment);
      delete addedComment.dataValues.deleted;
      addedComment.user = { firstName: requester.firstName, lastName: requester.lastName };
      return Response.customResponse(res, 201, 'Comment added successfully', addedComment);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets all comments by request
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response
   */
  async getCommentsByRequest(req, res, next) {
    try {
      const comments = await CommentService.getCommentsByRequest(req.params.id);
      return Response.customResponse(res, 200, 'Comments fetched successfully', comments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * updates a comment
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next next
   * @returns {object} response object.
   */
  async updateComment(req, res, next) {
    try {
      const { id } = req.params;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) return Response.notFoundError(res, 'Comment not found');
      const updatedComment = await CommentService.updateComment(id, req.body);
      return Response.customResponse(
        res,
        200,
        'Comment updated successfully',
        updatedComment[1][0]
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * updates a comment
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next
   * @returns {object} response object.
   */
  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) return Response.notFoundError(res, 'Comment not found');
      await CommentService.deleteComment(id);
      return Response.customResponse(res, 200, 'Comment deleted successfully', 'deleted');
    } catch (error) {
      return next(error);
    }
  }
}

export default new CommentController();
