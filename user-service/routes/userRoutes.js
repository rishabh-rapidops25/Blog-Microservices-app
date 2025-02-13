const express = require('express');
const {register, login} = require('../controllers/userController')
const router = express.Router();
// const {registerUserSchema, loginUserSchema, validate} = require('../utils/validation')
// validate(registerUserSchema),
// validate(loginUserSchema),
router.post('/register', register);
router.post('/login', login);

module.exports = router;