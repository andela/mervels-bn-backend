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

  /**
   * Get requests by user
   * @param {string} id to be checked against
   * @return {object} Oject of request if found
   */
  static async findRequestByID(id) {
    try {
      const requests = await Requests.findOne({
        where: { id },
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

  /**
   * Get requests by user
   * @param {string} request to be created
   * @param {string} acc to array of accomodations
   * @return {object} Oject of request if found
   */
  static async addRequest(request, acc) {
    try {
      const newRequest = await Requests.create(request);
      await newRequest.addAccommodation(acc);

      return await Requests.findByPk(newRequest.id, {
        include: [
          {
            model: database.Accommodations,
            as: 'accommodations',
            attributes: ['id', 'name', 'status', 'imageUrl', 'locationId']
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
