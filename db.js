const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const DB = process.env.MONGODB_URI.replace('<password>', process.env.DATABASE_PASSWORD);
    await mongoose.connect(DB);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDB;



