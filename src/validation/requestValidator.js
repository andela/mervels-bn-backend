/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import TripSchema from './schema/trip';
import validator from '../utils/validator';

/**
 * @class requestValidation
 */
export default class requestValidator {
  /**
   * validates stats data
   * @param {Object} req  request details.
   * @param {Object} res  re sponse details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async statistics(req, res, next) {
    const schema = Joi.object().keys({
      parameter: Joi.string()
        .trim()
        .valid('years', 'months', 'days', 'weeks')
        .required()
        .error(() => 'Parameter must be one of months,years,weeks,days'),
      value: Joi.number()
        .integer()
        .required()
        .error(() => 'value must be an integer')
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Validate one way trip
   * @param {Object} req  request details.
   * @param {Object} res  re sponse details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async oneWay(req, res, next) {
    const schema = Joi.object()
      .keys({
        ...TripSchema,
        passportName: Schema.passportName.required(),
        passportNumber: Schema.passportNumber.required(),
        gender: Schema.gender.required(),
        role: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async returnTrip(req, res, next) {
    const schema = Joi.object()
      .keys({
        ...TripSchema,
        returnDate: Schema.minDate,
        passportName: Schema.passportName.required(),
        passportNumber: Schema.passportNumber.required(),
        gender: Schema.gender,
        role: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
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
      ...TripSchema,
      returnDate: Schema.minDate,
      passportName: Schema.passportName.required(),
      passportNumber: Schema.passportNumber.required(),
      gender: Schema.gender,
      role: Schema.string
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates return trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async requestApproval(req, res, next) {
    const schema = Joi.object().keys({
      reason: Schema.stringLong,
      requestId: Schema.id
    });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * Validates edit trip entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async validateEditRequest(req, res, next) {
    const schema = Joi.object().keys({
      from: Schema.from,
      to: Schema.to,
      returnDate: Schema.minDate,
      reason: Schema.stringLongOptional,
      passportName: Schema.passportName.required(),
      passportNumber: Schema.passportNumber.required(),
      gender: Schema.gender.required()
    });
    validator(schema, req.body, res, next);
  }

  /**
   * Validates get request entries
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async validateGetRequest(req, res, next) {
    const schema = Joi.object().keys({
      id: Schema.number
    });
    validator(schema, { ...req.params }, res, next);
  }
}
