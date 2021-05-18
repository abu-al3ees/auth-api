'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options).then(()=>{
  console.log('connect to database');
});

require('./src/server.js').start(process.env.PORT);