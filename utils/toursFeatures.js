const _ = require("lodash");

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });
    if (queryObj.rating) {
      queryObj.rating = queryObj.rating * 1;
    }
    this.query = _.filter(this.query, queryObj);

    if (this.queryString.search) {
      this.query = _.filter(this.query, (item) => {
        const name = item.name.toLowerCase();
        return name.includes(this.queryString.search.toLowerCase());
      });
    }
    return this;
  }
  sort() {
    // data = _.sortBy(data, req.query.sort);
    if (this.queryString.sort) {
      if (this.queryString.sort.charAt(0) == "-") {
        this.query = _.sortBy(this.query, this.queryString.sort).reverse();
      } else {
        this.query = _.sortBy(this.query, this.queryString.sort);
      }
    } else {
      //   this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    const filteredArr = _.map(this.query, (obj) =>
      _.pick(obj, ["id", "name", "slug", "country", "continent", "rating"])
    );
    this.query = filteredArr;
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    this.query = _.slice(this.query, startIndex, endIndex);

    return this;
  }
}

module.exports = APIFeatures;
