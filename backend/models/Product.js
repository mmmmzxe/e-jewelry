const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  price: { type: Number, required: true },
  oldprice: { type: Number },
  category: {
    title: { type: String, required: true }
  },
  image: { type: String },
  images: [{ type: String }]
});

module.exports = mongoose.model('Product', ProductSchema); 