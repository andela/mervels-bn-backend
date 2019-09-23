/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Response from '../utils/response';

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
    const comment = req.body;
    comment.request = req.params.id;
    const schema = Joi.object()
      .keys({
        request: Joi.number()
          .integer()
          .required()
          .error(() => 'Enter a valid comment ID')
      })
      .options({ allowUnknown: false });

    schema.validate(comment, (error) => {
      if (error) return Response.errorResponse(res, 422, 'Validation failed', error.details[0].message);
      next();
    });
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async addComment(req, res, next) {
    const comment = req.body;
    comment.request = req.params.id;
    const schema = Joi.object()
      .keys({
        comment: Joi.string()
          .trim()
          .required()
          .error(() => 'Enter a valid comment'),
        request: Joi.number()
          .integer()
          .required()
          .error(() => 'Enter a valid request ID')
      })
      .options({ allowUnknown: false });

    schema.validate(comment, (error) => {
      if (error) return Response.errorResponse(res, 422, 'Validation failed', error.details[0].message);
      next();
    });
  }

  /**
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async updateComment(req, res, next) {
    const comment = req.body;
    comment.id = req.params.id;
    const schema = Joi.object()
      .keys({
        comment: Joi.string()
          .trim()
          .required()
          .error(() => 'Enter a valid comment'),
        id: Joi.number()
          .integer()
          .required()
          .error(() => 'Enter a valid comment ID')
      })
      .options({ allowUnknown: false });

    schema.validate(comment, (error) => {
      if (error) return Response.errorResponse(res, 422, 'Validation failed', error.details[0].message);
      next();
    });
  }
}
