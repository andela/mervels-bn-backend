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
      return Response.errorResponse(res, 409, 'user already exists');
    }
    // generate a hashed password
    const obj = new Password(rawData);
    const newPassword = await obj.encryptPassword();
    // update data
    rawData.userPassword = newPassword;

    const data = await userService.createUser(rawData);
    const token = await SessionManager.createSession({
      id: rawData.id,
      userEmail: rawData.userEmail,
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

  async logIn(req, res) {
    try {
      const { userEmail, userPassword } = req.body;
      const userExists = await userService.findUserByEmail(userEmail);

      if (!userExists) {
        return Response.errorResponse(res, 401, 'Invalid email or password entered');
      }
      const user = userExists.dataValues;

      const match = await Password.checkPasswordMatch(userPassword, user.userPassword);
      if (!match) {
        return Response.errorResponse(res, 401, 'Invalid emailor password entered');
      }

      user.userToken = await SessionManager.createSession(user);
      delete user.userPassword;

      return Response.customResponse(res, 200, 'User signed In successfully', user);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }
}
export default new Users();
