/* eslint-disable no-useless-catch */
import database from '../database/models';

const { chat } = database;
/** Class representing chat services. */
class chatService {
  /**
   * Creates a new message.
   * @param {object} message details of a message.
   * @returns {object} new message.
   */
  static async saveMessage(message) {
    try {
      return await chat.create(message);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all messages not deleted
   * @param {string} param email to be checked against
   * @return {object} Oject of user if found
   */
  static async getMessages() {
    try {
      return await chat.findAll({
        where: { deleted: false }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by email if exists
   * @param {string} param email to be checked against
   * @return {object} Oject of user if found
   */
  static async deleteMessages() {
    try {
      return await chat.update(
        {
          deleted: true
        },
        {
          where: { deleted: false }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default chatService;
