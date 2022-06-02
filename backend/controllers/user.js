const registerUser = (req, res) => {
  res
    .status(200)
    .json({ message: "Local register route is working from user controller." });
};

const loginUser = (req, res) => {
  res
    .status(200)
    .json({ message: "Local login route is working from user controller." });
};

module.exports = {
  registerUser,
  loginUser,
};
