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
  static async getComments(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, req.params, res, next);
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async addComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        comment: Schema.string,
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async updateComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        comment: Schema.string,
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, { ...req.body, ...req.params }, res, next);
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async deleteComment(req, res, next) {
    const schema = Joi.object()
      .keys({
        id: Schema.id
      })
      .options({ allowUnknown: false });
    validator(schema, req.params, res, next);
  }
}
