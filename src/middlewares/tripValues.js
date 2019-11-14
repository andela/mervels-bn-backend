/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import moment from 'moment';
import location from '../services/locationService';
import Response from '../utils/response';
import accommodations from '../services/accommodationService';
/** Class checking valid trip values. */
class TripValues {
  /**  checks if Dates make sense
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isValidDates(req, res, next) {
    const travelDates = req.body.to.map((trip) => trip.travelDate);
    if (moment().isAfter(travelDates[0]) === true) {
      return Response.badRequestError(res, 'Travel Dates must be greater than today');
    }
    if (req.body.returnDate !== undefined) {
      if (moment(travelDates[travelDates.length - 1]).isAfter(req.body.returnDate) === true) {
        return Response.badRequestError(res, 'Return Date must be greater than travel date');
      }
    }
    if (travelDates.length > 1) {
      for (let date = 0; date < travelDates.length - 1; date += 1) {
        if (moment(travelDates[date]).isAfter(travelDates[date + 1]) === true) {
          return Response.badRequestError(res, 'The following Travel Date must be greater');
        }
      }
    }
    req.body.travelDates = travelDates;
    next();
  }

  /**
   * checks if company works location
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isValidLocation(req, res, next) {
    const locations = req.body.to.map((trip) => trip.location);
    for (let count = 0; count < locations.length - 1; count += 1) {
      if (locations[count] === locations[count + 1]) {
        return Response.conflictError(res, 'Your next destination must be different');
      }
    }
    const existLocations = (await location.all()).map((l) => l.id);
    const notlocation = locations.filter((place) => !existLocations.includes(place));
    if (notlocation.length > 0) {
      return Response.notFoundError(res, 'Company doesnot Operate in location');
    }
    req.body.locations = locations;
    next();
  }

  /**
   * Checks if accomodation is valid and available.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async isValidAccomodation(req, res, next) {
    const accomodations = req.body.to.map((trip) => trip.accommodation);
    const accommodationObjects = [];
    req.body.accommodations = [];
    for (const name of accomodations) {
      const accommodation = await accommodations.getAccommodation({ name: name.toUpperCase() });
      if (!accommodation) {
        return Response.notFoundError(res, 'accommodation doesnot exist');
      }
      if (accommodation.status !== 'Available') {
        return Response.notFoundError(res, `"${accommodation.name}" is fully booked`);
      }
      req.body.accommodations.push(accommodation.id);
      accommodationObjects.push(accommodation);
    }
    for (let count = 0; count < accommodationObjects.length; count += 1) {
      if (accommodationObjects[count].locationId !== req.body.locations[count]) {
        return Response.notFoundError(
          res,
          `"${accommodationObjects[count].name}" is not in that location`
        );
      }
    }
    next();
  }
}
export default new TripValues();
