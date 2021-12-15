const mongoose = require('mongoose');

const { log } = require('../utils/logger');

const URI = process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info('MongoDB Connected');
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;
