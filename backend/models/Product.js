const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., 'kg', 'pkt', 'liter'
  image: { type: String, required: true }, // URL or placeholder
});

module.exports = mongoose.model('Product', productSchema);
