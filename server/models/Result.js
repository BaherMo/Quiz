const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  name: { type: String, required: true },   // "Alex"
  score: { type: Number, required: true },  // 7
  total: { type: Number, required: true },  // 10
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
