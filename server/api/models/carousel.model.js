const mongoose = require('mongoose');

const CarouselSlideSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const CarouselSlide = mongoose.model('CarouselSlide', CarouselSlideSchema);
module.exports = CarouselSlide;
