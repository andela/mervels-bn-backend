/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/**
 * @class chatValidation
 */
export default class chatValidator {
  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async message(req, res, next) {
    const schema = Joi.object()
      .keys({
        message: Schema.string
      })
      .options({ allowUnknown: false });
    validator(schema, req.body, res, next);
  }
}
