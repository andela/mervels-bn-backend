import { hash, genSalt } from 'bcrypt';

/** Class representing a password util. */
class Password {
  /**
   * Generates a new password.
   * @param {object} data User details.
   * @returns {object} A new password.
   */
  constructor(data) {
    this.password = data.userPassword;
  }

  /**
   * Encrypts the  password.
   * @returns {string} newPassword.
   */
  async encryptPassword() {
    const salt = await (0, genSalt)(10);
    const newPassword = await hash(this.password, salt);
    return newPassword;
  }
}
export default Password;
