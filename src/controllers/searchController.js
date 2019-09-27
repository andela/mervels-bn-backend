import { Sequelize } from 'sequelize';
import Response from '../utils/response';
import RequestService from '../services/requestService';
import Search from '../utils/search';

const { Op } = Sequelize;

class SearchController {
  async searchRequests(req, res, next) {
    try {
      // object that will be passed to the db where clause
      const searchDb = {};
      // objec passed to search class
      const filters = {};
      const field = req.query;

      const fieldKeys = Object.keys(field);

      const keysToSkip = ['requester', 'travelDate', 'returnDate', 'accommodation', 'destination'];

      fieldKeys.forEach((key) => {
        if (key === 'id' || key === 'user') {
          searchDb[key] = { [Op.eq]: field[key] };
        } else if (!keysToSkip.includes(key)) {
          searchDb[key] = { [Op.iLike]: `%${field[key].trim()}%` };
        } else {
          filters[key] = field[key].trim();
        }
      });

      // Making the user only get their requests
      if (req.user.userRoles !== 'Manager') searchDb.user = { [Op.eq]: req.user.id };

      const data = await RequestService.findByField(searchDb);
      const results = Search.searchData(data, filters);

      if (results.length === 0) return Response.customResponse(res, 404, 'Request not found', 'Search Error');

      return Response.customResponse(res, 200, 'Request Found', results);
    } catch (error) {
      return next(error);
    }
  }
}

export default new SearchController();
