/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import location from '../services/locationService';
import Response from '../utils/response';
import accommodations from '../services/accommodationService';
/** Class representing accommodation controller. */
class Location {
  /**
   * checks if location is exisiting
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async validDate(req, res, next) {
    let realDates = [];
    const dates = Array.isArray(req.body.travelDate) === true ? req.body.travelDate : [req.body.travelDate];
    req.body.travelDate = dates;
    realDates = dates.map((date) => new Date(date));
    for (let date = 0; date < realDates.length - 1; date += 1) {
      if (realDates[date] > realDates[date + 1]) {
        return Response.errorResponse(
          res,
          409,
          'Travel Dates must be in ascending order',
          'Wrong Travel Dates'
        );
      }
    }

    const today = Date.now();
    if (realDates[0] < today) {
      return Response.errorResponse(
        res,
        400,
        'You can not enter a date from the past',
        'Data validation error'
      );
    }
    const returnDate = new Date(req.body.returnDate);
    if (realDates[realDates.length - 1] > returnDate) {
      return Response.errorResponse(
        res,
        409,
        'Return Date must be greater than travel date',
        'Wrong return Date'
      );
    }
    next();
  }

  /**
   * checks if location is exisiting
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async validLocation(req, res, next) {
    const toArray = Array.isArray(req.body.to) === true ? req.body.to : [req.body.to];
    req.body.to = toArray;
    const locations = [];
    const result = await location.all();
    for (let locale = 0; locale < toArray.length - 1; locale += 1) {
      if (toArray[locale] === toArray[locale + 1]) {
        return Response.errorResponse(res, 409, 'Enter a different next destination', 'Conflict');
      }
    }
    for (let x = 0; x < result.length; x += 1) {
      locations.push(result[x].id);
    }
    const notlocation = toArray.filter((loca) => !locations.includes(loca));
    if (notlocation.length > 0) {
      return Response.customResponse(res, 404, 'location doesnot exist');
    }
    next();
  }

  /**
   * Checks if accomodation is valid.
   * @param {object} req The first number.
   * @param {object} res The first number.
   * @param {object} next The first number.
   * @returns {object} The User object.
   */
  async validAccomodation(req, res, next) {
    const accomodations = [];
    const accArray = Array.isArray(req.body.accommodation) === true
      ? req.body.accommodation
      : [req.body.accommodation];
    req.body.accommodations = [];
    await Promise.all(
      accArray.map(async (elem) => {
        const accommodation = await accommodations.getAccommodation({ name: elem.toUpperCase() });
        if (!accommodation) {
          return Response.customResponse(res, 404, 'accommodation doesnot exist');
        }
        req.body.accommodations.push(accommodation.id);
        accomodations.push(accommodation);
      })
    );
    for (let x = 0; x < accomodations.length; x += 1) {
      if (accomodations[x].locationId !== req.body.to[x]) {
        return Response.customResponse(
          res,
          404,
          `accommodation "${accomodations[x].dataValues.name}" is not in specified location`
        );
      }
      if (accomodations[x].status !== 'Available') {
        return Response.customResponse(
          res,
          404,
          `accommodation "${accomodations[x].name}" is not available`
        );
      }
    }
    next();
  }
}
export default new Location();
