/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Joi from '@hapi/joi';
import Response from '../utils/response';

/**
 * @class accommodationValidator
 */
export default class accommodationValidator {
  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateCreateAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(2)
        .trim()
        .required()
        .error(() => 'name field is required and must be a string'),
      locationId: Joi.number()
        .min(0)
        .required()
        .error(() => 'location is required and must be a number greater than zero'),
      services: Joi.array()
        .items(Joi.string().trim())
        .single()
        .error(() => 'pass in an array of services must be strings'),
      amenities: Joi.array()
        .items(Joi.string().trim())
        .single()
        .error(() => 'pass in an array of amenities must be strings'),
      description: Joi.string()
        .min(20)
        .trim()
        .error(() => 'Description should be a sentnce of not less than 20 characters'),
      image: Joi.string()
        .trim()
        .error(() => 'image url should be type string')
    });
    schema.validate(req.body, (error) => {
      if (error) return Response.errorResponse(res, 422, 'validations failed', error.details);
      next();
    });
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateCreateRoom(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .min(2)
        .trim()
        .required()
        .error(() => 'name field is required and must be a string'),
      type: Joi.string()
        .min(2)
        .trim()
        .required()
        .error(() => 'type is required and must be a string'),
      accommodationId: Joi.number()
        .min(0)
        .required()
        .error(() => 'accommodationId is required and must be a number greater than zero'),
      price: Joi.number()
        .min(1)
        .required()
        .error(() => 'price is required and must be a number')
    });
    schema.validate(req.body, (error) => {
      if (error) return Response.errorResponse(res, 422, 'validations failed', error.details);
      next();
    });
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateGetOneAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      accommodationId: Joi.number()
        .integer()
        .min(1)
        .required()
        .error(() => 'accommodationId is required and must be a number greater than zero')
    });
    schema.validate(req.params, (error) => {
      if (error) return Response.errorResponse(res, 422, 'validations failed', error.details);
      next();
    });
  }
}
