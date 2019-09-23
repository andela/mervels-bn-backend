/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Response from '../utils/response';

const commonFields = {
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
  travelDate: Joi.array()
    .items(
      Joi.string()
        .trim()
        .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
        .required()
    )
    .single()
    .required()
    .min(1)
    .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
  reason: Joi.string()
    .trim()
    .required()
    .min(30)
    .error(() => 'Enter a decription not less than 30 characters'),
  accommodation: Joi.array()
    .items(
      Joi.string()
        .trim()
        .required()
    )
    .single()
    .required()
    .max(1)
    .error(() => 'Enter a Place of accomodation')
};

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
      ...commonFields
    });

    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async returnTrip(req, res, next) {
    const schema = Joi.object().keys({
      ...commonFields,
      returnDate: Joi.date()
        .min('now')
        .error(() => 'Enter date of return in yyyy-mm-dd format greater than date of travel')
    });
    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async multiCity(req, res, next) {
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
        .min(1)
        .error(() => 'Enter a single id of destination'),
      travelDate: Joi.array()
        .items(
          Joi.string()
            .trim()
            .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
            .required()
        )
        .single()
        .required()
        .min(1)
        .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
      returnDate: Joi.date()
        .min('now')
        .error(() => 'Enter date of return in yyyy-mm-dd format greater than date of travel'),
      reason: Joi.string()
        .trim()
        .required()
        .min(30)
        .error(() => 'Enter a decription not less than 30 characters'),
      accommodation: Joi.array()
        .items(
          Joi.string()
            .trim()
            .required()
        )
        .single()
        .required()
        .min(1)
        .error(() => 'Enter a single id of  Place of accomodation')
    });
    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async rejectRequest(req, res, next) {
    const schema = Joi.object().keys({
      reason: Joi.string()
        .min(20)
        .trim()
        .required()
        .error(() => 'reason is required and must be a string with more than 20 characters'),
      requestId: Joi.number()
        .integer()
        .min(0)
        .required()
        .error(() => 'requestId is required and must be an integer greater than zero')
    });
    schema.validate({ ...req.body, ...req.params }, (err) => {
      if (err) {
        return Response.errorResponse(res, 422, 'Validation failed', err.details[0].message);
      }
      next();
    });
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async acceptRequest(req, res, next) {
    const schema = Joi.object().keys({
      reason: Joi.string()
        .min(20)
        .trim()
        .optional()
        .error(() => 'reason must be a string with more than 20 characters'),
      requestId: Joi.number()
        .integer()
        .min(0)
        .optional()
        .error(() => 'requestId is required and must be an integer greater than zero')
    });
    schema.validate({ ...req.body, ...req.params }, (err) => {
      if (err) {
        return Response.errorResponse(res, 422, 'Validation failed', err.details[0].message);
      }
      next();
    });
  }
}
