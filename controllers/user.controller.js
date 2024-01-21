const User = require("../models/user");

/**
 * @route POST /api/v1/auth/signup
 * @description Register a new user.
 * @param {Object} req - Express request object with user details in the body.
 * @param {Object} res - Express response object indicating successful signup or an error message.
 */
const signup = async (req, res) => {
  try {
    const { name, username, profilePicture, email, password } = req.body;
    const user = { name, username, email, password, profilePicture };
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ message: "signup successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

/**
 * @route POST /api/v1/auth/login
 * @description Authenticate user credentials and perform login.
 * @param {Object} req - Express request object with user email and password in the body.
 * @param {Object} res - Express response object indicating successful login or an error message.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Email and Password incorrect" });
    } else {
      return res
        .status(200)
        .json({ message: "Login successfully", user: user });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};

module.exports = { signup, login };
