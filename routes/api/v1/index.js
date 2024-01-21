const express = require("express");

const routes = express.Router();

routes.use("/destinations", require("./destination.routes"));
routes.use("/auth", require("./auth.routes"));

module.exports = routes;
