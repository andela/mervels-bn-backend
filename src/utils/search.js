import moment from 'moment';

class Search {
  searchData(data, filters) {
    const results = [];
    const filterKeys = Object.keys(filters);

    if (filterKeys.length === 0) return data;
    for (let count = 0; count < data.length; count++) {
      let match = false;
      for (const key of filterKeys) {
        switch (key) {
          case 'requester':
            match = data[count].dataValues.requester.firstName.toLowerCase()
                === filters[key].toLowerCase()
              || data[count].requester.lastName.toLowerCase() === filters[key].toLowerCase();
            break;
          case 'travelDate':
            const travelDate = this.formatDate(filters[key]);
            match = data[count].dataValues.travelDate.includes(travelDate);
            break;
          case 'returnDate':
            const returnDate = this.formatDate(filters[key]);
            match = data[count].dataValues.returnDate === returnDate;
            break;
          case 'accommodation':
            match = this.searchObjectArray(
              data[count].dataValues.accommodations,
              filters[key],
              key
            );
            break;
          case 'destination':
            match = this.searchObjectArray(
              data[count].dataValues.accommodations,
              filters[key],
              key
            );
            break;
          default:
            break;
        }
        if (match) results.push(data[count]);
      }
    }
    return results;
  }

  formatDate(date) {
    const formatedDate = moment(date)
      .format()
      .split('T')[0];
    return formatedDate;
  }

  searchObjectArray(accommodationArray, element, key) {
    let found = false;
    for (const accommodation of accommodationArray) {
      if (key === 'accommodation' && accommodation.dataValues.name === element.toUpperCase()) {
        found = true;
        break;
      }
      if (
        key === 'destination'
        && (accommodation.dataValues.Location.country === element.toUpperCase()
          || accommodation.dataValues.Location.city === element.toUpperCase())
      ) {
        found = true;
        break;
      }
    }
    return found;
  }
}

export default new Search();

// if (key === 'requester') {
//   match = data[count].dataValues.requester.firstName.toLowerCase()
//       === filters[key].toLowerCase()
//     || data[count].requester.lastName.toLowerCase() === filters[key].toLowerCase();
// } else if (key === 'travelDate') {
//   const travelDate = this.formatDate(filters[key]);
//   match = data[count].dataValues.travelDate.includes(travelDate);
// } else if (key === 'returnDate') {
//   const returnDate = this.formatDate(filters[key]);
//   match = data[count].dataValues.returnDate === returnDate;
// } else if (key === 'accommodation' || key === 'destination') {
//   match = this.searchObjectArray(data[count].dataValues.accommodations, filters[key], key);
// }
// if (!match) break;
// }
// if (match) results.push(data[count]);
