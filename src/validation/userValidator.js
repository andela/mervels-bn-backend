import Joi from '@hapi/joi';
import Response from '../utils/response';

export default class userValidator {
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

    await schema.validate(req.body, (err) => {
      console.log(req.body);
      if (err) return Response.errorResponse(res, 422, 'Validation failed', err.details);
      next();
    });
  }
}
