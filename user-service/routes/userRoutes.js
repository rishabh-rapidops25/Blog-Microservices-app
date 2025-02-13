const express = require('express');
const {register, login} = require('../controllers/userController')
const router = express.Router();
const {registerUserSchema, loginUserSchema, validate} = require('../utils/validation')

router.post('/register', validate(registerUserSchema),register);
router.post('/login',validate(loginUserSchema), login);

module.exports = router;