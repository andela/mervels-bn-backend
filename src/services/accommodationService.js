/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Accommodations, Rooms } = database;

/** Class representing a Accommodation service */
class AccommodationService {
  /**
   * Creates a new accommodation.
   * @param {object} accommodation The first number.
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
   * @param {object} room The first number.
   * @returns {object} The User object.
   */
  static async createRoom(room) {
    try {
      return await Rooms.create(room);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new room.
   * @param {object} room The first number.
   * @returns {object} The User object.
   */
  static async getAllAccommodations() {
    try {
      return await Accommodations.findAll({
        include: [
          {
            model: database.Rooms,
            as: 'Rooms'
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates a new room.
   * @param {object} id The first number.
   * @returns {object} The User object.
   */
  static async getAccommodationById(id) {
    try {
      return await Accommodations.findOne({
        where: [{ id }],
        include: [
          {
            model: database.Rooms,
            as: 'Rooms'
          }
        ]
      });
    } catch (error) {
      throw error;
    }
  }
}
export default AccommodationService;
