/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import ChatService from '../services/chatService';
import Emitter from '../utils/eventEmitters/emitter';

/** Class representing comments controller. */
class ChatController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  async saveMessage(req, res, next) {
    try {
      const data = {
        userId: req.user.id,
        userName: `${req.user.firstName} ${req.user.lastName}`,
        message: req.body.message
      };
      const newMessage = await ChatService.saveMessage(data);
      await Emitter.emit('new chat', newMessage.dataValues);
      return Response.customResponse(res, 201, 'message added successfully', newMessage);
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
  async getMessages(req, res, next) {
    try {
      const message = await ChatService.getMessages();
      return Response.customResponse(res, 200, 'messages fetched successfully', {
        name: `${req.user.firstName} ${req.user.lastName}`,
        message
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ChatController();
