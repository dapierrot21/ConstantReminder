const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// @desc:  Register a new user
// @route: /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  // Does user exist.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hasdedPassword = await bcrypt.hash(password, salt);

  // New User
  const user = await User.create({
    name,
    email,
    password: hasdedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
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
  res
    .status(200)
    .json({ message: "Local login route is working from user controller." });
});

module.exports = {
  registerUser,
  loginUser,
};
