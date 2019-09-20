/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';

/**
 * @class requestValidation
 */
export default class requestValidator {
  /**
   * resets new password
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async oneWay(req, res, next) {
    const schema = Joi.object().keys({
      from: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .required()
        .min(2)
        .error(() => 'Enter place of departure, "from" in City, Country format'),
      to: Joi.array()
        .items(
          Joi.number()
            .integer()
            .required()
        )
        .single()
        .required()
        .max(1)
        .error(() => 'Enter a single id of destination'),
      travelDate: Joi.date()
        .min('now')
        .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
      reason: Joi.string()
        .trim()
        .required()
        .min(30)
        .error(() => 'Enter a decription not less than 30 characters'),
      accommodation: Joi.array()
        .items(
          Joi.number()
            .integer()
            .required()
        )
        .single()
        .required()
        .max(1)
        .error(() => 'Enter a single id of  Place of accomodation')
    });

    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  }
}
