const logger = require("../utils/logger");
const { getNatsConnection } = require("./nats");

const publishMessage = async (subject, data) => {
  try {
    const nats = getNatsConnection();
    await nats.publish(subject, JSON.stringify(data));
    logger.info(`Message published to ${subject}`);
  } catch (error) {
    logger.error("Error publishing message:", error);
    throw error;
  }
};

module.exports = {
  publishMessage,
};
