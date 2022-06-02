const asyncHandler = require("express-async-handler");

// @desc:  Register a new user
// @route: /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields.");
  }

  res
    .status(200)
    .json({ message: "Local register route is working from user controller." });
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
