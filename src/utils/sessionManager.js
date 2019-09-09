import jwt from 'jsonwebtoken';

/** Class representing a password util. */
class SessionManager {
  /**
   * Generates a new password.
   * @param {object} data User details.
   * @returns {string} token.
   */
  static generateToken(data) {
    const token = jwt.sign(
      {
        id: data.id,
        email: data.userEmail,
        firstName: data.firstName,
        lastName: data.lastName
      },
      process.env.TOKEN
    );
    return token;
  }
}
export default SessionManager;
