/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const details = Joi.object().keys({
  checkIn: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(() => 'Enter date of checkin in yyyy-mm-dd format'),
  checkOut: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .required()
    .error(() => 'Enter date of checkin in yyyy-mm-dd format'),
  accommodation: Joi.string()
    .trim()
    .optional()
    .error(() => 'Enter a Place of accomodation'),
  room: Joi.number()
    .integer()
    .required()
    .error(() => 'Enter room id')
});

export default {
  booking: Joi.array()
    .items(details)
    .required()
    .error(() => 'Enter booking details')
};
