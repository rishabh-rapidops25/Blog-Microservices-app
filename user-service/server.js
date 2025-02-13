const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;
const PROTOCOL = process.env.PROTOCOL || 'http://localhost';
const startServer = async()=> {
    try {
        app.listen(PORT, () => {
            logger.info(`====================================`);
            logger.info(`Server connected to database...`);
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`${PROTOCOL}:${PORT}/`);
            logger.info(`====================================`);
        });
    } catch (error) {
        logger.error('Error starting server', { message: error.message });
    }
}

startServer()