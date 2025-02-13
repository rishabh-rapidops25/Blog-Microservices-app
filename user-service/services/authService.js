const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

exports.verifyToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            logger.error('Authorization header is required');
            return res.status(401).json({ message: 'Authorization header is required' });
        }

        if (!authorizationHeader.includes(' ')) {
            logger.error('Invalid authorization header format');
            return res.status(401).json({ message: 'Invalid authorization header format' });
        }

        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            logger.error('Token is required');
            return res.status(401).json({ message: 'Token is required' });
        }

        logger.info('Verifying token');
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                logger.error('Error verifying token', { message: err.message });
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        logger.error('Error verifying token', { message: error.message });
        res.status(401).json({ message: 'Invalid token' });
    }
};