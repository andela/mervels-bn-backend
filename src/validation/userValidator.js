/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Joi from '@hapi/joi';
import Response from '../utils/response';

/**
 * @class user
 */
export default class userValidator {
  static async validateSignup(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Joi.string()
        .email()
        .required(),
      firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      userPassword: Joi.string()
        .required()
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+=<>|.-])[0-9a-zA-Z!@#$%^&*()_+=<>|.-]{8,}$/
        )
        .error(
          () => 'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)'
        ),
      userRoles: Joi.string()
        .valid('Travel Team Member', 'Travel Administrator', 'Manager', 'Requester')
        .required()
    });
    schema.validate(req.body, (err) => {
      if (err) return Response.errorResponse(res, 422, 'Validation failed', err.details[0].message);
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
      userEmail: Joi.string()
        .email()
        .trim()
        .required()
        .min(5)
        .error(() => 'userEmail field is required and must be an email'),
      userPassword: Joi.string()
        .trim()
        .required()
        .min(1)
        .error(() => 'userPassword field is required and must be a string and not empty')
    });

    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
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
  static async resetPassword(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
        )
        .trim()
        .required()
        .min(1)
        .error(
          () => 'Enter a Password string with atleast 1 number, 1 uppercase, 1 lowercase and 1 special Charcter'
        ),
      newPassword: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
        )
        .trim()
        .required()
        .min(1)
        .error(
          () => 'Enter a Password string with atleast 1 number, 1 uppercase, 1 lowercase and 1 special Charcter'
        )
    });

    schema.validate(req.body, (err) => {
      if (err) {
        next(err);
      }
      next();
    });
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateSendLink(req, res, next) {
    const schema = Joi.object().keys({
      userEmail: Joi.string()
        .email()
        .trim()
        .required()
        .error(() => 'userEmail field is required and must be an email')
    });
    schema.validate(req.body, (error) => {
      if (error) return Response.errorResponse(res, 400, 'validations failed', error.details);
      next();
    });
  }

  /**
   * @param {object} req  request.
   * @param {object} res  response.
   * @param {function} next next.
   * @returns {object}.
   */
  static async validateVerifyLink(req, res, next) {
    const schema = Joi.object().keys({
      token: Joi.string()
        .required()
        .error(() => 'token  is required and must be a string')
    });
    schema.validate(req.query, (error) => {
      if (error) return Response.errorResponse(res, 400, 'validations failed', error.details);
      next();
    });
  }
}
