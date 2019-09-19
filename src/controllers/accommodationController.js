/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import AccommodationService from '../services/accommodationService';
import LocationService from '../services/locationService';
import uploader from '../utils/cloudinary';

/** Class representing accommodation controller. */
class AccommodationController {
  /**
   * Creates a new accommodation.
   * @param {object} req request
   * @param {object} res response
   * @returns {object} accommodation object
   */
  async createAccommodation(req, res) {
    if (req.files) {
      const { image } = req.files;
      const cloudFile = await uploader(image.tempFilePath);
      req.body.imageUrl = cloudFile.url;
    }
    try {
      // check if the location is available
      const location = await LocationService.getLocationById(req.body.locationId);
      if (!location) {
        return Response.errorResponse(res, 404, 'Location not found', 'error');
      }
      const accommodation = await AccommodationService.createAccommodation(req.body);
      return Response.customResponse(res, 201, 'Accommodation created successfully', accommodation);
    } catch (error) {
      return Response.errorResponse(res, 500, 'something went wrong', 'internal error');
    }
  }

  /**
   * Creates a new room.
   * @param {object} req request
   * @param {object} res response
   * @returns {object} accommodation object
   */
  async createRoom(req, res) {
    try {
      const { accommodationId } = req.body;
      const exist = await AccommodationService.getAccommodationById(accommodationId);
      if (!exist) return Response.errorResponse(res, 404, 'error', 'Accommodation not found');
      const room = await AccommodationService.createRoom(req.body);
      return Response.customResponse(res, 201, 'Room created successfully', room);
    } catch (error) {
      return Response.errorResponse(res, 500, 'something went wrong', 'internal error');
    }
  }

  /**
   * gets all accommodations
   * @param {object} _req request
   * @param {object} res response
   * @returns {object} accommodation
   */
  async getAllAccommodations(_req, res) {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();
      return Response.customResponse(
        res,
        200,
        'Accommodations fetched successfully',
        accommodations
      );
    } catch (error) {
      return Response.errorResponse(res, 500, 'something went wrong', 'internal error');
    }
  }

  /**
   * gets one accommodation
   * @param {object} req request.
   * @param {object} res response.
   * @returns {object} accommodation.
   */
  async getAccommodationById(req, res) {
    try {
      const { accommodationId } = req.params;
      const exist = await AccommodationService.getAccommodationById(accommodationId);
      if (!exist) return Response.errorResponse(res, 404, 'error', 'Accommodation not found');
      return Response.customResponse(res, 200, 'Accommodation fetched successfully', exist);
    } catch (error) {
      return Response.errorResponse(res, 500, 'something went wrong', 'internal error');
    }
  }
}

export default new AccommodationController();
