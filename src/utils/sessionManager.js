import jwt from 'jsonwebtoken';
import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient(process.env.REDIS_URL);

const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

redisClient
  .on('connect', () => {
    console.log('redis connected');
  })
  .on('error', (error) => {
    // console.log(error);
  });

/** Class representing a password util. */
class SessionManager {
  /**
   * Generates a jwt token
   * @param {object} data User details.
   * @returns {string} token.
   */
  static generateToken(data) {
    const token = jwt.sign(
      {
        id: data.id,
        userEmail: data.userEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        accountVerified: data.accountVerified
      },
      data.secret || process.env.TOKEN,
      { expiresIn: '1hr' }
    );
    return token;
  }

  /**
   * Creates a reddis session.
   * @param {object} data User details.
   * @returns {string} token.
   */
  static async createSession(data) {
    const result = await this.verifyToken(data.userEmail);

    if (result !== null) {
      return result;
    }
    const token = this.generateToken(data);
    redisClient.set(data.userEmail, token);
    return token;
  }

  /**
   * Checks if token is in use
   * @param {object} userEmail User details.
   * @returns {string} result.
   */
  static async verifyToken(userEmail) {
    const result = await getAsync(userEmail);
    return result;
  }

  /**
   * decodes a jwt token.
   * @param {object} data User details.
   * @returns {string} token.
   */
  static decodeToken(data) {
    // eslint-disable-next-line no-useless-catch
    try {
      return jwt.verify(data.token, data.secret || process.env.TOKEN);
    } catch (error) {
      throw error;
    }
  }

  static async destroyToken(user) {
    const result = await delAsync(user.userEmail);
    return result;
  }

  /**
   * Generates a new password.
   * @param {string} token User details.
   * @param {string} secret secret_key for token.
   * @returns {object} payload.
   */
  static verify(token) {
    return jwt.verify(token, process.env.TOKEN);
  }
}
export default SessionManager;
