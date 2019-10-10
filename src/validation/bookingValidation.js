/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import BookSchema from './schema/booking';
import Schema from './schema';
import validator from '../utils/validator';

/**
 * @class bookingValidation
 */
export default class bookingValidator {
  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async booking(req, res, next) {
    const schema = Joi.object().keys({
      ...BookSchema,
      id: Schema.id
    });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async cancel(req, res, next) {
    const schema = Joi.object().keys({
      id: Schema.id
    });
    validator(schema, req.params, res, next);
  }
}
