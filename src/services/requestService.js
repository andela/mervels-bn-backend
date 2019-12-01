/* eslint-disable no-useless-catch */
import { Op } from 'sequelize';
import database from '../database/models';

const { Requests, AccommodationRequests, Rooms } = database;
/** Class representing a Request services. */
class RequestService {
  /**
   * Get requests by user
   * @param {string} params to be checked against
   * @return {object} Oject of request if found
   */
  static async findRequests(params) {
    try {
      const requests = await Requests.findAll({
        where: params,
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
   * Get requests by user
   * @param {string}  params be checked against
   * @return {object} Oject of request if found
   */
  static async findRequest(params) {
    try {
      const requests = await Requests.findOne({
        where: params,
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
   * @param {Array} acc to array of accomodations
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
  static async search(field) {
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
          where: [{ requestId: id }]
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

  /**
   * deletes the Request by ID.
   * @param {number} id The ID of the request.
   * @returns {object} The  object.
   */
  static async deleteRequest(id) {
    try {
      const deleted = await Requests.destroy({
        where: [{ id }]
      });
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  /**
   * deletes the Request by ID.
   * @param {number} id room id
   * @param {string} status The ID of the room.
   * @returns {object} The  object.
   */
  static async markRoomAsBooked(id, status) {
    try {
      return Rooms.update({ status }, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * deletes the Request by ID.
   * @param {number} id The ID of the room.
   * @param {string} booked is the status
   * @returns {object} The  object.
   */
  static async markRequestAsBooked(id, booked) {
    try {
      return Requests.update({ booked }, { where: { id } });
    } catch (error) {
      throw error;
    }
  }
}

export default RequestService;
