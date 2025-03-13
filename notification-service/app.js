const express = require("express");
const logger = require("./utils/logger");
const { connectNats } = require("./config/nats");
const { subscribeToUserEvents } = require("./services/subscription.service");

const app = express();

const initializeApp = async () => {
  try {
    // Connect to NATS
    await connectNats();

    // Subscribe to events
    await subscribeToUserEvents();

    logger.info("Notification service initialized successfully");
  } catch (error) {
    logger.error("Failed to initialize notification service:", error);
    process.exit(1);
  }
};

// Initialize the app
initializeApp();

module.exports = app;
