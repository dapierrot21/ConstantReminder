const express = require("express");
const color = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/error");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8000;

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(express.json()); // this will allow me to send raw json data.
app.use(express.urlencoded({ extended: false })); // this will allow me to send urlencoded data.

app.get("/", (req, res) => {
  res.status(200).json({ message: "Local connection is working." });
});

// Routes
app.use("/api/users", require("./routes/user"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
