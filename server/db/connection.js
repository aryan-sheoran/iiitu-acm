const mongoose = require('mongoose');

async function connect() {
  mongoose.set('strictQuery', true);
  const db = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iiitu-acm');
  console.log("Connected to MongoDB");
  return db;
}

module.exports = connect;
