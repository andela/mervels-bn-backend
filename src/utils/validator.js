import Response from './response';
import '@hapi/joi';

export default (schema, toValidate, res, next) => {
  schema.validate(toValidate, (error) => {
    if (error) return Response.validationError(res, error.details[0].message);
    next();
  });
};
