import { hash, genSalt, compareSync } from 'bcrypt';

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

  /**
   * radomn password generator.
   * @returns {function} newPassword.
   */
  static randomPassword() {
    const special = '!@#$%^&*()_+=<>';
    const rnum = Math.floor(Math.random() * special.length);
    const alphaNumeric = Math.random()
      .toString(36)
      .substring(2, 8)
      + Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
    const password = alphaNumeric.replace(alphaNumeric[rnum], special[rnum]);
    return password;
  }
}
export default Password;
