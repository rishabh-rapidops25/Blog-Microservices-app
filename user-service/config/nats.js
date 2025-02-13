const NATS = require('nats');
const logger = require('../utils/logger');
let nc;

const connectNats = async () => {
    try {
        nc = NATS.connect({
            url: process.env.NATS_URL || 'nats://localhost:4222'
        });
        logger.info('Connected to NATS');
    } catch (error) {
        logger.error('Error connecting to NATS', { message: error.message });
    }
}   

module.exports = {connectNats, nc};