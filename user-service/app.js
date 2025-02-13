const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes')
// const{connectNats} = require('./config/nats')


const app = express();

// middleware
app.use(bodyParser.json())
app.use(morgan('dev'));
//connect to database
connectDb();

//connect to nats
// connectNats();


// routes
app.use('/api/users', userRoutes);

module.exports = app;
