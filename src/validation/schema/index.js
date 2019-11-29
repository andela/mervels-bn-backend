/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const details = Joi.object().keys({
  travelDate: Joi.string()
    .trim()
    .regex(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)
    .optional()
    .error(() => 'Enter date of travel in yyyy-mm-dd format atleast today'),
  accommodation: Joi.string()
    .trim()
    .optional()
    .error(() => 'Enter a Place of accomodation'),
  location: Joi.number()
    .integer()
    .optional()
    .error(() => 'Enter id of destination')
});

const room = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  type: Joi.string()
    .min(3)
    .max(30)
    .required(),
  price: Joi.number()
    .min(1)
    .required()
});

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
    .min(1),
  gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER'),
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
  to: Joi.array()
    .items(details)
    .error(() => 'Enter correct destination details'),
  rooms: Joi.array()
    .items(room)
    .error(() => 'Enter correct destination details'),
  from: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
    .optional()
    .min(2)
    .error(() => 'Enter place of departure, "from" in City, Country format'),
  listArray: Joi.array()
    .items(Joi.string().trim())
    .single()
    .error(() => 'pass in an array of amenities must be strings'),
  rating: Joi.number()
    .integer()
    .required()
    .min(1)
    .max(5)
    .error(() => 'rating must be number between 1 and 5'),
  passportName: Joi.string()
    .min(1)
    .trim()
    .error(() => 'Passport name must be string and atleast 2 chars long'),
  passportNumber: Joi.string()
    .min(1)
    .trim()
    .error(() => 'Passport Number must be a string and atleast 4 chars long')
};
