/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */

import Bookings from '../services/bookingServices';
import Response from '../utils/response';
import requestService from '../services/requestService';

/** Class representing room booking. */
class RoomBooking {
  /**
   * Creates a new accommodation.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation object
   */
  async bookRooms(req, res, next) {
    try {
      const books = [];
      for (let count = 0; count < req.body.rooms.length; count += 1) {
        books.push({
          requestId: req.params.id,
          roomId: req.body.rooms[count],
          checkIn: req.body.checkIn[count],
          checkOut: req.body.checkOut[count]
        });
      }

      // set the rooms to unAvailable
      // eslint-disable-next-line array-callback-return
      // Promise.all(
      //   books.map((book) => {
      //     requestService.markRoomAsBooked(book.roomId, 'Unavailable');
      //   })
      // );

      requestService.markRequestAsBooked(req.params.id, true);
      // set the request to booked

      const data = await Bookings.createBooking(books);
      return Response.customResponse(res, 200, 'you have booked succesfully', data);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Creates a new accommodation.
   * @param {object} req request
   * @param {object} res response
   * @param {object} next next
   * @returns {object} accommodation object
   */
  async cancelBooking(req, res, next) {
    try {
      const reqId = parseInt(req.params.id, 10);
      const request = await requestService.findRequest({ id: reqId });
      if (!request) {
        return Response.notFoundError(res, 'Request does not exist');
      }
      if (request.user !== req.user.id) {
        return Response.authorizationError(res, "You don't own this request");
      }
      requestService.updateRequest({ booked: false }, reqId);
      await Bookings.cancelBooking({ requestId: reqId });
      return Response.customResponse(res, 200, 'Booking cancelled succesfully');
    } catch (error) {
      return next(error);
    }
  }
}

export default new RoomBooking();
