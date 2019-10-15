import Response from '../utils/response';

export default (req, res, next) => {
  if (req.query.autofill === 'true') {
    const { gender, passportNumber, passportName } = req.cookies;
    if (!gender || !passportName || !passportNumber) {
      return Response.badRequestError(
        res,
        'You need to fill the gender, and passport name and number in your profile to use autofill'
      );
    }
    req.body = {
      ...req.body,
      gender,
      passportName,
      passportNumber
    };
  }
  req.body.role = req.user.userRoles;
  next();
};
