/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import FeedbackService from '../services/feedbackService';
import AccommodationService from '../services/accommodationService';

/** Class representing comments controller. */
class FeedBackController {
  /**
   * Creates a new comment.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} response object
   */
  async addFeedBackController(req, res, next) {
    try {
      const rawData = req.body;

      rawData.accommodation = parseInt(req.params.id, 10);
      rawData.user = req.user.id;
      const details = await AccommodationService.getAccommodation({ id: rawData.accommodation });
      if (!details) {
        return Response.errorResponse(res, 404, "Accommodation doesn't exist", 'NOT FOUND');
      }
      const addedFeedback = await FeedbackService.addFeeback(rawData);
      return Response.customResponse(res, 201, 'Feedback added successfully', addedFeedback);
    } catch (error) {
      return next(error);
    }
  }
}

export default new FeedBackController();
