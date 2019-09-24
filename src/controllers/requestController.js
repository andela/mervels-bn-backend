/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import requestService from '../services/requestService';
import Response from '../utils/response';

/** Class representing a password util. */
class Requests {
  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next middleware details
   * @return {function} requests
   */
  async trip(req, res, next) {
    const oneway = {
      from: req.body.from,
      travelDate: req.body.travelDate,
      reason: req.body.reason,
      user: req.user.id
    };
    const bothRequests = {
      ...oneway,
      returnDate: req.body.returnDate
    };
    try {
      const result = await requestService.addRequest(bothRequests, req.body.accommodations);
      return Response.customResponse(
        res,
        200,
        'Your request has been forwarded successfully',
        result
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} requests
   */
  async getMyRequests(req, res) {
    try {
      const data = await requestService.findRequestsByUser(req.user.id);
      return Response.customResponse(res, 200, 'Your requests were retrieved successfully', data);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} Get requests with pending status
   */
  async getPendingApprovals(req, res) {
    try {
      const field = { status: 'Pending' };
      const data = await requestService.findByField(field);
      const message = data.length > 0 ? 'Requests retrieved ' : 'No request pending approval';

      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }
}
export default new Requests();
