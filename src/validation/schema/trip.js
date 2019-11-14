/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const destination = Joi.object().keys({
  travelDate: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
  accommodation: Joi.string()
    .trim()
    .required()
    .error(() => 'Enter a Place of accomodation'),
  location: Joi.number()
    .integer()
    .required()
    .error(() => 'Enter id of destination')
});

export default {
  from: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
    .required()
    .min(2)
    .error(() => 'Enter place of departure, "from" in City, Country format'),
  to: Joi.array()
    .items(destination)
    .required()
    .error(() => 'Enter destination details'),
  reason: Joi.string()
    .trim()
    .required()
    .min(30)
    .error(() => 'Enter a decription not less than 30 characters')
};
