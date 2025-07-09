const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String }
});

module.exports = mongoose.model('Category', CategorySchema); 