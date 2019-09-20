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
  async validLocation(req, res, next) {
    const toArray = Array.isArray(req.body.to) === true ? req.body.to : [req.body.to];
    req.body.to = toArray;
    const locations = [];
    const result = await location.all();
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
    req.body.accommodations = accArray;
    await Promise.all(
      accArray.map(async (elem) => {
        const contents = await accommodations.getAccommodation({ id: elem });
        if (!contents) {
          return Response.customResponse(res, 404, 'accommodation doesnot exist');
        }
        accomodations.push(contents);
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
