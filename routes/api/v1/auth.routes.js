const express = require("express");
const { signup, login } = require("../../../controllers/user.controller");
const authRoutes = express.Router();

// POST /api/v1/auth/signup
authRoutes.post("/signup", signup);

// POST /api/v1/auth/login
authRoutes.post("/login", login);

module.exports = authRoutes;
