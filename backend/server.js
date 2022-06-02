const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Local connection is working." });
});

// Routes
app.use("/api/users", require("./routes/user"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
