import Joi from '@hapi/joi';
import Response from '../utils/response';

class userProfileValidator {
  static async checkUpdate(req, res, next) {
    const date = new Date();

    const schema = Joi.object().keys({
      firstName: Joi.string()
        .optional()
        .trim()
        .min(1),
      lastName: Joi.string()
        .trim()
        .min(1)
        .optional(),
      gender: Joi.string()
        .valid('MALE', 'FEMALE', 'OTHER')
        .optional(),
      language: Joi.string()
        .trim()
        .min(2)
        .optional(),
      currency: Joi.string()
        .trim()
        .min(2)
        .optional(),
      location: Joi.string()
        .trim()
        .min(2)
        .optional(),
      department: Joi.string()
        .trim()
        .optional()
        .valid('Marketing', 'TDD', 'Operations', 'Finance'),
      phoneNumber: Joi.string()
        .optional()
        .regex(/^[0-9]{10}$/)
        .error(() => 'phoneNumber field needs to have a 10 chars and they must all be numbers'),
      birthDate: Joi.date()
        .optional()
        .max('01-01-2002')
        .error(
          () => 'Format of birthdate needs to be  dd-mm-yyyy and Needs to be before 01-01-2002'
        )
    });

    schema.validate(req.body, (err) => {
      if (err) return Response.errorResponse(res, 422, 'Validation failed', err.details[0].message);

      next();
    });
  }
}

export default userProfileValidator;
