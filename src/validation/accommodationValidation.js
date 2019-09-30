/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

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
      name: Schema.name,
      locationId: Schema.id,
      services: Schema.listArray,
      amenities: Schema.listArray,
      description: Schema.stringLongOptional,
      image: Schema.stringOptional
    });
    validator(schema, req.body, res, next);
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateCreateRoom(req, res, next) {
    const schema = Joi.object().keys({
      name: Schema.name,
      type: Schema.name,
      accommodationId: Schema.id,
      price: Schema.number
    });
    validator(schema, req.body, res, next);
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateGetOneAccommodation(req, res, next) {
    const schema = Joi.object().keys({
      accommodationId: Schema.id
    });
    validator(schema, req.params, res, next);
  }
}
