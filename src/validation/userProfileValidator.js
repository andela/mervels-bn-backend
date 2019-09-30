/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
import Joi from '@hapi/joi';
import Schema from './schema';
import validator from '../utils/validator';

class userProfileValidator {
  static async checkUpdate(req, res, next) {
    const schema = Joi.object().keys({
      firstName: Schema.nameOptional,
      lastName: Schema.nameOptional,
      gender: Schema.gender,
      language: Schema.stringOptional,
      currency: Schema.stringOptional,
      location: Schema.stringOptional,
      department: Schema.department,
      phoneNumber: Schema.phone,
      birthDate: Schema.birthDate
    });
    validator(schema, req.body, res, next);
  }
}

export default userProfileValidator;
