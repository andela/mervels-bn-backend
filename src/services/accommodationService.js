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
      return await Rooms.bulkCreate(room, { returning: true });
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
        group: ['Accommodations.id', 'Location.id', 'Ratings.id'],
        attributes: [
          'id',
          'name',
          'status',
          'imageUrl',
          'owner',
          'locationId',
          'description',
          'maplocations',
          [sequelize.fn('count', sequelize.col('Likes.accommodation')), 'likes'],
          [sequelize.fn('count', sequelize.col('Rooms.accommodationId')), 'rooms'],
          [sequelize.fn('AVG', sequelize.col('Ratings.rating')), 'averageRating'],
          [
            sequelize.fn(
              'concat',
              sequelize.col('Location.city'),
              ' ',
              sequelize.col('Location.country')
            ),
            'location'
          ]
        ],
        include: [
          {
            model: database.Locations,
            as: 'Location',
            attributes: [],
            duplicating: false
          },
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
          },
          {
            model: database.Ratings,
            as: 'Ratings',
            attributes: [],
            duplicating: false
          }
        ],
        raw: false
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
            model: database.Locations
          },
          {
            model: database.Like
          },
          {
            model: database.Feedbacks,
            include: [
              {
                model: database.Users,
                include: [
                  {
                    model: database.ProfilePictures
                  }
                ]
              }
            ]
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

  /**
   * fetches a room.
   * @returns {object} The User object.
   */
  static async getAllRoom() {
    try {
      return await Rooms.findAll();
    } catch (error) {
      throw error;
    }
  }

  /**
   * updates rooms
   * @param {Array} ids array of rooms.
   * @param {object} data array of rooms.
   * @returns {object} The User object.
   */
  static async updateRoom(ids, data) {
    try {
      return await Rooms.update(data, {
        returning: true,
        where: [
          {
            id: {
              [sequelize.Op.in]: ids
            }
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default AccommodationService;
