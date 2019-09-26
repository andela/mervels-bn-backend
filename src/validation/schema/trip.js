/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

export default {
  from: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
    .required()
    .min(2)
    .error(() => 'Enter place of departure, "from" in City, Country format'),
  to: Joi.array()
    .items(
      Joi.number()
        .integer()
        .required()
    )
    .single()
    .required()
    .max(1)
    .error(() => 'Enter a single id of destination'),
  travelDate: Joi.array()
    .items(
      Joi.string()
        .trim()
        .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
        .required()
    )
    .single()
    .required()
    .min(1)
    .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
  reason: Joi.string()
    .trim()
    .required()
    .min(30)
    .error(() => 'Enter a decription not less than 30 characters'),
  accommodation: Joi.array()
    .items(
      Joi.string()
        .trim()
        .required()
    )
    .single()
    .required()
    .max(1)
    .error(() => 'Enter a Place of accomodation')
};
