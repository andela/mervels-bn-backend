/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import moment from 'moment';
import Response from '../utils/response';
import accommodations from '../services/accommodationService';
import Requests from '../services/requestService';
import Bookings from '../services/bookingServices';
/** Class checking valid booking values. */
class ValidBooking {
  /**  checks if User wants to change accommodation.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isRequestValid(req, res, next) {
    const reqId = parseInt(req.params.id, 10);
    const request = await Requests.findRequest({ id: reqId });
    if (!request) {
      return Response.notFoundError(res, 'Request does not exist');
    }
    if (request.user !== req.user.id) {
      return Response.authorizationError(res, 'You dont own this request');
    }
    if (request.status !== 'Approved') {
      return Response.badRequestError(res, 'Request is not Approved');
    }
    const booked = await Bookings.getBooking({ requestId: reqId });
    if (booked) {
      return Response.conflictError(
        res,
        `You booked room ${booked.roomId} between ${booked.checkIn} & ${booked.checkOut} already`
      );
    }
    req.body.travelDates = request.travelDate;
    req.body.returnDate = request.returnDate;
    req.body.locationIds = request.accommodations.map((place) => place.locationId);
    req.body.accommodations = request.accommodations.map((place) => place.id);
    next();
  }

  /**  checks if User wants to change accommodation.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isAccommodationInLocation(req, res, next) {
    const newAccomodationObjs = [];
    const newAccommodations = req.body.booking.map((hotel) => hotel.accommodation);
    if (newAccommodations[0] !== undefined) {
      req.body.accommodations = [];
      for (const name of newAccommodations) {
        const accommodation = await accommodations.getAccommodation({ name: name.toUpperCase() });
        if (!accommodation) {
          return Response.notFoundError(res, 'accommodation doesnot exist');
        }
        if (accommodation.status !== 'Available') {
          return Response.badRequestError(res, `"${accommodation.name}" is fully booked`);
        }
        req.body.accommodations.push(accommodation.id);
        newAccomodationObjs.push(accommodation);
      }
      for (let count = 0; count < newAccomodationObjs.length; count += 1) {
        if (newAccomodationObjs[count].locationId !== req.body.locationIds[count]) {
          return Response.notFoundError(
            res,
            `"${newAccomodationObjs[count].name}" is not in that location`
          );
        }
      }
    }
    next();
  }

  /**  checks if room is in accommodation and available.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isValidRoom(req, res, next) {
    const rooms = req.body.booking.map((book) => book.room);
    if (req.body.accommodations.length !== rooms.length) {
      return Response.badRequestError(res, 'Book one room for each accommodation');
    }
    const roomObject = [];
    for (const id of rooms) {
      const room = await accommodations.getRoom({ id });
      if (!room) {
        return Response.notFoundError(res, `"room ${id}" doesnot exist`);
      }
      if (room.status !== 'Available') {
        return Response.conflictError(res, `"room ${id}" is booked`);
      }
      roomObject.push(room);
    }
    for (let num = 0; num < roomObject.length; num += 1) {
      if (roomObject[num].accommodationId !== req.body.accommodations[num]) {
        return Response.notFoundError(res, `"${roomObject[num].id}" is not in the accomodation`);
      }
    }
    req.body.rooms = rooms;
    next();
  }

  /**  checks if checkin date and checkout date dont collide
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async validCheckInOut(req, res, next) {
    const checkIns = req.body.booking.map((book) => book.checkIn);
    const checkOuts = req.body.booking.map((book) => book.checkOut);
    if (moment(req.body.travelDates[0]).isAfter(checkIns[0]) === true) {
      return Response.badRequestError(res, 'Checkin date must be after travel date');
    }
    if (
      req.body.returnDate !== undefined
      && moment(checkOuts[checkOuts.length - 1]).isAfter(req.body.returnDate) === true
    ) {
      return Response.badRequestError(res, 'Your last check out is past your return date');
    }
    for (let num = 0; num < checkIns.length; num += 1) {
      const checkin = moment(checkIns[num], 'YYYY-MM-DD');
      const traveldate = moment(req.body.travelDates[num], 'YYYY-MM-DD');
      if (checkin.diff(traveldate, 'days') > 2) {
        return Response.badRequestError(
          res,
          'Your must checkin with in two days after your traveldate'
        );
      }
      if (moment(checkOuts[num]).isSameOrBefore(checkIns[num]) === true) {
        return Response.badRequestError(
          res,
          `Your ${checkOuts[num]} checkout date must be greater than checkin date`
        );
      }
      if (
        moment(checkOuts[num]).isSameOrAfter(req.body.travelDates[num + 1]) === true
        && req.body.travelDates[num + 1] !== undefined
      ) {
        return Response.badRequestError(
          res,
          `Your ${checkOuts[num]} checkout date is past with your next travel date`
        );
      }
      if (
        moment(checkIns[num + 1]).isSameOrBefore(checkIns[num]) === true
        && checkIns[num + 1] !== undefined
      ) {
        return Response.badRequestError(res, 'Your next checkin date must be greater');
      }
    }
    req.body.checkIn = checkIns;
    req.body.checkOut = checkOuts;
    next();
  }

  /**  checks if room is available
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isRoomFree(req, res, next) {
    const checkOuts = req.body.checkOut;
    const checkIns = req.body.checkIn;
    let i = 0;
    for (const id of req.body.rooms) {
      const booking = await Bookings.getBookings({ roomId: id });
      const booked = booking.filter(
        (book) => (moment(checkIns[i]).isSameOrAfter(book.checkIn)
            && moment(checkIns[i]).isSameOrBefore(book.checkOut))
          || (moment(checkOuts[i]).isSameOrAfter(book.checkIn)
            && moment(checkOuts[i]).isSameOrBefore(book.checkOut))
      );
      if (booked.length > 0) {
        return Response.conflictError(
          res,
          `room ${id} is booked between ${booked[0].checkIn} & ${booked[0].checkOut}`
        );
      }
      i += 1;
    }
    next();
  }
}
export default new ValidBooking();
