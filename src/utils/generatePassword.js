import { hash, genSalt, compareSync } from "bcrypt";

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

  /**
   * Encrypts the  password.
   * @param {string} password  details.
   * @param {string} hashedPassword  details.
   * @returns {function} newPassword.
   */
  static async checkPasswordMatch(password, hashedPassword) {
    return compareSync(password, hashedPassword);
  }
}
export default Password;
