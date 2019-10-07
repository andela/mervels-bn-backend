/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

/**
 * @class commentValidation
 */
export default class commentValidator {
  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async markAsRead(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.idOptional
      })
      .options({ allowUnknown: false });
    validator(schema, req.query, res, next);
  }
}
