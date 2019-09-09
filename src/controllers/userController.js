/* eslint-disable class-methods-use-this */
import userService from '../services/userService';
import Password from '../utils/generatePassword';
import SessionManager from '../utils/sessionManager';
import Response from '../utils/response';

/** Class representing a password util. */
class Users {
  /**
   * Generates a new password.
   * @param {object} req  details.
   * @param {object} res  details.
   * @returns {object}.
   */
  async createUser(req, res) {
    const rawData = req.body;
    const details = await userService.findUserByEmail(rawData.userEmail);
    if (details) {
      return Response.customResponse(res, 409, 'user already exists');
    }
    // generate a hashed password
    const obj = new Password(rawData);
    const newPassword = await obj.encryptPassword();
    // update data
    rawData.userPassword = newPassword;

    const data = await userService.createUser(rawData);
    const token = await SessionManager.generateToken({
      id: rawData.id,
      email: rawData.userEmail,
      firstName: rawData.firstName,
      lastName: rawData.lastName,
      userRoles: rawData.userRoles
    });
    data.token = token;
    const dataResponse = {
      firstName: data.firstName,
      lastName: data.lastName,
      userEmail: data.userEmail,
      userRoles: data.userRoles,
      userToken: data.token
    };
    return Response.customResponse(res, 201, 'Account has been created successfully', dataResponse);
  }
}
export default Users;
