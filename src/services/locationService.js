/* eslint-disable no-useless-catch */
import database from '../database/models';

const { Locations } = database;

/** Class representing a Accommodation service */
class LocationService {
  /**
   * gets a location by id.
   * @param {object} id locatoin id.
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
