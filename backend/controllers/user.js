const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/generateToken");

const User = require("../models/user");

// @desc:  Register a new user
// @route: /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Incoming values from the request body sent from client side.
  const { name, email, password } = req.body;

  // Validates those values
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  // Check if the client request body values already exist in database.
  const userExists = await User.findOne({ email });

  // If so let the client know.
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("User data incorrect.");
  }
});

// @desc:  Login a user
// @route: /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //Check user and user passwords match.
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  registerUser,
  loginUser,
};
