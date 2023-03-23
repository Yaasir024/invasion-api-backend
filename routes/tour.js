const express = require("express");

const tourController = require("../controllers/tour");

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopFranceTours, tourController.getAllTours);
router
  .route('/top-5-japan')
  .get(tourController.aliasTopJapanTours, tourController.getAllTours);
router
  .route('/top-5-france')
  .get(tourController.aliasTopFranceTours, tourController.getAllTours);
//   .get(tourController.aliasTopTours, tourController.getAllTours);


router.route("/").get(tourController.getAllTours);

router.route("/:id").get(tourController.getTour);

module.exports = router;
