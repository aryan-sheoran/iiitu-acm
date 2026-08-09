const mongoose = require('mongoose');

let cachedPromise = null;

async function connect() {
  if (cachedPromise) {
    return cachedPromise;
  }

  mongoose.set('strictQuery', true);
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/iiitu-acm';

  cachedPromise = mongoose.connect(uri)
    .then(db => {
      console.log("Connected to MongoDB");
      return db;
    })
    .catch(err => {
      cachedPromise = null;
      console.error("Database connection error:", err);
      throw err;
    });

  return cachedPromise;
}

module.exports = connect;
