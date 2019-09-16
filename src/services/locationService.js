/* eslint-disable no-useless-catch */
import database from "../database/models";

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
}
export default LocationService;
