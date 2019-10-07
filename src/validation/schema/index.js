/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';
import TripSchema from './trip';

export default {
  email: Joi.string()
    .email()
    .trim()
    .required()
    .min(5),
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  number: Joi.number()
    .min(1)
    .required(),
  nameOptional: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/
    )
    .trim()
    .required()
    .min(1)
    .error(
      () => 'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)'
    ),
  link: Joi.string()
    .required()
    .error(() => 'token is required and must be a string'),
  role: Joi.string()
    .valid('Travel Team Member', 'Travel Administrator', 'Manager', 'Requester')
    .required(),
  id: Joi.number()
    .integer()
    .min(0)
    .required(),
  idOptional: Joi.number()
    .integer()
    .min(0)
    .optional(),
  string: Joi.string()
    .trim()
    .min(1)
    .required(),
  stringLong: Joi.string()
    .trim()
    .required()
    .min(30),
  stringLongOptional: Joi.string()
    .trim()
    .optional()
    .min(30),
  stringOptional: Joi.string()
    .trim()
    .min(1)
    .optional(),
  gender: Joi.string()
    .valid('MALE', 'FEMALE', 'OTHER')
    .optional(),
  department: Joi.string()
    .trim()
    .optional()
    .valid('Marketing', 'TDD', 'Operations', 'Finance'),
  phone: Joi.string()
    .optional()
    .regex(/^[0-9]{10}$/)
    .error(() => 'phoneNumber field needs to have a 10 chars and they must all be numbers'),
  birthDate: Joi.date()
    .optional()
    .max('01-01-2002')
    .error(() => 'Format of birthdate needs to be  dd-mm-yyyy and Needs to be before 01-01-2002'),
  minDate: Joi.date()
    .min('now')
    .error(() => 'Enter date of return in yyyy-mm-dd format greater than date of travel'),
  dateMultiple: Joi.array()
    .items(TripSchema.travelDate)
    .single()
    .min(1)
    .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
  destinations: Joi.array()
    .items(
      Joi.number()
        .integer()
        .min(0)
        .required()
    )
    .single()
    .min(1)
    .error(() => 'Enter a single id of destination'),
  accommodations: Joi.array()
    .items(
      Joi.string()
        .trim()
        .required()
    )
    .single()
    .min(1),
  accommodationIds: Joi.array()
    .items(Joi.number())
    .single()
    .max(1)
    .error(() => 'Enter a Place of accomodation'),
  listArray: Joi.array()
    .items(Joi.string().trim())
    .single()
    .error(() => 'pass in an array of amenities must be strings'),
  rating: Joi.number()
    .integer()
    .required()
    .min(1)
    .max(5)
    .error(() => 'rating must be number between 1 and 5')
};
