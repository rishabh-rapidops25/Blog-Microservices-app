const Joi = require('joi');
const { default: logger } = require('./logger');

// Validation schema for registering a new user
const registerUserSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.email': `"email" must be a valid email`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': `"password" should be a type of 'text'`,
    'string.min': `"password" should have a minimum length of {#limit}`,
    'any.required': `"password" is a required field`,
  }),
});

// Validation schema for logging in a user
const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.email': `"email" must be a valid email`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().required().messages({
    'string.base': `"password" should be a type of 'text'`,
    'any.required': `"password" is a required field`,
  }),
});

// Middleware to validate request data
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // abortEarly: false to capture all errors
    if (error) {
      const errorMessages = error.details.map(err => err.message);
      logger.error('Validation error', { errors: errorMessages });
      return res.status(400).json({ errors: errorMessages });
    }
    next(); // Proceed if validation is successful
  };
};

module.exports = { registerUserSchema, loginUserSchema, validate };
