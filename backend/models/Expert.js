const mongoose = require('mongoose');
const ExpertSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  price: Number,
  rating: Number,
  slots: [{ date: String, time: String, booked: {type: Boolean, default: false} }]
});

// Ye line important hai
module.exports = mongoose.models.Expert || mongoose.model('Expert', ExpertSchema);