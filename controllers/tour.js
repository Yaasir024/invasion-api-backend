const fs = require("fs");
const _ = require("lodash");
// const Tour = require('./../models/tourModel');
const APIFeatures = require("../utils/toursFeatures");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

exports.aliasTopJapanTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';
    // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    req.query.country = 'Japan'
    next();
  };
exports.aliasTopFranceTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';
    // req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    req.query.country = 'France'
    next();
  };

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(tours, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;
    res.status(200).json({
      status: "success",
      results: data.length,
      data: {
        tours: data,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // const tour = await Tour.findById(req.params.id);
    let tour = _.find(tours, { id: req.params.id })
    delete tour.created_at;

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
