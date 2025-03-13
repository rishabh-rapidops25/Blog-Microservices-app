const logger = require("../utils/logger");
const { getNatsConnection } = require("../config/nats");

const subscribeToUserEvents = async () => {
  try {
    const nc = getNatsConnection();

    // Subscribe to user.created events
    const subscription = nc.subscribe("user.created");
    logger.info("Subscribed to user.created events");

    // Process received messages
    for await (const message of subscription) {
      const data = JSON.parse(message.data);
      logger.info("Received user.created event", data);

      // Here you can trigger email notifications or other actions
      // For example:
      // await sendWelcomeEmail(data.email, data.name);
    }
  } catch (error) {
    logger.error("Error in user events subscription:", error);
  }
};

module.exports = { subscribeToUserEvents };
