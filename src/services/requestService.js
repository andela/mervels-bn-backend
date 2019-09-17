/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Requests } = database;
/** Class representing a Request services. */
class RequestService {
  /**
   * Get requests by user
   * @param {string} user to be checked against
   * @return {object} Oject of request if found
   */
  static async findRequestsByUser(user) {
    try {
      const requests = await Requests.findAll({
        where: { user },
        include: [
          {
            model: database.Accommodations,
            as: 'accommodations'
          }
        ]
      });

      return requests;
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
