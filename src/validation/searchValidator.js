import Response from '../utils/response';

class SearchValidator {
  static checkRequestParams(req, res, next) {
    const allowed = [
      'id',
      'requester',
      'travelDate',
      'from',
      'returnDate',
      'reason',
      'status',
      'user',
      'accommodation',
      'destination'
    ];
    const fields = req.query;
    const fieldKeys = Object.keys(fields);

    const result = fieldKeys.some((el) => allowed.indexOf(el) === -1);

    if (result) {
      return Response.validationError(res, 'Invalid query paramaters passed', 'Validation Error');
    }
    next();
  }
}

export default SearchValidator;
