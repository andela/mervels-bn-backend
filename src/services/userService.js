/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Users } = database;
/** Class representing a User services. */
class UserService {
  /**
   * Creates a new user.
   * @param {object} user The first number.
   * @returns {object} The User object.
   */
  static async createUser(user) {
    try {
      return await Users.create(user);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Counts the users with the same email.
   * @param {string} email The first number.
   * @returns {object} The instance object.
   */
  static async findUserByEmail(email) {
    try {
      return await Users.findOne({
        where: [{ userEmail: email }]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
