import Response from './response';
import '@hapi/joi';

export default (schema, toValidate, res, next) => {
  schema.validate(toValidate, (error) => {
    if (error) return Response.errorResponse(res, 422, 'Validation failed', error.details[0].message);
    next();
  });
};
