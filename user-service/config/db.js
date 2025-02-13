const mongoose = require('mongoose');
const logger = require('../utils/logger');

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/user-service';
const connectDb = async () => {
    try {
        await mongoose.connect(DB_URL);
    } catch (error) {
        logger.error('Error connecting to database', { message: error.message });
    }
}

module.exports = connectDb;