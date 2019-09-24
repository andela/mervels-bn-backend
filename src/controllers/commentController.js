/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import CommentService from '../services/commentService';

/** Class representing comments controller. */
class CommentController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response object
   */
  async addComment(req, res) {
    try {
      const comment = req.body;
      comment.user = req.user.id;
      const addedComment = await CommentService.addComment(comment);
      delete addedComment.dataValues.deleted;
      return Response.customResponse(res, 201, 'Comment added successfully', addedComment);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  /**
   * gets all comments by request
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response
   */
  async getCommentsByRequest(req, res) {
    try {
      const comments = await CommentService.getCommentsByRequest(req.params.id);
      return Response.customResponse(res, 200, 'Comments fetched successfully', comments);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  /**
   * updates a comment
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} response object.
   */
  async updateComment(req, res) {
    try {
      const { id } = req.params;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) return Response.errorResponse(res, 404, 'Error', 'Comment not found');
      const updatedComment = await CommentService.updateComment(id, req.body);
      return Response.customResponse(
        res,
        200,
        'Comment updated successfully',
        updatedComment[1][0]
      );
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  /**
   * updates a comment
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} response object.
   */
  async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const commentExists = await CommentService.getCommentById(id);
      if (!commentExists) return Response.errorResponse(res, 404, 'Error', 'Comment not found');
      await CommentService.deleteComment(id);
      return Response.customResponse(res, 200, 'Comment deleted successfully', 'deleted');
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }
}

export default new CommentController();
