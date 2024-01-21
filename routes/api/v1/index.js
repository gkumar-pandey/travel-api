const express = require("express");

const routes = express.Router();

routes.use("/destinations", require("./destination.routes"));

module.exports = routes;
