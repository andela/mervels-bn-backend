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
   * Get user by email if exists
   * @param {string} email
   * @return {object}
   */
  static async findUserByEmail(userEmail) {
    try {
      const user = await Users.findOne({ where: { userEmail } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by email if exists
   * @param {string} email
   * @return {object}
   */
  static async findUserByEmail(userEmail) {
    try {
      const user = await Users.findOne({ where: { userEmail } });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
