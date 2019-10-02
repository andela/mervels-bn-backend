/* eslint-disable no-useless-catch */
import sequelize from 'sequelize';
import database from '../database/models';

const { Accommodations, Rooms } = database;

/** Class representing a Accommodation service */
class AccommodationService {
  /**
   * Creates a new accommodation.
   * @param {object} accommodation accommodation object.
   * @returns {object} The User object.
   */
  static async createAccommodation(accommodation) {
    try {
      return await Accommodations.create(accommodation);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new room.
   * @param {object} room The room object.
   * @returns {object} The room object.
   */
  static async createRoom(room) {
    try {
      return await Rooms.create(room);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates get all acoommodations.
   * @returns {object} The accommodation object.
   */
  static async getAllAccommodations() {
    try {
      return await Accommodations.findAll({
        subQuery: false,
        group: ['Accommodations.id'],
        attributes: [
          'id',
          'name',
          'status',
          'imageUrl',
          'locationId',
          [sequelize.fn('count', sequelize.col('Likes.accommodation')), 'likes'],
          [sequelize.fn('count', sequelize.col('Rooms.accommodationId')), 'rooms']
        ],
        include: [
          {
            model: database.Rooms,
            as: 'Rooms',
            attributes: [],
            duplicating: false
          },
          {
            model: database.Like,
            as: 'Likes',
            attributes: [],
            duplicating: false
          }
        ],
        raw: true
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * fetches accommodation.
   * @param {object} params object of options to find.
   * @returns {object} The User object.
   */
  static async getAccommodation(params) {
    try {
      return await Accommodations.findOne({
        where: [params],
        include: [
          {
            model: database.Rooms,
            as: 'Rooms'
          },
          {
            model: database.Like
          },
          {
            model: database.Feedbacks
          },
          {
            model: database.Requests,
            as: 'requests'
          },
          {
            model: database.Ratings
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * fetches a room.
   * @param {object} params object of options to get.
   * @returns {object} The User object.
   */
  static async getRoom(params) {
    try {
      return await Rooms.findOne({
        where: [params]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default AccommodationService;
