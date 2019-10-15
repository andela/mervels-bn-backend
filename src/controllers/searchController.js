/* eslint-disable require-jsdoc */
/* eslint-disable class-methods-use-this */
import { Sequelize } from 'sequelize';
import Response from '../utils/response';
import RequestService from '../services/requestService';
import Search from '../utils/search';

const { Op } = Sequelize;

class SearchController {
  async searchRequests(req, res, next) {
    try {
      const query = Search.createQuery(req.params);

      // Making the user only get their requests
      if (req.user.userRoles !== 'Manager') query.user = { [Op.eq]: req.user.id };

      const data = await RequestService.search(query);

      if (data.dataValues.length === 0) return Response.notFoundError(res, 'Request not found');

      return Response.customResponse(res, 200, 'Request Found', data);
    } catch (error) {
      return next(error);
    }
  }
}

export default new SearchController();
