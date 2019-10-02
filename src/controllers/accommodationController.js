/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import moment from 'moment';
import { Op } from 'sequelize';
import Response from '../utils/response';
import AccommodationService from '../services/accommodationService';
import LikeService from '../services/likeService';
import LocationService from '../services/locationService';
import requestService from '../services/requestService';
import uploader from '../utils/cloudinary';
import reviewController from './reviewController';

/** Class representing accommodation controller. */
class AccommodationController {
  /**
   * Creates a new accommodation.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation object
   */
  async createAccommodation(req, res, next) {
    if (req.files) {
      const { image } = req.files;
      const cloudFile = await uploader(image.tempFilePath);
      req.body.imageUrl = cloudFile.url;
    }
    try {
      // check if the location is available
      const location = await LocationService.getLocationById(req.body.locationId);
      if (!location) {
        return Response.notFoundError(res, 'Location not found');
      }
      const { name, locationId } = req.body;
      const accommodationExist = await AccommodationService.getAccommodation({
        name: name.toUpperCase(),
        locationId
      });
      if (accommodationExist) {
        return Response.conflictError(res, 'this accommodation already exist in this location');
      }
      req.body.name = req.body.name.toUpperCase();
      const accommodation = await AccommodationService.createAccommodation(req.body);
      return Response.customResponse(res, 201, 'Accommodation created successfully', accommodation);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Creates a new room.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation object
   */
  async createRoom(req, res, next) {
    try {
      const { accommodationId, name } = req.body;
      const exist = await AccommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) {
        return Response.notFoundError(res, 'Accommodation not found');
      }
      const roomExist = await AccommodationService.getRoom({
        name,
        accommodationId
      });
      if (roomExist) {
        return Response.conflictError(res, 'this room already exist in this accommodation');
      }
      const room = await AccommodationService.createRoom(req.body);
      return Response.customResponse(res, 201, 'Room created successfully', room);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets all accommodations
   * @param {object} _req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation
   */
  async getAllAccommodations(_req, res, next) {
    try {
      const accommodations = await AccommodationService.getAllAccommodations();
      return Response.customResponse(
        res,
        200,
        'Accommodations fetched successfully',
        accommodations
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets one accommodation
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next next
   * @returns {object} accommodation.
   */
  async getAccommodationById(req, res, next) {
    try {
      const { accommodationId } = req.params;
      const exist = await AccommodationService.getAccommodation({
        id: accommodationId
      });
      if (!exist) return Response.notFoundError(res, 'Accommodation not found');
      exist.dataValues.likes = exist.Likes.length;
      delete exist.dataValues.Likes;

      exist.dataValues.Ratings = reviewController.getAccommodationRating(exist, req.user.id);
      delete exist.dataValues.requests;

      return Response.customResponse(res, 200, 'Accommodation fetched successfully', exist);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets one accommodation
   * @param {object} req request.
   * @param {object} res response.
   * @param {object} next response.
   * @returns {object} accommodation.
   */
  async likeOrUnlike(req, res, next) {
    try {
      const exist = await AccommodationService.getAccommodation({
        id: req.params.accommodationId
      });
      if (!exist) return Response.notFoundError(res, 'Enter a valid accommodation ID');
      const like = {
        user: req.user.id,
        accommodation: req.params.accommodationId
      };
      const alreadyLiked = await LikeService.countLikes(like);
      const likes = await LikeService.countLikes({ accommodation: req.params.accommodationId });
      if (!alreadyLiked) {
        await LikeService.like(like);
        return Response.customResponse(res, 200, `Successfully liked ${exist.name}`, {
          likes: likes + 1
        });
      }
      await LikeService.unlike(like);
      return Response.customResponse(res, 200, `Successfully unliked ${exist.name}`, {
        likes: likes - 1
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets all accommodations
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation
   */
  async getMostTravelledDestination(req, res, next) {
    try {
      const final = [];
      let data = [];
      const requests = await requestService.findRequests({
        status: 'Approved',
        travelDate: {
          [Op.lt]: [moment().format('YYYY-MM-DD')]
        }
      });

      const accommodationRequest = requests.map((elem) => elem.accommodations);
      for (let i = 0; i < accommodationRequest.length; i += 1) {
        data = data.concat(accommodationRequest[i]);
      }
      if (data.length === 0) {
        return Response.customResponse(res, 200, 'There are currently no past travels', {
          data: final,
          count: 0
        });
      }
      const counter = {};
      let maxCount = 1;
      let mostTravelled = [];

      for (let i = 0; i < data.length; i += 1) {
        const el = data[i].name;
        if (counter[el] === undefined) {
          counter[el] = 1;
        } else {
          counter[el] += 1;
        }
        if (counter[el] > maxCount) {
          mostTravelled = [el];
          maxCount = counter[el];
        } else if (counter[el] === maxCount) {
          mostTravelled.push(el);
          maxCount = counter[el];
        }
      }
      await Promise.all(
        mostTravelled.map(async (elem) => {
          const accommodation = await AccommodationService.getAccommodation({
            name: elem.toUpperCase()
          });
          final.push(accommodation);
        })
      );
      return Response.customResponse(res, 200, 'Your request was successful', {
        data: final,
        count: maxCount
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new AccommodationController();
