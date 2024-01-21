const Destinations = require("../models/destination");

/**
 * @route POST /api/v1/destinations
 * @description Create a new travel destination.
 * @param {Object} req - Express request object containing destination information in the body.
 * @param {Object} res - Express response object containing the newly created destination.
 */
const createTravelDestinationHandler = async (req, res) => {
  try {
    const destinationData = req.body;
    const newDestination = new Destinations(destinationData);
    await newDestination.save();
    res.status(201).json({
      message: "Destination created successfully",
      data: {
        destination: newDestination,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /api/v1/destinations/:name
 * @description Retrieve a travel destination by name.
 * @param {Object} req - Express request object with the destination name in params
 * @param {Object} res - Express response object containing an array of destinations
 */
const readTravelDestinationHandler = async (req, res) => {
  try {
    const destinationName = req.params.name;
    const destination = await Destinations.find({
      name: { $regex: new RegExp(destinationName, "i") },
    });
    if (!destination) {
      return res.status(404).json({ error: "Destinations are not found" });
    }
    res.status(200).json({ data: { destinations: destination } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /api/v1/destinations
 * @description Retrieve all travel destinations.
 * @param {Object} req - Express request object (unused)
 * @param {Object} res - Express response object containing an array of destinations
 */
const readAllTravelDestinationsHandler = async (req, res) => {
  try {
    const destinations = await Destinations.find();

    if (!destinations) {
      return res.status(404).json({ error: "Destinations are not found" });
    }
    res.status(200).json({ data: { destinations: destinations } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @route GET /api/v1/destinations/location/:location
 * @description Retrieve travel destinations based on the specified location.
 * @param {Object} req - Express request object with the location as a parameter
 * @param {Object} res - Express response object containing an array of destinations
 */
const readTravelDestinationByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    if (!location) {
      return res.status(404).json({ error: "Location is required" });
    }

    const destinations = await Destinations.find({
      city: { $regex: new RegExp(location, "i") },
    });
    if (!destinations) {
      return res.status(404).json({ error: "Destinations not found" });
    }
    res.status(200).json({ data: { destinations: destinations } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/destinations/rating
 * @description Retrieve travel destinations sorted by rating in descending order.
 * @param {Object} req - Express request object (unused)
 * @param {Object} res - Express response object containing an array of destinations
 * @returns {Object} JSON response with an array of destinations or an error message
 */
const readingTravelDestinationsByRating = async (req, res) => {
  try {
    const destinations = await Destinations.find().sort({ rating: -1 });

    if (!destinations) {
      return res.status(404).json({ message: "Destinations not found" });
    }

    res.status(200).json({ data: { destinations: destinations } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/destinations/:destinationId
 * @description Update a travel destination by ID.
 * @param {Object} req - Express request object with destination ID in params and updated data in the body.
 * @param {Object} res - Express response object containing the updated destination.
 */
const updateTravelDestinationHandler = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const updatedData = req.body;
    const updatedDestination = await Destinations.findByIdAndUpdate(
      destinationId,
      updatedData,
      { new: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ error: "Update destination failed" });
    }
    res.status(200).json({
      message: "destination updated successfully",
      data: { destination: updatedDestination },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route /api/v1/destinations/filter/:minRating
 * @description retrieving destinations with ratings greater than or equal to the minimum rating.
 * @param {Object} req Express request object with minimum rating in params
 * @param {Object} res Express response object containing the array of destinations with rating greater than or equal to the min rating
 */
const filterDestinationByRating = async (req, res) => {
  try {
    const { minRating } = req.params;
    const destinations = await Destinations.find({
      rating: { $gte: minRating },
    });
    if (!destinations) {
      return res.status(404).json({ error: "Destinations not found!" });
    }

    res.status(200).json({ data: { destinations: destinations } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/destinations/:destinationId/reviews
 * @description Add a review to a travel destination by destination ID.
 * @param {Object} req - Express request object with destination ID in params and review data in the body.
 * @param {Object} res - Express response object containing the updated destination with the added review.
 * @returns {Object} JSON response indicating success or an error message.
 */
const addReviewToTravelDestination = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const { userId, text } = req.body;
    const reviewData = { userId, text };
    const destination = await Destinations.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destiantion not found" });
    }
    destination.reviews.push(reviewData);
    await destination.save();
    res.status(200).json({
      message: "Review added successfully",
      data: { destiantion: destination },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route GET /api/v1/destinations/:destinationId/reviews
 * @description Retrieve reviews for a travel destination with user details.
 * @param {Object} req - Express request object with destination ID in params.
 * @param {Object} res - Express response object containing reviews with user details.
 * @returns {Object} JSON response with reviews and user details or an error message.
 */
const readDestinationReviewsWithUserDetails = async (req, res) => {
  try {
    const { destinationId } = req.params;
    const destinations = await Destinations.findById(destinationId).populate({
      path: "reviews",
      populate: { path: "userId", select: "username profilePicture" },
    });
    if (!destinations) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({
      message: "retrieve reviews successfully",
      data: { reviews: destinations.reviews },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

module.exports = {
  createTravelDestinationHandler,
  readTravelDestinationHandler,
  readAllTravelDestinationsHandler,
  readTravelDestinationByLocation,
  readingTravelDestinationsByRating,
  updateTravelDestinationHandler,
  filterDestinationByRating,
  addReviewToTravelDestination,
  readDestinationReviewsWithUserDetails,
};
