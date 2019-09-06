import jwt from 'jsonwebtoken';
import redis from 'redis';
import { promisify } from 'util';

const redisClient = redis.createClient();

const getAsync = promisify(redisClient.get).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);

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

  static async createSession(data) {
    const result = await this.verifyToken(data.userEmail);

    if (result !== null) {
      return result;
    }
    const token = this.generateToken(data);
    redisClient.set(data.userEmail, token);
    return token;
  }

  static async verifyToken(userEmail) {
    const result = await getAsync(userEmail);
    return result;
  }
}

export default SessionManager;
