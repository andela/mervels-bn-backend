/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Locations } = database;

/** Class representing a Accommodation service */
class LocationService {
  /**
   * Creates a new accommodation.
   * @param {object} id The first number.
   * @returns {object} The User object.
   */
  static async getLocationById(id) {
    return await Locations.findOne({ where: [{ id }] });
  }

  /**
   * Returns all locations
   * @returns {object} all locations.
   */
  static async all() {
    const result = await Locations.findAll();
    return result;
  }
}
export default LocationService;
