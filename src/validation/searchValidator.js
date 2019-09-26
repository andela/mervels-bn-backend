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
      'createdAt'
    ];
    const fields = req.query;
    const fieldKeys = Object.keys(fields);

    const result = fieldKeys.some((el) => allowed.indexOf(el) === -1);

    if (result) {
      return Response.errorResponse(res, 422, 'Invalid query paramaters passed', 'Search Error');
    }
    next();
  }
}

export default SearchValidator;
