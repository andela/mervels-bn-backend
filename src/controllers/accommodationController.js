/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import AccommodationService from '../services/accommodationService';
import LikeService from '../services/likeService';
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
      const { name, locationId } = req.body;
      const accommodationExist = await AccommodationService.getAccommodation({
        name: name.toUpperCase(),
        locationId
      });
      if (accommodationExist) {
        return Response.errorResponse(
          res,
          409,
          'this accommodation already exist in this location',
          'conflict'
        );
      }
      req.body.name = req.body.name.toUpperCase().trim();
      req.body.description = req.body.description.trim();
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
      const { accommodationId, name } = req.body;
      const exist = await AccommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) {
        return Response.errorResponse(res, 404, 'error', 'Accommodation not found');
      }
      const roomExist = await AccommodationService.getRoom({
        name,
        accommodationId
      });
      if (roomExist) {
        return Response.errorResponse(
          res,
          409,
          'this room already exist in this accommodation',
          'conflict'
        );
      }
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
      const exist = await AccommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) return Response.errorResponse(res, 404, 'error', 'Accommodation not found');
      exist.dataValues.likes = exist.Likes.length;
      delete exist.dataValues.Likes;
      return Response.customResponse(res, 200, 'Accommodation fetched successfully', exist);
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
  async likeOrUnlike(req, res) {
    try {
      const exist = await AccommodationService.getAccommodation({
        id: req.params.accommodationId
      });
      if (!exist) return Response.errorResponse(res, 404, 'Enter a valid accommodation ID', 'Not found');
      const like = {
        user: req.user.id,
        accommodation: req.params.accommodationId
      };
      const alreadyLiked = await LikeService.checkLiked(like);
      if (!alreadyLiked) {
        await LikeService.like(like);
        return Response.customResponse(res, 200, `Successfully liked ${exist.name}`, 'liked');
      }
      await LikeService.unlike(like);
      return Response.customResponse(res, 200, `Successfully unliked ${exist.name}`, 'unliked');
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', 'Internal error');
    }
  }
}

export default new AccommodationController();
