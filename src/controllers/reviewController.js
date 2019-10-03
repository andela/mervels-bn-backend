/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import ReviewService from '../services/reviewService';
import AccommodationService from '../services/accommodationService';
import Search from '../utils/search';
/** Class representing comments controller. */
class ReviewController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  async addedFeedback(req, res, next) {
    try {
      const rawData = req.body;

      rawData.accommodation = parseInt(req.params.id, 10);
      rawData.user = req.user.id;
      const details = await AccommodationService.getAccommodation({ id: rawData.accommodation });
      if (!details) {
        return Response.notFoundError(res, "Accommodation doesn't exist");
      }
      const addedFeedback = await ReviewService.addFeeback(rawData);
      return Response.customResponse(res, 201, 'Feedback added successfully', addedFeedback);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Rate a center.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  async rateCenter(req, res, next) {
    try {
      const accommodation = await AccommodationService.getAccommodation({ id: req.params.id });

      if (!accommodation) return Response.notFoundError(res, 'Accommodation not found');
      const currentDate = Search.formatDate(new Date());
      const accRequests = accommodation.requests.filter((el) => {
        if (el.status === 'Approved' && el.travelDate <= currentDate && el.user === req.user.id) {
          return el.dataValues;
        }
      });

      if (accRequests.length <= 0) return Response.authorizationError(res, "Can't rate center you have not stayed ");
      const data = {
        userId: req.user.id,
        accommodationId: req.params.id,
        rating: req.body.rating
      };

      const ratings = await ReviewService.updateOrCreate(data);
      return Response.customResponse(res, 201, 'Rating added successfully', data);
    } catch (error) {
      return next(error);
    }
  }

  getAccommodationRating(accommodation, userId) {
    const ratings = {};
    const accommodationRatings = accommodation.Ratings.map((el) => el.dataValues);
    ratings.averageRating = Search.computeAverage(accommodationRatings);
    const userRating = accommodationRatings.filter((el) => el.userId === userId);
    ratings.userRating = userRating.length > 0 ? userRating[0].rating : null;

    return ratings;
  }
}

export default new ReviewController();
