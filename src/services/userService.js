/* eslint-disable no-useless-catch */
import database from '../database/models';
import UserProfile from './userProfileService';

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
      const createdUser = await Users.create(user);

      // Create User Profile
      await UserProfile.updateOrCreate(createdUser.id);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by email if exists
   * @param {string} param email to be checked against
   * @return {object} Oject of user if found
   */
  static async findUser(param) {
    try {
      const user = await Users.findOne({ where: param });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * change user password
   * @param {string} param parameters to be checked against
   * @param {Object} user what to be updated
   * @return {object} Oject of user if found
   */
  static async updateUser(param, user) {
    try {
      return await Users.update(user, {
        returning: true,
        where: [param]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
