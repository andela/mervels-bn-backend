/* eslint-disable class-methods-use-this */
import userService from '../services/userService';
import Password from '../utils/generatePassword';
import SessionManager from '../utils/sessionManager';
import Response from '../utils/response';
import Emails from '../utils/email';
/** Class representing a password util. */
class Users {
  /**
   * Generates a new password.
   * @param {object} req .
   * @param {object} res .
   * @param {object} next  details.
   * @returns {object}.
   */
  async createUser(req, res, next) {
    const rawData = req.body;
    try {
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
      return Response.customResponse(
        res,
        201,
        'Account has been created successfully',
        dataResponse
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Generates a new password.
   * @param {object} req  details.
   * @param {object} res  details.
   * @returns {object}.
   */
  async socialLogin(req, res) {
    const userEmail = req.user.email;
    const { firstName, lastName } = req.user;
    const userRoles = 'Requester';
    let data;
    data = await userService.findUserByEmail(userEmail);
    if (!data) {
      data = await userService.createUser({
        userEmail,
        firstName,
        lastName,
        userRoles
      });
    }
    const token = await SessionManager.generateToken({
      id: data.id,
      email: data.userEmail,
      firstName: data.firstName,
      lastName: data.lastName,
      userRoles: data.userRoles
    });
    data.token = token;
    const dataResponse = {
      firstName: data.firstName,
      lastName: data.lastName,
      userEmail: data.userEmail,
      userRoles: data.userRoles,
      userToken: data.token
    };
    return Response.customResponse(res, 200, 'Successfully logged in!', dataResponse);
  }

  /**
   * Generates a new password.
   * @param {object} req  details.
   * @param {object} res  details.
   * @returns {object}.
   */
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

  /**
   * Sends reset password email
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  async requestPasswordReset(req, res, next) {
    const { email } = req.body;
    try {
      const userAccount = await userService.findUserByEmail(email);
      if (!userAccount) {
        return Response.customResponse(
          res,
          200,
          'If email is found, check your email for the link'
        );
      }
      const oneTimeToken = SessionManager.generateToken({
        id: userAccount.id,
        secret: `${userAccount.userPassword}-${userAccount.createdAt}`
      });
      const url = Emails.emailUrl({
        endpoint: 'resetPassword',
        userId: userAccount.id,
        token: oneTimeToken
      });
      const message = Emails.resetPasswordTemplate(url, {
        email: userAccount.userEmail,
        name: userAccount.firstName
      });
      const result = await Emails.sendmail(message);
      return Response.customResponse(
        res,
        200,
        'If email is found, check your email for the link',
        url
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * resets new password
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  async resetPassword(req, res, next) {
    const { password, newPassword } = req.body;
    const { userId, token } = req.params;
    const id = parseInt(userId, 10);
    try {
      const userAccount = await userService.findUserById(id);
      if (!userAccount) {
        return Response.customResponse(res, 403, 'Forbidden Request');
      }
      const userDetails = SessionManager.decodeToken({
        token,
        secret: `${userAccount.userPassword}-${userAccount.createdAt}`
      });
      if (password !== newPassword) {
        return Response.customResponse(res, 400, 'Passwords do not match re-type password');
      }
      const pass = new Password({ userPassword: password });
      const userPassword = await pass.encryptPassword();
      const updatedUser = await userService.updateUser(userDetails.id, { userPassword });
      return Response.customResponse(
        res,
        200,
        'Password has been sucessfully changed. Proceed to login'
      );
    } catch (error) {
      next(error);
    }
  }
}
export default new Users();
