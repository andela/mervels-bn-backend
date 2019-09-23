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
            as: 'accommodations',
            include: [
              {
                model: database.Locations
              }
            ]
          }
        ]
      });

      return requests;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by object defined
   * @param {object} request to be checked against
   * @return {object} Oject of request if found
   */
  static async findRequests(request) {
    try {
      const requests = await Requests.findOne({
        where: request
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
            attributes: ['id', 'name', 'status', 'imageUrl', 'locationId'],
            include: [
              {
                model: database.Locations
              }
            ]
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by field
   * @param {object} field to be search with
   * @return {object} Oject of request if found
   */
  static async findByField(field) {
    try {
      const result = await Requests.findAll({ where: field });

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by user
   * @param {string} requestId to be rejected
   * @param {string} status rejected or accepted
   * @return {object} Oject of request if found
   */
  static async rejectUpdateRequest(requestId, status) {
    try {
      const request = await Requests.update({ status }, { where: { id: requestId } });
      return request;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by user
   * @param {string} params to be created
   * @return {object} Oject of request if found
   */
  static async getRequest(params) {
    try {
      const request = await Requests.findOne({ where: { ...params } });
      return request;
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
