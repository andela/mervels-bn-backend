class Search {
  searchData(data, filters) {
    const results = [];
    const filterKeys = Object.keys(filters);

    if (filterKeys.length === 0) return data;

    for (let x = 0; x < data.length; x++) {
      let match = false;
      for (const key of filterKeys) {
        if (key === 'requester') {
          match = data[x].dataValues.requester.firstName.toLowerCase() === filters[key].toLowerCase()
            || data[x].requester.lastName.toLowerCase() === filters[key].toLowerCase();
        } else if (key === 'travelDate') {
          match = data[x].dataValues.travelDate.includes(filters[key]);
        } else {
          match = true;
        }
        if (!match) break;
      }
      if (match) results.push(data[x]);
    }
    return results;
  }
}

export default new Search();
