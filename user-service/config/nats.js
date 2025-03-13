const NATS = require("nats");
const logger = require("../utils/logger");
let nc = null;

const connectNats = async () => {
  try {
    nc = await NATS.connect({
      url: process.env.NATS_URL || "nats://localhost:4222",
    });
    logger.info("Connected to NATS");
    return nc;
  } catch (error) {
    logger.error("Error connecting to NATS", { message: error.message });
    throw error;
  }
};

const getNatsConnection = () => {
  if (!nc) {
    throw new Error("NATS connection not initialized");
  }
  return nc;
};

module.exports = { connectNats, getNatsConnection };
