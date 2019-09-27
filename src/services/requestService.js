/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Requests, AccommodationRequests } = database;
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
      const result = await Requests.findAll({
        where: field,
        include: [
          { model: database.Users, as: 'requester', attributes: ['firstName', 'lastName'] },
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get requests by id
   * @param {string} id to be created
   * @return {object} Oject of request if found
   */
  static async findRequestsById(id) {
    try {
      const requests = await Requests.findOne({
        where: { id }
      });

      return requests;
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

  /**
   * gets the Request by ID.
   * @param {string} data The request object.
   * @param {number} id The ID of the request.
   * @returns {object} The  object.
   */
  static async updateRequest(data, id) {
    try {
      const result = await Requests.update(
        { ...data },
        {
          where: { id },
          returning: true
        }
      );
      if ('accommodations' in data || 'to' in data) {
        await AccommodationRequests.destroy({
          where: [{ requestId: 1 }]
        });
        const accommodations = [];
        data.accommodations.map(async (elem) => {
          const accommodation = {
            requestId: result[1][0].dataValues.id,
            accommodationId: elem
          };
          accommodations.push(accommodation);
        });
        await AccommodationRequests.bulkCreate(accommodations);
        return await Requests.findByPk(result[1][0].dataValues.id, {
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
      }
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
