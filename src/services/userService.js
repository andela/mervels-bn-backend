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
   * @param {string} userEmail email to be checked against
   * @return {object} Oject of user if found
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
   * Get user by id if exists
   * @param {string} id id to be checked against
   * @return {object} Oject of user if found
   */
  static async findUserById(id) {
    try {
      const user = await Users.findOne({ where: { id } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by id if exists
   * @param {string} userRole role to be checked against
   * @return {object} Oject of user if found
   */
  static async findUserByRole(userRole) {
    try {
      const user = await Users.findOne({ where: { userRoles: userRole } });

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * change user password
   * @param {string} id id to be checked against
   * @param {Object} user what to be updated
   * @return {object} Oject of user if found
   */
  static async updateUser(id, user) {
    try {
      return await Users.update(user, {
        returning: true,
        where: [{ id }]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * gets the user with the provided email.
   * @param {string} email The first number.
   * @returns {object} The  object.
   */
  static async verifyEmail(email) {
    const result = await Users.update({ accountVerified: true }, { where: [{ userEmail: email }] });
    return result;
  }

  /**
   * gets the user with the provided email.
   * @param {string} email The email.
   * @param {string} userRole The userRole
   * @returns {object} The  object.
   */
  static async updateRole(email, userRole) {
    const result = await Users.update({ userRoles: userRole }, { where: [{ userEmail: email }] });
    return result;
  }
}

export default UserService;
