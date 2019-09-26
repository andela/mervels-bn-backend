/* eslint-disable no-useless-escape */
/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Joi from '@hapi/joi';
import Schema from './schema';
import Response from '../utils/response';
import validator from '../utils/validator';

/**
 * @class user
 */
export default class userValidator {
  static async validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      firstName: Schema.name,
      lastName: Schema.name,
      userPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  static async userByAdmin(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      firstName: Schema.name,
      lastName: Schema.name
    });
    schema.validate(req.body, (err) => {
      if (err) {
        return Response.errorResponse(res, 422, 'Validation failed', err.details[0].message);
      }
      next();
    });
  }

  /**
   * resets new password
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async validateSignIn(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      userPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  /**
   * resets new password
   * @param {Object} req  request details.
   * @param {Object} res  response details.
   * @param {Object} next middleware details
   * @returns {Object}.
   */
  static async resetPassword(req, res, next) {
    const schema = Joi.object().keys({
      password: Schema.password,
      newPassword: Schema.password
    });
    validator(schema, req.body, res, next);
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateSendLink(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email
    });
    validator(schema, req.body, res, next);
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateVerifyLink(req, res, next) {
    const schema = Joi.object().keys({
      token: Schema.link
    });
    validator(schema, req.query, res, next);
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateUserRole(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Schema.email,
      userRole: Schema.role
    });
    validator(schema, req.body, res, next);
  }
}
