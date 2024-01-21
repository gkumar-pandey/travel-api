const express = require("express");
const Destinations = require("../../../models/destination");
const {
  createTravelDestinationHandler,
  readAllTravelDestinationsHandler,
  readTravelDestinationHandler,
  readTravelDestinationByLocation,
  readingTravelDestinationsByRating,
  updateTravelDestinationHandler,
  filterDestinationByRating,
  addReviewToTravelDestination,
  readDestinationReviewsWithUserDetails,
} = require("../../../controllers/destination.controller");
const routes = express.Router();

// GET : /api/v1/destinations/ - Retrive all destinations data
routes.get("/", readAllTravelDestinationsHandler);

// POST /api/v1/destinations/:destinationId
routes.post("/:destinationId", updateTravelDestinationHandler);

// GET : /api/v1/destinations/rating => retrieving sorted destinations in descending order by rating.
routes.get("/rating", readingTravelDestinationsByRating);

// GET : /api/v1/destinations/:name - Retrive a destination by name
routes.get("/:name", readTravelDestinationHandler);

// POST : /api/v1/destinations/ - Create new Travel destination and store in database
routes.post("/", createTravelDestinationHandler);

//GET : /api/v1/destinations/location/:location  => Retrive destinations by location
routes.get("/location/:location", readTravelDestinationByLocation);

// GET /api/v1/destinations/filter/:minRating
routes.get("/filter/:minRating", filterDestinationByRating);

// POST /api/v1/destinations/:destinationId/reviews
routes.post("/:destinationId/reviews", addReviewToTravelDestination);

// GET /api/v1/destinations/:destinationId/reviews
routes.get("/:destinationId/reviews", readDestinationReviewsWithUserDetails);
module.exports = routes;
