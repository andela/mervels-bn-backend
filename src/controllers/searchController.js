import { Sequelize } from 'sequelize';
import Response from '../utils/response';
import RequestService from '../services/requestService';
import Search from '../utils/search';

const { Op } = Sequelize;

class SearchController {
  async searchRequests(req, res, next) {
    try {
      const searchDb = {};
      const filters = {};
      const field = req.query;
      const fieldKeys = Object.keys(field);

      fieldKeys.forEach((key) => {
        if (key === 'id' || key === 'user') {
          searchDb[key] = { [Op.eq]: field[key] };
        } else if (key !== 'requester' && key !== 'travelDate') {
          searchDb[key] = { [Op.iLike]: `%${field[key]}%` };
        } else {
          filters[key] = field[key];
        }
      });

      const data = await RequestService.findByField(searchDb);

      if (data.length < 0) {
        return Response.customResponse(res, 404, 'Not Found', 'Search Error');
      }

      const results = Search.searchData(data, filters);

      return Response.customResponse(res, 200, 'Request Found', results);
    } catch (error) {
      return Response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }
}

export default new SearchController();
