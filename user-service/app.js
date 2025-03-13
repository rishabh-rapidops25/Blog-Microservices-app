const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./utils/logger");
const { connectNats } = require("./config/nats");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
const initializeApp = async () => {
  try {
    //connect to database
    await connectDb();

    //connect to nats
    await connectNats();

    // routes for users
    app.use("/api/users", userRoutes);

    // error handling middleware for no route found
    app.all("*", (_req, res) => {
      logger.error("Invalid route");
      return res.status(404).json({ status: 404, message: "Invalid route" });
    });
  } catch (error) {
    logger.error("Failed to initialize app:", error);
    process.exit(1);
  }
};

// Initialize the app
initializeApp();

module.exports = app;
