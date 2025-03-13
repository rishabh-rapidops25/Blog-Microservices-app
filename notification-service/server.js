const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Notification service is running on port ${PORT}`);
});
