/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import AccommodationService from '../services/accommodationService';

/** Class representing accommodation controller. */
class RoomsController {
  /**
   * gets all accommodations
   * @param {object} _req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation
   */
  async getAllRooms(_req, res, next) {
    try {
      const rooms = await AccommodationService.getAllRoom();
      return Response.customResponse(res, 200, 'Rooms fetched successfully', rooms);
    } catch (error) {
      return next(error);
    }
  }
}
export default new RoomsController();
