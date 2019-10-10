/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import LocationService from '../services/locationService';

/** Class representing location controller. */
class AccommodationController {
  /**
   * gets all s
   * @param {object} _req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation
   */
  async getAllLocations(_req, res, next) {
    try {
      const locations = await LocationService.all();
      return Response.customResponse(res, 200, 'Locations fetched successfully', locations);
    } catch (error) {
      return next(error);
    }
  }
}

export default new AccommodationController();
