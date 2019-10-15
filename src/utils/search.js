import moment from 'moment';
import { Sequelize } from 'sequelize';

const { Op } = Sequelize;

class Search {
  formatDate(date) {
    const formatedDate = moment(date)
      .format()
      .split('T')[0];
    return formatedDate;
  }

  computeAverage(dataArray) {
    const dataSum = dataArray.reduce((total, current) => total + current.rating, 0);
    const averageRating = dataSum / dataArray.length;

    return averageRating;
  }

  createQuery(params) {
    const queries = {
      query: {
        id: {
          [Op.eq]: params.id
        },
        status: {
          [Op.iLike]: `%${params.status}%`
        },
        user: {
          [Op.eq]: params.user
        },
        travelDate: {
          [Op.contains]: [this.formatDate(params.travelDate)]
        },
        returnDate: {
          [Op.eq]: this.formatDate(params.returnDate)
        },
        accommodations: Sequelize.where(Sequelize.col('name'), {
          [Op.iLike]: `%${params.accommodations}%`
        }),
        destination: Sequelize.where(
          Sequelize.fn('concat', Sequelize.col('country'), Sequelize.col('city')),
          {
            [Op.iLike]: `%${params.destination}%`
          }
        ),
        requester: Sequelize.where(
          Sequelize.fn('concat', Sequelize.col('firstName'), Sequelize.col('lastName')),
          {
            [Op.iLike]: `%${params.requester}%`
          }
        )
      }
    };
    const keysQueries = Object.keys(queries.query);
    const keysParams = Object.keys(params);
    keysQueries.forEach((key) => {
      if (!keysParams.includes(key)) delete queries.query[key];
    });
    return {
      ...queries.query
    };
  }
}

export default new Search();
