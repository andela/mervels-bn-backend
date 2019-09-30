/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import requestService from '../services/requestService';
import Response from '../utils/response';
import email from '../utils/mails/email';
import UserService from '../services/userService';
import UpdateEmail from '../utils/mails/update.email';
import ApprovalEmail from '../utils/mails/approval.email';
/** Class representing a password util. */
class Requests {
  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next middleware details
   * @return {function} requests
   */
  async trip(req, res, next) {
    const len = req.body.to.length;
    if (len !== req.body.accommodations.length || len !== req.body.travelDate.length) {
      return Response.errorResponse(
        res,
        400,
        '',
        'Book an accommodation for each location on a specific date'
      );
    }
    const request = await requestService.findRequest({
      from: req.body.from.toUpperCase(),
      travelDate: req.body.travelDate,
      user: req.user.id
    });
    if (request) {
      return Response.errorResponse(res, 400, 'Duplicate', 'Request already exists');
    }
    const oneway = {
      from: req.body.from.toUpperCase(),
      travelDate: req.body.travelDate,
      reason: req.body.reason.trim(),
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
      next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} requests
   */
  async getMyRequests(req, res, next) {
    try {
      const data = await requestService.findRequests({ user: req.user.id });
      return Response.customResponse(res, 200, 'Your requests were retrieved successfully', data);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} Get requests with pending status
   */
  async getPendingApprovals(req, res, next) {
    try {
      const field = { status: 'Pending' };
      const data = await requestService.findRequests(field);
      const message = data.length > 0 ? 'Requests retrieved ' : 'No request pending approval';
      delete data.accommodations;
      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} requests
   */
  async rejectRequest(req, res, next) {
    try {
      const { reason } = req.body;
      const manager = req.user;
      const { requestId } = req.params;
      const request = await requestService.findRequest({ id: requestId });
      if (!request) {
        return Response.errorResponse(res, 404, 'request not found', 'Not found');
      }
      const requesterId = request.user;
      if (request.status === 'Approved') {
        return Response.errorResponse(res, 409, 'Request already approved', 'conflict');
      }
      if (request.status === 'Rejected') {
        return Response.errorResponse(res, 409, 'Request already rejected', 'conflict');
      }
      const requester = await UserService.findUser({ id: requesterId });
      const data = await requestService.rejectUpdateRequest(requestId, 'Rejected');
      const header = email.header({
        from: manager.userEmail,
        to: requester.userEmail,
        subject: 'Request rejected'
      });
      const msg = ApprovalEmail.rejectAcceptRequestTemplate(reason, requester);
      await email.sendmail({ ...header, ...msg });
      return Response.customResponse(res, 200, 'Request rejected successfully', { requestId });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @return {function} requests
   */
  async acceptRequest(req, res, next) {
    try {
      const { reason } = req.body;
      const manager = req.user;
      const { requestId } = req.params;
      const request = await requestService.findRequest({ id: requestId });
      if (!request) {
        return Response.errorResponse(res, 404, 'request not found', 'Not found');
      }
      const requesterId = request.user;
      if (request.status === 'Approved') {
        return Response.errorResponse(res, 409, 'Request already accepted', 'conflict');
      }
      if (request.status === 'Rejected') {
        return Response.errorResponse(res, 409, 'Request already rejected', 'conflict');
      }
      const requester = await UserService.findUser({ id: requesterId });
      const data = await requestService.rejectUpdateRequest(requestId, 'Approved');
      const header = email.header({
        from: manager.userEmail,
        to: requester.userEmail,
        subject: 'Request approved'
      });
      const msg = ApprovalEmail.rejectAcceptRequestTemplate(
        'Your travel request has been approved. Have a good time',
        requester
      );
      await email.sendmail({ ...header, ...msg });
      return Response.customResponse(res, 200, 'Request approved successfully', { requestId });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} requests
   */
  async EditRequest(req, res) {
    try {
      const formatedData = {
        ...req.body,
        reason: req.body.reason.trim()
      };
      const { id } = req.params;
      if (
        formatedData.to.length !== formatedData.accommodations.length
        || formatedData.travelDate.length !== formatedData.to.length
      ) {
        return Response.errorResponse(
          res,
          400,
          'Unequal number of values in the request',
          'Bad Request'
        );
      }
      // update the object
      let data = await requestService.updateRequest(formatedData, id);
      const roleDetails = await UserService.findUser({ userRoles: 'Manager' });
      data = data.dataValues;
      data.manager = roleDetails.dataValues.userEmail;
      data.user = req.user.firstName;
      const header = email.header({
        to: roleDetails.dataValues.userEmail,
        subject: ' BareFoot Update Notification '
      });
      const msg = UpdateEmail.updateTemplate(data);
      const result = await email.sendmail({ ...header, ...msg });
      return Response.customResponse(res, 200, 'Update has been completed successfully', data);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }
}
export default new Requests();
