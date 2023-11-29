const mongoose = require("mongoose");

const webscrapSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("productModule", webscrapSchema);

